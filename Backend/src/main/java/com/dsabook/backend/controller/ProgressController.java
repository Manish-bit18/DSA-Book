package com.dsabook.backend.controller;

import com.dsabook.backend.dto.ProgressDTO;
import com.dsabook.backend.dto.ProgressRequest;
import com.dsabook.backend.service.ProgressService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping
    public ResponseEntity<List<ProgressDTO>> getAllProgress() {
        return ResponseEntity.ok(progressService.getAllProgress());
    }

    @PutMapping("/{problemId}")
    public ResponseEntity<ProgressDTO> updateProgress(
            @PathVariable String problemId,
            @Valid @RequestBody ProgressRequest request) {
        return ResponseEntity.ok(progressService.updateProgress(problemId, request.getStatus()));
    }

}
