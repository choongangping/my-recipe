package com.myrecipe.recipe.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class Recipe {
    private Long id;
    private Long userId;
    private String title;
    private String description;
    private Integer kcal;
    private Double carb;
    private Double protein;
    private Double fat;
    private Integer prepTimeMin;
    private Integer cookTimeMin;
    private String difficulty;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;
}
