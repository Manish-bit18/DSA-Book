package com.dsabook.backend.repository;

import com.dsabook.backend.entity.Level;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LevelRepository extends JpaRepository<Level, Long> {

    List<Level> findByChapterIdOrderByDisplayOrder(Long chapterId);

    Optional<Level> findByLevelId(String levelId);

    List<Level> findByChapterChapterId(String chapterId);

}
