package com.myrecipe.recipe.dto;

import com.myrecipe.recipe.domain.Recipe;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RecipeCreateRequest {
    @NotNull(message = "사용자 ID는 필수입니다.")
    private Long userId;

    @NotBlank(message = "제목은 필수입니다.")
    private String title;

    @NotBlank(message = "설명은 필수입니다.")
    private String description;

    @Min(value = 0, message = "칼로리는 0 이상이어야 합니다.")
    private Integer kcal;
    private Double carb;
    private Double protein;
    private Double fat;

    @Min(value = 0, message = "준비 시간은 0분 이상이어야 합니다.")
    private Integer prepTimeMin;
    @Min(value = 0, message = "요리 시간은 0분 이상이어야 합니다.")
    private Integer cookTimeMin;
    private String difficulty;

    // Request Dto -> Domain 변환 팩토리 메서드
    public Recipe toDomain() {
        Recipe recipe = new Recipe();
        recipe.setUserId(this.userId);
        recipe.setTitle(this.title);
        recipe.setDescription(this.description);
        recipe.setKcal(this.kcal);
        recipe.setCarb(this.carb);
        recipe.setProtein(this.protein);
        recipe.setFat(this.fat);
        recipe.setPrepTimeMin(this.prepTimeMin);
        recipe.setCookTimeMin(this.cookTimeMin);
        recipe.setDifficulty(this.difficulty);
        recipe.setStatus("DRAFT");
        return recipe;
    }
}