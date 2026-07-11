package com.dsabook.backend.service;

import com.dsabook.backend.dto.ProblemDTO;
import com.dsabook.backend.entity.Problem;
import com.dsabook.backend.exception.ResourceNotFoundException;
import com.dsabook.backend.mapper.ProblemMapper;
import com.dsabook.backend.repository.ProblemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class ProblemService {

    private final ProblemRepository problemRepository;
    private final ProblemMapper problemMapper;

    public ProblemService(ProblemRepository problemRepository, ProblemMapper problemMapper) {
        this.problemRepository = problemRepository;
        this.problemMapper = problemMapper;
    }

    public List<ProblemDTO> getAllProblems() {
        return problemRepository.findAll().stream()
                .map(problemMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ProblemDTO getProblemById(Long id) {
        Problem problem = problemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Problem", "id", id));
        return problemMapper.toDTO(problem);
    }

    public ProblemDTO getProblemByProblemId(String problemId) {
        Problem problem = problemRepository.findByProblemId(problemId)
                .orElseThrow(() -> new ResourceNotFoundException("Problem", "problemId", problemId));
        return problemMapper.toDTO(problem);
    }

    public List<ProblemDTO> getProblemsByLevelId(Long levelId) {
        return problemRepository.findByLevelIdOrderByLeetcodeNumber(levelId).stream()
                .map(problemMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<ProblemDTO> getProblemsByPatternId(String patternId) {
        return problemRepository.findByPatternPatternId(patternId).stream()
                .map(problemMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<ProblemDTO> getProblemsByPatternLongId(Long patternId) {
        return problemRepository.findByPatternId(patternId).stream()
                .map(problemMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<ProblemDTO> getProblemsByCompanyId(Long companyId) {
        return problemRepository.findByCompanyId(companyId).stream()
                .map(problemMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<ProblemDTO> getProblemsByCompanyStringId(String companyId) {
        return problemRepository.findByCompanyCompanyId(companyId).stream()
                .map(problemMapper::toDTO)
                .collect(Collectors.toList());
    }

}
