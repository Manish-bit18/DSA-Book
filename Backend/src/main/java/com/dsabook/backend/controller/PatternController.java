package com.dsabook.backend.controller;

import com.dsabook.backend.dto.PatternDTO;
import com.dsabook.backend.dto.ProblemDTO;
import com.dsabook.backend.service.PatternService;
import com.dsabook.backend.service.ProblemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PatternController {

    private final PatternService patternService;
    private final ProblemService problemService;

    public PatternController(PatternService patternService, ProblemService problemService) {
        this.patternService = patternService;
        this.problemService = problemService;
    }

    @GetMapping("/patterns")
    public ResponseEntity<List<PatternDTO>> getAllPatterns() {
        return ResponseEntity.ok(patternService.getAllPatterns());
    }

    @GetMapping("/pattern/{id}/problems")
    public ResponseEntity<List<ProblemDTO>> getProblemsByPattern(@PathVariable Long id) {
        return ResponseEntity.ok(problemService.getProblemsByPatternLongId(id));
    }

}
