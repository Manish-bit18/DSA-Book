package com.dsabook.backend.mapper;

import com.dsabook.backend.dto.LevelDTO;
import com.dsabook.backend.dto.ProblemSummaryDTO;
import com.dsabook.backend.entity.Level;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class LevelMapper {

    private final ProblemMapper problemMapper;

    public LevelMapper(ProblemMapper problemMapper) {
        this.problemMapper = problemMapper;
    }

    public LevelDTO toDTO(Level level) {
        if (level == null) return null;
        List<ProblemSummaryDTO> problemSummaries = level.getProblems() != null
                ? level.getProblems().stream()
                        .map(problemMapper::toSummary)
                        .collect(Collectors.toList())
                : Collections.emptyList();

        List<String> patternIds = level.getProblems() != null
                ? level.getProblems().stream()
                        .filter(p -> p.getPattern() != null)
                        .map(p -> p.getPattern().getPatternId())
                        .distinct()
                        .collect(Collectors.toList())
                : Collections.emptyList();

        return LevelDTO.builder()
                .id(level.getLevelId())
                .title(level.getTitle())
                .subtitle(level.getDescription() != null ? level.getDescription() : "")
                .order(level.getDisplayOrder())
                .goal(level.getGoal())
                .recognitionClues(level.getRecognitionClues())
                .concepts(level.getConcepts())
                .prerequisites(level.getPrerequisites() != null ? level.getPrerequisites() : "")
                .commonMistakes(level.getCommonMistakes())
                .patterns(patternIds)
                .problems(problemSummaries)
                .build();
    }

}
