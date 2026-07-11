package com.dsabook.backend.service;

import com.dsabook.backend.dto.PatternDTO;
import com.dsabook.backend.entity.Pattern;
import com.dsabook.backend.exception.ResourceNotFoundException;
import com.dsabook.backend.mapper.PatternMapper;
import com.dsabook.backend.repository.PatternRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class PatternService {

    private final PatternRepository patternRepository;
    private final PatternMapper patternMapper;

    public PatternService(PatternRepository patternRepository, PatternMapper patternMapper) {
        this.patternRepository = patternRepository;
        this.patternMapper = patternMapper;
    }

    public List<PatternDTO> getAllPatterns() {
        return patternRepository.findAll().stream()
                .map(patternMapper::toDTO)
                .collect(Collectors.toList());
    }

    public PatternDTO getPatternById(Long id) {
        Pattern pattern = patternRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pattern", "id", id));
        return patternMapper.toDTO(pattern);
    }

    public PatternDTO getPatternByPatternId(String patternId) {
        Pattern pattern = patternRepository.findByPatternId(patternId)
                .orElseThrow(() -> new ResourceNotFoundException("Pattern", "patternId", patternId));
        return patternMapper.toDTO(pattern);
    }

}
