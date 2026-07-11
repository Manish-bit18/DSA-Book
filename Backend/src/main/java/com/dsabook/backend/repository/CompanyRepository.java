package com.dsabook.backend.repository;

import com.dsabook.backend.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

    Optional<Company> findByCompanyId(String companyId);

    boolean existsByCompanyId(String companyId);

}
