package com.dsabook.backend.repository;

import com.dsabook.backend.entity.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {

    Optional<UserProgress> findByProblemId(String problemId);

    boolean existsByProblemId(String problemId);

}
