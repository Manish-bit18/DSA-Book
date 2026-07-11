package com.dsabook.backend.mapper;

import com.dsabook.backend.dto.PatternDTO;
import com.dsabook.backend.entity.Pattern;
import org.springframework.stereotype.Component;

@Component
public class PatternMapper {

    public PatternDTO toDTO(Pattern pattern) {
        if (pattern == null) return null;
        return PatternDTO.builder()
                .id(pattern.getPatternId())
                .name(pattern.getName())
                .description(pattern.getDescription())
                .build();
    }

}
