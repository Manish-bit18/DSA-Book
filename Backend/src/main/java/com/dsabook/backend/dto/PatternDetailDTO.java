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
public class PatternDetailDTO {

    private String id;
    private String name;
    private String description;
    private List<String> recognitionClues;
    private List<String> prerequisites;
    private List<String> commonMistakes;
    private List<ProblemDTO> problems;

}
