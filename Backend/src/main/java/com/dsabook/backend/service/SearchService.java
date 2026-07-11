package com.dsabook.backend.service;

import com.dsabook.backend.dto.ProblemDTO;
import com.dsabook.backend.entity.Problem;
import com.dsabook.backend.entity.ProblemStatus;
import com.dsabook.backend.entity.UserProgress;
import com.dsabook.backend.mapper.ProblemMapper;
import com.dsabook.backend.repository.ProblemRepository;
import com.dsabook.backend.repository.UserProgressRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Transactional(readOnly = true)
public class SearchService {

    private final ProblemRepository problemRepository;
    private final UserProgressRepository userProgressRepository;
    private final ProblemMapper problemMapper;

    public SearchService(ProblemRepository problemRepository,
                         UserProgressRepository userProgressRepository,
                         ProblemMapper problemMapper) {
        this.problemRepository = problemRepository;
        this.userProgressRepository = userProgressRepository;
        this.problemMapper = problemMapper;
    }

    public List<ProblemDTO> search(String keyword, String difficulty, String patternId,
                                   String companyId, String status) {
        Stream<Problem> stream = problemRepository.findAll().stream();

        if (keyword != null && !keyword.isBlank()) {
            String lower = keyword.toLowerCase();
            stream = stream.filter(p ->
                    p.getTitle().toLowerCase().contains(lower) ||
                    String.valueOf(p.getLeetcodeNumber()).equals(keyword)
            );
        }

        if (difficulty != null && !difficulty.isBlank()) {
            stream = stream.filter(p -> p.getDifficulty().name().equalsIgnoreCase(difficulty));
        }

        if (patternId != null && !patternId.isBlank()) {
            stream = stream.filter(p ->
                    p.getPattern() != null && p.getPattern().getPatternId().equals(patternId));
        }

        if (companyId != null && !companyId.isBlank()) {
            stream = stream.filter(p ->
                    p.getCompanies().stream().anyMatch(c -> c.getCompanyId().equals(companyId)));
        }

        if (status != null && !status.isBlank()) {
            Map<String, ProblemStatus> progressMap = userProgressRepository.findAll().stream()
                    .collect(Collectors.toMap(UserProgress::getProblemId, UserProgress::getStatus));

            ProblemStatus targetStatus;
            try {
                targetStatus = ProblemStatus.valueOf(status);
            } catch (IllegalArgumentException e) {
                return List.of();
            }

            if (targetStatus == ProblemStatus.NOT_STARTED) {
                stream = stream.filter(p ->
                        !progressMap.containsKey(p.getProblemId()) ||
                        progressMap.get(p.getProblemId()) == ProblemStatus.NOT_STARTED);
            } else {
                stream = stream.filter(p ->
                        progressMap.containsKey(p.getProblemId()) &&
                        progressMap.get(p.getProblemId()) == targetStatus);
            }
        }

        return stream.map(problemMapper::toDTO).collect(Collectors.toList());
    }

}
