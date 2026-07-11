package com.dsabook.backend.service;

import com.dsabook.backend.dto.ProgressDTO;
import com.dsabook.backend.entity.ProblemStatus;
import com.dsabook.backend.entity.UserProgress;
import com.dsabook.backend.exception.BadRequestException;
import com.dsabook.backend.exception.ResourceNotFoundException;
import com.dsabook.backend.mapper.ProgressMapper;
import com.dsabook.backend.repository.ProblemRepository;
import com.dsabook.backend.repository.UserProgressRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProgressService {

    private final UserProgressRepository userProgressRepository;
    private final ProblemRepository problemRepository;
    private final ProgressMapper progressMapper;

    public ProgressService(UserProgressRepository userProgressRepository,
                           ProblemRepository problemRepository,
                           ProgressMapper progressMapper) {
        this.userProgressRepository = userProgressRepository;
        this.problemRepository = problemRepository;
        this.progressMapper = progressMapper;
    }

    @Transactional(readOnly = true)
    public List<ProgressDTO> getAllProgress() {
        return userProgressRepository.findAll().stream()
                .map(progressMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ProgressDTO updateProgress(String problemId, String status) {
        if (!problemRepository.existsByProblemId(problemId)) {
            throw new ResourceNotFoundException("Problem", "problemId", problemId);
        }

        ProblemStatus problemStatus;
        try {
            problemStatus = ProblemStatus.valueOf(status);
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid status: " + status + ". Allowed: NOT_STARTED, ATTEMPTING, SOLVED");
        }

        UserProgress progress = userProgressRepository.findByProblemId(problemId)
                .orElseGet(() -> {
                    UserProgress newProgress = new UserProgress();
                    newProgress.setProblemId(problemId);
                    return newProgress;
                });

        progress.setStatus(problemStatus);
        UserProgress saved = userProgressRepository.save(progress);
        return progressMapper.toDTO(saved);
    }

}
