package com.dsabook.backend.mapper;

import com.dsabook.backend.dto.CompanyDTO;
import com.dsabook.backend.entity.Company;
import org.springframework.stereotype.Component;

@Component
public class CompanyMapper {

    public CompanyDTO toDTO(Company company) {
        if (company == null) return null;
        return CompanyDTO.builder()
                .id(company.getCompanyId())
                .name(company.getName())
                .build();
    }

}
