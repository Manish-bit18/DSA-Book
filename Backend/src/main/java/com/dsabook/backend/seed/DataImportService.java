package com.dsabook.backend.seed;

import com.dsabook.backend.entity.Chapter;
import com.dsabook.backend.entity.Company;
import com.dsabook.backend.entity.Difficulty;
import com.dsabook.backend.entity.Level;
import com.dsabook.backend.entity.Pattern;
import com.dsabook.backend.entity.Problem;
import com.dsabook.backend.repository.ChapterRepository;
import com.dsabook.backend.repository.CompanyRepository;
import com.dsabook.backend.repository.PatternRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class DataImportService {

    private static final Logger log = LoggerFactory.getLogger(DataImportService.class);

    private static final String DATA_DIR = "classpath:data/";

    // Maps chapter IDs (from chapters.json) to their data filenames when the default <id>.json doesn't match
    private static final Map<String, String> CHAPTER_FILENAME_OVERRIDES = Map.of(
            "trees", "tree.json"
    );

    private final ResourceLoader resourceLoader;
    private final ObjectMapper objectMapper;
    private final ChapterRepository chapterRepository;
    private final PatternRepository patternRepository;
    private final CompanyRepository companyRepository;

    public DataImportService(ResourceLoader resourceLoader, ObjectMapper objectMapper,
                             ChapterRepository chapterRepository,
                             PatternRepository patternRepository,
                             CompanyRepository companyRepository) {
        this.resourceLoader = resourceLoader;
        this.objectMapper = objectMapper;
        this.chapterRepository = chapterRepository;
        this.patternRepository = patternRepository;
        this.companyRepository = companyRepository;
    }

    @Transactional
    public void importAll() {
        if (chapterRepository.count() > 0) {
            log.info("Database already contains data. Skipping import.");
            return;
        }

        log.info("Starting data import from JSON files...");

        try {
            importPatterns();
            importCompanies();
            importChapters();
            importChapterData();
            log.info("Data import completed successfully.");
        } catch (Exception e) {
            log.error("Data import failed: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to import data", e);
        }
    }

    private void importPatterns() throws IOException {
        List<PatternJson> patterns = readJsonList("patterns.json", PatternJson.class);
        for (PatternJson p : patterns) {
            if (!patternRepository.existsByPatternId(p.getId())) {
                Pattern pattern = new Pattern();
                pattern.setPatternId(p.getId());
                pattern.setName(p.getName());
                pattern.setDescription("");
                patternRepository.save(pattern);
            }
        }
        log.info("Imported {} patterns", patterns.size());
    }

    private void importCompanies() throws IOException {
        List<CompanyJson> companies = readJsonList("companies.json", CompanyJson.class);
        for (CompanyJson c : companies) {
            if (!companyRepository.existsByCompanyId(c.getId())) {
                Company company = new Company();
                company.setCompanyId(c.getId());
                company.setName(c.getName());
                companyRepository.save(company);
            }
        }
        log.info("Imported {} companies", companies.size());
    }

    private void importChapters() throws IOException {
        List<ChapterIndexJson> chapters = readJsonList("chapters.json", ChapterIndexJson.class);
        Map<String, String> chapterDescriptions = loadChapterDescriptions();

        for (ChapterIndexJson c : chapters) {
            if (!chapterRepository.existsByChapterId(c.getId())) {
                Chapter chapter = new Chapter();
                chapter.setChapterId(c.getId());
                chapter.setTitle(c.getTitle());
                chapter.setIcon(c.getIcon());
                chapter.setEstimatedHours(null);
                chapter.setDisplayOrder(c.getOrder());
                chapter.setDescription(chapterDescriptions.getOrDefault(c.getId(), ""));
                chapterRepository.save(chapter);
            }
        }
        log.info("Imported {} chapters", chapters.size());
    }

    private Map<String, String> loadChapterDescriptions() {
        Map<String, String> descriptions = new HashMap<>();
        for (ChapterDataEntry entry : loadChapterDataEntries()) {
            try {
                Resource resource = resourceLoader.getResource(DATA_DIR + entry.filename);
                if (resource.exists()) {
                    ChapterDataJson data = objectMapper.readValue(resource.getInputStream(), ChapterDataJson.class);
                    descriptions.put(entry.chapterId, data.getDescription() != null ? data.getDescription() : "");
                }
            } catch (IOException e) {
                log.warn("Could not read description from {}: {}", entry.filename, e.getMessage());
            }
        }
        return descriptions;
    }

    private void importChapterData() throws IOException {
        Map<String, Pattern> patternCache = new HashMap<>();
        patternRepository.findAll().forEach(p -> patternCache.put(p.getPatternId(), p));

        Map<String, Company> companyCache = new HashMap<>();
        companyRepository.findAll().forEach(c -> companyCache.put(c.getCompanyId(), c));

        Map<String, Chapter> chapterCache = new HashMap<>();
        chapterRepository.findAll().forEach(c -> chapterCache.put(c.getChapterId(), c));

        ObjectMapper listMapper = new ObjectMapper();

        for (ChapterDataEntry entry : loadChapterDataEntries()) {
            Resource resource = resourceLoader.getResource(DATA_DIR + entry.filename);
            if (!resource.exists()) {
                log.warn("Data file not found for chapter {}: {}", entry.chapterId, entry.filename);
                continue;
            }

            ChapterDataJson data = objectMapper.readValue(resource.getInputStream(), ChapterDataJson.class);
            Chapter chapter = chapterCache.get(entry.chapterId);
            if (chapter == null) {
                log.warn("Chapter {} not found in database. Skipping {}.", entry.chapterId, entry.filename);
                continue;
            }

            if (data.getPatterns() == null) continue;
                // Create or update patterns from per-chapter data
                for (PatternLevelJson pl : data.getPatterns()) {
                    Pattern existing = patternCache.get(pl.getId());
                    if (existing == null) {
                        existing = new Pattern();
                        existing.setPatternId(pl.getId());
                        existing.setName(pl.getName() != null ? pl.getName() : pl.getId());
                        existing.setDescription(pl.getDescription() != null ? pl.getDescription() : "");
                        patternRepository.save(existing);
                        patternCache.put(pl.getId(), existing);
                    } else if (pl.getDescription() != null && !pl.getDescription().isEmpty()) {
                        existing.setDescription(pl.getDescription());
                        patternRepository.save(existing);
                    }
                }

                int displayOrder = 1;
                for (PatternLevelJson pl : data.getPatterns()) {
                    Level level = new Level();
                    level.setLevelId(entry.chapterId + "-" + pl.getId());
                    level.setTitle(pl.getName() != null ? pl.getName() : pl.getId());
                    level.setDescription(pl.getDescription() != null ? pl.getDescription() : "");
                    level.setGoal("");
                    try {
                        level.setRecognitionClues(pl.getRecognitionClues() != null ? listMapper.writeValueAsString(pl.getRecognitionClues()) : "[]");
                    } catch (Exception e) {
                        level.setRecognitionClues("[]");
                    }
                    level.setConcepts("");
                    try {
                        level.setPrerequisites(pl.getPrerequisites() != null ? listMapper.writeValueAsString(pl.getPrerequisites()) : "[]");
                    } catch (Exception e) {
                        level.setPrerequisites("[]");
                    }
                    try {
                        level.setCommonMistakes(pl.getCommonMistakes() != null ? listMapper.writeValueAsString(pl.getCommonMistakes()) : "[]");
                    } catch (Exception e) {
                        level.setCommonMistakes("[]");
                    }
                    level.setDisplayOrder(displayOrder);
                    level.setChapter(chapter);

                    if (pl.getProblems() != null) {
                        for (ProblemInPatternJson pj : pl.getProblems()) {
                            Problem problem = new Problem();
                            String problemId = data.getId() + "-" + pl.getId() + "-" + pj.getLeetcodeNumber();
                            problem.setProblemId(problemId);
                            problem.setLeetcodeNumber(pj.getLeetcodeNumber());
                            problem.setTitle(pj.getTitle());
                            problem.setDifficulty(parseDifficulty(pj.getDifficulty()));
                            problem.setServiceImportance(pj.getServiceImportance());
                            problem.setProductImportance(pj.getProductImportance());
                            problem.setEstimatedMinutes(0);
                            problem.setLeetcodeUrl(pj.getLeetcodeUrl());
                            problem.setLevel(level);

                            Pattern pattern = patternCache.get(pl.getId());
                            problem.setPattern(pattern);

                            if (pj.getCompanies() != null) {
                                Set<Company> companies = pj.getCompanies().stream()
                                        .map(companyName -> findCompanyByName(companyCache, companyName))
                                        .filter(c -> c != null)
                                        .collect(Collectors.toSet());
                                problem.setCompanies(companies);
                            }

                            level.getProblems().add(problem);
                        }
                    }

                    chapter.getLevels().add(level);
                    displayOrder++;
                }

                chapterRepository.save(chapter);
                int totalProblems = data.getPatterns().stream()
                        .mapToInt(p -> p.getProblems() != null ? p.getProblems().size() : 0).sum();
                log.info("Imported chapter data: {} ({} patterns, {} problems)", data.getId(),
                        data.getPatterns().size(), totalProblems);
        }
    }

    private List<ChapterDataEntry> loadChapterDataEntries() {
        try {
            List<ChapterIndexJson> chapters = readJsonList("chapters.json", ChapterIndexJson.class);
            List<ChapterDataEntry> entries = new ArrayList<>();
            for (ChapterIndexJson ch : chapters) {
                String filename = CHAPTER_FILENAME_OVERRIDES.getOrDefault(ch.getId(), ch.getId() + ".json");
                entries.add(new ChapterDataEntry(ch.getId(), filename));
            }
            return entries;
        } catch (IOException e) {
            log.warn("Could not load chapters.json: {}", e.getMessage());
            return List.of();
        }
    }

    private static class ChapterDataEntry {
        final String chapterId;
        final String filename;
        ChapterDataEntry(String chapterId, String filename) {
            this.chapterId = chapterId;
            this.filename = filename;
        }
    }

    private Company findCompanyByName(Map<String, Company> companyCache, String companyName) {
        return companyCache.values().stream()
                .filter(c -> c.getName().equalsIgnoreCase(companyName))
                .findFirst()
                .orElse(null);
    }

    private Difficulty parseDifficulty(String diff) {
        if (diff == null) return Difficulty.easy;
        return switch (diff.toLowerCase()) {
            case "hard" -> Difficulty.hard;
            case "medium" -> Difficulty.medium;
            default -> Difficulty.easy;
        };
    }

    private <T> List<T> readJsonList(String filename, Class<?> elementClass) throws IOException {
        Resource resource = resourceLoader.getResource(DATA_DIR + filename);
        if (!resource.exists()) {
            log.warn("File not found: {}", filename);
            return Collections.emptyList();
        }
        try (InputStream is = resource.getInputStream()) {
            return objectMapper.readValue(is, objectMapper.getTypeFactory()
                    .constructCollectionType(List.class, elementClass));
        }
    }

    public static class ChapterIndexJson {
        private String id;
        private String title;
        private String icon;
        private int order;
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getIcon() { return icon; }
        public void setIcon(String icon) { this.icon = icon; }
        public int getOrder() { return order; }
        public void setOrder(int order) { this.order = order; }
    }

    public static class ChapterDataJson {
        private String id;
        private String title;
        private String description;
        private List<PatternLevelJson> patterns;
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public List<PatternLevelJson> getPatterns() { return patterns; }
        public void setPatterns(List<PatternLevelJson> patterns) { this.patterns = patterns; }
    }

    public static class PatternLevelJson {
        private String id;
        private String name;
        private String description;
        private List<String> recognitionClues;
        private List<String> prerequisites;
        private List<String> commonMistakes;
        private int estimatedProblems;
        private List<ProblemInPatternJson> problems;
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public List<String> getRecognitionClues() { return recognitionClues; }
        public void setRecognitionClues(List<String> recognitionClues) { this.recognitionClues = recognitionClues; }
        public List<String> getPrerequisites() { return prerequisites; }
        public void setPrerequisites(List<String> prerequisites) { this.prerequisites = prerequisites; }
        public List<String> getCommonMistakes() { return commonMistakes; }
        public void setCommonMistakes(List<String> commonMistakes) { this.commonMistakes = commonMistakes; }
        public int getEstimatedProblems() { return estimatedProblems; }
        public void setEstimatedProblems(int estimatedProblems) { this.estimatedProblems = estimatedProblems; }
        public List<ProblemInPatternJson> getProblems() { return problems; }
        public void setProblems(List<ProblemInPatternJson> problems) { this.problems = problems; }
    }

    public static class ProblemInPatternJson {
        private int leetcodeNumber;
        private String title;
        private String difficulty;
        private int serviceImportance;
        private int productImportance;
        private List<String> companies;
        private String leetcodeUrl;
        public int getLeetcodeNumber() { return leetcodeNumber; }
        public void setLeetcodeNumber(int leetcodeNumber) { this.leetcodeNumber = leetcodeNumber; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDifficulty() { return difficulty; }
        public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
        public int getServiceImportance() { return serviceImportance; }
        public void setServiceImportance(int serviceImportance) { this.serviceImportance = serviceImportance; }
        public int getProductImportance() { return productImportance; }
        public void setProductImportance(int productImportance) { this.productImportance = productImportance; }
        public List<String> getCompanies() { return companies; }
        public void setCompanies(List<String> companies) { this.companies = companies; }
        public String getLeetcodeUrl() { return leetcodeUrl; }
        public void setLeetcodeUrl(String leetcodeUrl) { this.leetcodeUrl = leetcodeUrl; }
    }

    public static class CompanyJson {
        private String id;
        private String name;
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    }

    public static class PatternJson {
        private String id;
        private String name;
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    }

}
