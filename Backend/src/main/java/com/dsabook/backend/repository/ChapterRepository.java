package com.dsabook.backend.repository;

import com.dsabook.backend.entity.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter, Long> {

    Optional<Chapter> findByChapterId(String chapterId);

    List<Chapter> findAllByOrderByDisplayOrder();

    boolean existsByChapterId(String chapterId);

}
