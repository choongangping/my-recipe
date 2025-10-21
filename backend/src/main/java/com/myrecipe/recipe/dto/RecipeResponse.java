package com.myrecipe.recipe.dto;

import com.myrecipe.recipe.domain.Recipe;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class RecipeResponse {
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

    // Domain -> Response Dto 변환 팩토리 메서드
    public static RecipeResponse from(Recipe recipe) {
        RecipeResponse response = new RecipeResponse();
        response.setId(recipe.getId());
        response.setUserId(recipe.getUserId());
        response.setTitle(recipe.getTitle());
        response.setDescription(recipe.getDescription());
        response.setKcal(recipe.getKcal());
        response.setCarb(recipe.getCarb());
        response.setProtein(recipe.getProtein());
        response.setFat(recipe.getFat());
        response.setPrepTimeMin(recipe.getPrepTimeMin());
        response.setCookTimeMin(recipe.getCookTimeMin());
        response.setDifficulty(recipe.getDifficulty());
        response.setStatus(recipe.getStatus());
        response.setCreatedAt(recipe.getCreatedAt());
        response.setUpdatedAt(recipe.getUpdatedAt());
        return response;
    }
}
