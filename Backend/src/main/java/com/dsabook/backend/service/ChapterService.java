package com.dsabook.backend.service;

import com.dsabook.backend.dto.ChapterDTO;
import com.dsabook.backend.dto.ChapterDataDTO;
import com.dsabook.backend.dto.PatternDetailDTO;
import com.dsabook.backend.entity.Chapter;
import com.dsabook.backend.entity.Level;
import com.dsabook.backend.entity.Problem;
import com.dsabook.backend.exception.ResourceNotFoundException;
import com.dsabook.backend.mapper.ChapterMapper;
import com.dsabook.backend.mapper.ProblemMapper;
import com.dsabook.backend.repository.ChapterRepository;
import com.dsabook.backend.repository.LevelRepository;
import com.dsabook.backend.repository.PatternRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class ChapterService {

    private final ChapterRepository chapterRepository;
    private final ChapterMapper chapterMapper;
    private final ProblemMapper problemMapper;
    private final LevelRepository levelRepository;
    private final PatternRepository patternRepository;
    private final ObjectMapper objectMapper;

    public ChapterService(ChapterRepository chapterRepository, ChapterMapper chapterMapper,
                          ProblemMapper problemMapper, LevelRepository levelRepository,
                          PatternRepository patternRepository, ObjectMapper objectMapper) {
        this.chapterRepository = chapterRepository;
        this.chapterMapper = chapterMapper;
        this.problemMapper = problemMapper;
        this.levelRepository = levelRepository;
        this.patternRepository = patternRepository;
        this.objectMapper = objectMapper;
    }

    public List<ChapterDTO> getAllChapters() {
        return chapterRepository.findAllByOrderByDisplayOrder().stream()
                .map(chapterMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ChapterDTO getChapterById(Long id) {
        Chapter chapter = chapterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Chapter", "id", id));
        return chapterMapper.toDTO(chapter);
    }

    public ChapterDTO getChapterByChapterId(String chapterId) {
        Chapter chapter = chapterRepository.findByChapterId(chapterId)
                .orElseThrow(() -> new ResourceNotFoundException("Chapter", "chapterId", chapterId));
        return chapterMapper.toDTO(chapter);
    }

    public ChapterDataDTO getChapterData(String chapterId) {
        Chapter chapter = chapterRepository.findByChapterId(chapterId)
                .orElseThrow(() -> new ResourceNotFoundException("Chapter", "chapterId", chapterId));

        List<Level> levels = levelRepository.findByChapterChapterId(chapterId);

        // Build pattern groups from level data, preserving insertion order
        Map<String, List<Problem>> patternProblems = new LinkedHashMap<>();
        Map<String, Level> patternLevelMap = new LinkedHashMap<>();

        for (Level level : levels) {
            for (Problem problem : level.getProblems()) {
                if (problem.getPattern() == null) continue;
                String pid = problem.getPattern().getPatternId();
                patternProblems.computeIfAbsent(pid, k -> new ArrayList<>()).add(problem);
                patternLevelMap.putIfAbsent(pid, level);
            }
        }

        List<PatternDetailDTO> patterns = new ArrayList<>();
        // Maintain insertion order based on when pattern first appears across levels
        for (Level level : levels) {
            for (Problem problem : level.getProblems()) {
                if (problem.getPattern() == null) continue;
                String pid = problem.getPattern().getPatternId();
                if (!patternLevelMap.containsKey(pid)) continue;

                com.dsabook.backend.entity.Pattern patternEntity = problem.getPattern();
                Level associatedLevel = patternLevelMap.get(pid);
                patternLevelMap.remove(pid);

                patterns.add(PatternDetailDTO.builder()
                        .id(pid)
                        .name(patternEntity.getName())
                        .description(patternEntity.getDescription() != null ? patternEntity.getDescription() : "")
                        .recognitionClues(parseJsonList(associatedLevel.getRecognitionClues()))
                        .prerequisites(parseJsonList(associatedLevel.getPrerequisites()))
                        .commonMistakes(parseJsonList(associatedLevel.getCommonMistakes()))
                        .problems(patternProblems.get(pid).stream()
                                .map(problemMapper::toDTO)
                                .collect(Collectors.toList()))
                        .build());
            }
        }

        return ChapterDataDTO.builder()
                .id(chapter.getChapterId())
                .title(chapter.getTitle())
                .description(chapter.getDescription())
                .patterns(patterns)
                .build();
    }

    private List<String> parseJsonList(String json) {
        if (json == null || json.isEmpty()) return List.of();
        try {
            return objectMapper.readValue(json, new TypeReference<List<String>>() {});
        } catch (Exception e) {
            return List.of();
        }
    }

}
