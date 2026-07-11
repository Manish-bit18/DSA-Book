package com.dsabook.backend.controller;

import com.dsabook.backend.dto.ProblemDTO;
import com.dsabook.backend.service.ProblemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/problems")
public class ProblemController {

    private final ProblemService problemService;

    public ProblemController(ProblemService problemService) {
        this.problemService = problemService;
    }

    @GetMapping
    public ResponseEntity<List<ProblemDTO>> getAllProblems() {
        return ResponseEntity.ok(problemService.getAllProblems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProblemDTO> getProblemById(@PathVariable String id) {
        try {
            Long numericId = Long.parseLong(id);
            return ResponseEntity.ok(problemService.getProblemById(numericId));
        } catch (NumberFormatException e) {
            return ResponseEntity.ok(problemService.getProblemByProblemId(id));
        }
    }

    @GetMapping("/level/{levelId}")
    public ResponseEntity<List<ProblemDTO>> getProblemsByLevel(@PathVariable Long levelId) {
        return ResponseEntity.ok(problemService.getProblemsByLevelId(levelId));
    }

}
