package com.dsabook.backend.repository;

import com.dsabook.backend.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, Long> {

    Optional<Problem> findByProblemId(String problemId);

    List<Problem> findByLevelIdOrderByLeetcodeNumber(Long levelId);

    List<Problem> findByPatternId(Long patternId);

    List<Problem> findByPatternPatternId(String patternId);

    @Query("SELECT p FROM Problem p JOIN p.companies c WHERE c.id = :companyId")
    List<Problem> findByCompanyId(@Param("companyId") Long companyId);

    @Query("SELECT p FROM Problem p JOIN p.companies c WHERE c.companyId = :companyId")
    List<Problem> findByCompanyCompanyId(@Param("companyId") String companyId);

    boolean existsByProblemId(String problemId);

}
