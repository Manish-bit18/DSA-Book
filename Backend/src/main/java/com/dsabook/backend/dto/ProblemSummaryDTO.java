package com.dsabook.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProblemSummaryDTO {

    private String id;
    private Integer lcNumber;
    private String title;
    private String difficulty;
    private String patternId;
    private Integer serviceRating;
    private Integer productRating;
    private String leetcodeUrl;

}
