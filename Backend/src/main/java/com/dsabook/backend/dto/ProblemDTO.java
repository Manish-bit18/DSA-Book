package com.dsabook.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProblemDTO {

    private String id;
    private Integer lcNumber;
    private String title;
    private String difficulty;
    private String patternId;
    private String patternName;
    private List<String> companyIds;
    private List<String> companyNames;
    private Integer serviceRating;
    private Integer productRating;
    private String leetcodeUrl;
    private String chapterId;
    private String chapterTitle;

}
