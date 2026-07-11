package com.dsabook.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProgressDTO {

    private Long id;
    private String problemId;
    private String status;
    private LocalDateTime lastUpdated;

}
