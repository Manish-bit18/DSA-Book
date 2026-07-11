package com.dsabook.backend.mapper;

import com.dsabook.backend.dto.ProgressDTO;
import com.dsabook.backend.entity.UserProgress;
import org.springframework.stereotype.Component;

@Component
public class ProgressMapper {

    public ProgressDTO toDTO(UserProgress progress) {
        if (progress == null) return null;
        return ProgressDTO.builder()
                .id(progress.getId())
                .problemId(progress.getProblemId())
                .status(progress.getStatus().name())
                .lastUpdated(progress.getLastUpdated())
                .build();
    }

}
