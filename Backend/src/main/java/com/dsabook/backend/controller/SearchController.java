package com.dsabook.backend.controller;

import com.dsabook.backend.dto.ProblemDTO;
import com.dsabook.backend.service.SearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/problems/search")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    public ResponseEntity<List<ProblemDTO>> search(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String pattern,
            @RequestParam(required = false) String company,
            @RequestParam(required = false) String status) {
        return ResponseEntity.ok(searchService.search(keyword, difficulty, pattern, company, status));
    }

}
