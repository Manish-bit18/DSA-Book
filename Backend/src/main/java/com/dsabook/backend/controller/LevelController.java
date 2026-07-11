package com.dsabook.backend.controller;

import com.dsabook.backend.dto.LevelDTO;
import com.dsabook.backend.service.LevelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LevelController {

    private final LevelService levelService;

    public LevelController(LevelService levelService) {
        this.levelService = levelService;
    }

    @GetMapping("/levels/{chapterId}")
    public ResponseEntity<List<LevelDTO>> getLevelsByChapter(@PathVariable Long chapterId) {
        return ResponseEntity.ok(levelService.getLevelsByChapterId(chapterId));
    }

    @GetMapping("/level/{id}")
    public ResponseEntity<LevelDTO> getLevelById(@PathVariable String id) {
        try {
            Long numericId = Long.parseLong(id);
            return ResponseEntity.ok(levelService.getLevelById(numericId));
        } catch (NumberFormatException e) {
            return ResponseEntity.ok(levelService.getLevelByLevelId(id));
        }
    }

}
