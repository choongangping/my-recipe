package com.myrecipe.recipe.mapper;

import com.myrecipe.recipe.domain.Recipe;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RecipeMapper {
    List<Recipe> getRecipes();
    Recipe getRecipe(long id);
    int createRecipe(Recipe recipe);
    int updateRecipe(Recipe recipe);
    int deleteRecipe(long id);
}
