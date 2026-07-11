package com.dsabook.backend.service;

import com.dsabook.backend.dto.CompanyDTO;
import com.dsabook.backend.entity.Company;
import com.dsabook.backend.exception.ResourceNotFoundException;
import com.dsabook.backend.mapper.CompanyMapper;
import com.dsabook.backend.repository.CompanyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final CompanyMapper companyMapper;

    public CompanyService(CompanyRepository companyRepository, CompanyMapper companyMapper) {
        this.companyRepository = companyRepository;
        this.companyMapper = companyMapper;
    }

    public List<CompanyDTO> getAllCompanies() {
        return companyRepository.findAll().stream()
                .map(companyMapper::toDTO)
                .collect(Collectors.toList());
    }

    public CompanyDTO getCompanyById(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company", "id", id));
        return companyMapper.toDTO(company);
    }

    public CompanyDTO getCompanyByCompanyId(String companyId) {
        Company company = companyRepository.findByCompanyId(companyId)
                .orElseThrow(() -> new ResourceNotFoundException("Company", "companyId", companyId));
        return companyMapper.toDTO(company);
    }

}
