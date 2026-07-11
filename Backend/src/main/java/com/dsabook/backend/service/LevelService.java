package com.dsabook.backend.service;

import com.dsabook.backend.dto.LevelDTO;
import com.dsabook.backend.entity.Level;
import com.dsabook.backend.exception.ResourceNotFoundException;
import com.dsabook.backend.mapper.LevelMapper;
import com.dsabook.backend.repository.LevelRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class LevelService {

    private final LevelRepository levelRepository;
    private final LevelMapper levelMapper;

    public LevelService(LevelRepository levelRepository, LevelMapper levelMapper) {
        this.levelRepository = levelRepository;
        this.levelMapper = levelMapper;
    }

    public List<LevelDTO> getLevelsByChapterId(Long chapterId) {
        return levelRepository.findByChapterIdOrderByDisplayOrder(chapterId).stream()
                .map(levelMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<LevelDTO> getLevelsByChapterStringId(String chapterId) {
        return levelRepository.findByChapterChapterId(chapterId).stream()
                .map(levelMapper::toDTO)
                .collect(Collectors.toList());
    }

    public LevelDTO getLevelById(Long id) {
        Level level = levelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Level", "id", id));
        return levelMapper.toDTO(level);
    }

    public LevelDTO getLevelByLevelId(String levelId) {
        Level level = levelRepository.findByLevelId(levelId)
                .orElseThrow(() -> new ResourceNotFoundException("Level", "levelId", levelId));
        return levelMapper.toDTO(level);
    }

}
