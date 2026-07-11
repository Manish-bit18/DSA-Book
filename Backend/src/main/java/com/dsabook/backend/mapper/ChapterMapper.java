package com.dsabook.backend.mapper;

import com.dsabook.backend.dto.ChapterDTO;
import com.dsabook.backend.entity.Chapter;
import org.springframework.stereotype.Component;

@Component
public class ChapterMapper {

    public ChapterDTO toDTO(Chapter chapter) {
        if (chapter == null) return null;
        return ChapterDTO.builder()
                .id(chapter.getChapterId())
                .title(chapter.getTitle())
                .icon(chapter.getIcon() != null ? chapter.getIcon() : "BookOpen")
                .description(chapter.getDescription())
                .order(chapter.getDisplayOrder())
                .build();
    }

}
