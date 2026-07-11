package com.dsabook.backend.repository;

import com.dsabook.backend.entity.Pattern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatternRepository extends JpaRepository<Pattern, Long> {

    Optional<Pattern> findByPatternId(String patternId);

    boolean existsByPatternId(String patternId);

}
