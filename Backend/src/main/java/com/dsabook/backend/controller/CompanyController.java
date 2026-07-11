package com.dsabook.backend.controller;

import com.dsabook.backend.dto.CompanyDTO;
import com.dsabook.backend.dto.ProblemDTO;
import com.dsabook.backend.service.CompanyService;
import com.dsabook.backend.service.ProblemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CompanyController {

    private final CompanyService companyService;
    private final ProblemService problemService;

    public CompanyController(CompanyService companyService, ProblemService problemService) {
        this.companyService = companyService;
        this.problemService = problemService;
    }

    @GetMapping("/companies")
    public ResponseEntity<List<CompanyDTO>> getAllCompanies() {
        return ResponseEntity.ok(companyService.getAllCompanies());
    }

    @GetMapping("/company/{id}/problems")
    public ResponseEntity<List<ProblemDTO>> getProblemsByCompany(@PathVariable Long id) {
        return ResponseEntity.ok(problemService.getProblemsByCompanyId(id));
    }

}
