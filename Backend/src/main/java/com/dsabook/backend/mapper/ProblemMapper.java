package com.dsabook.backend.mapper;

import com.dsabook.backend.dto.ProblemDTO;
import com.dsabook.backend.dto.ProblemSummaryDTO;
import com.dsabook.backend.entity.Company;
import com.dsabook.backend.entity.Level;
import com.dsabook.backend.entity.Problem;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProblemMapper {

    public ProblemDTO toDTO(Problem problem) {
        if (problem == null) return null;

        Level level = problem.getLevel();

        List<String> companyIds = problem.getCompanies() != null
                ? problem.getCompanies().stream().map(Company::getCompanyId).collect(Collectors.toList())
                : Collections.emptyList();

        List<String> companyNames = problem.getCompanies() != null
                ? problem.getCompanies().stream().map(Company::getName).collect(Collectors.toList())
                : Collections.emptyList();

        return ProblemDTO.builder()
                .id(problem.getProblemId())
                .lcNumber(problem.getLeetcodeNumber())
                .title(problem.getTitle())
                .difficulty(problem.getDifficulty().name())
                .patternId(problem.getPattern() != null ? problem.getPattern().getPatternId() : null)
                .patternName(problem.getPattern() != null ? problem.getPattern().getName() : null)
                .companyIds(companyIds)
                .companyNames(companyNames)
                .serviceRating(problem.getServiceImportance())
                .productRating(problem.getProductImportance())
                .leetcodeUrl(problem.getLeetcodeUrl())
                .chapterId(level != null && level.getChapter() != null ? level.getChapter().getChapterId() : null)
                .chapterTitle(level != null && level.getChapter() != null ? level.getChapter().getTitle() : null)
                .build();
    }

    public ProblemSummaryDTO toSummary(Problem problem) {
        if (problem == null) return null;
        return ProblemSummaryDTO.builder()
                .id(problem.getProblemId())
                .lcNumber(problem.getLeetcodeNumber())
                .title(problem.getTitle())
                .difficulty(problem.getDifficulty().name())
                .patternId(problem.getPattern() != null ? problem.getPattern().getPatternId() : null)
                .serviceRating(problem.getServiceImportance())
                .productRating(problem.getProductImportance())
                .leetcodeUrl(problem.getLeetcodeUrl())
                .build();
    }

}
