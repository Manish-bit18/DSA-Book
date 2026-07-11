package com.dsabook.backend.controller;

import com.dsabook.backend.dto.ChapterDTO;
import com.dsabook.backend.dto.ChapterDataDTO;
import com.dsabook.backend.service.ChapterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/chapters")
public class ChapterController {

    private final ChapterService chapterService;

    public ChapterController(ChapterService chapterService) {
        this.chapterService = chapterService;
    }

    @GetMapping
    public ResponseEntity<List<ChapterDTO>> getAllChapters() {
        return ResponseEntity.ok(chapterService.getAllChapters());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChapterDTO> getChapterById(@PathVariable String id) {
        try {
            Long numericId = Long.parseLong(id);
            return ResponseEntity.ok(chapterService.getChapterById(numericId));
        } catch (NumberFormatException e) {
            return ResponseEntity.ok(chapterService.getChapterByChapterId(id));
        }
    }

    @GetMapping("/{chapterId}/data")
    public ResponseEntity<ChapterDataDTO> getChapterData(@PathVariable String chapterId) {
        return ResponseEntity.ok(chapterService.getChapterData(chapterId));
    }

}
