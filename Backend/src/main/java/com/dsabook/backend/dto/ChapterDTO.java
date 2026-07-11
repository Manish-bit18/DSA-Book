package com.dsabook.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChapterDTO {

    private String id;
    private String title;
    private String icon;
    private String description;
    private Integer order;

}
