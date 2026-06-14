package com.swapskill.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SkillDTO {

    private Long skillId;

    @NotBlank(message = "Skill name is required")
    private String name;

    @NotBlank(message = "Level is required")
    private String level;

    @NotBlank(message = "Type is required")
    private String type; // OFFERED or WANTED

    
}