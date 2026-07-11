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
public class LevelDTO {

    private String id;
    private String title;
    private String subtitle;
    private Integer order;
    private String goal;
    private String recognitionClues;
    private String concepts;
    private String prerequisites;
    private String commonMistakes;
    private List<String> patterns;
    private List<ProblemSummaryDTO> problems;

}
