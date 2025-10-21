package com.myrecipe.recipe.controller;

import com.myrecipe.recipe.domain.Recipe;
import com.myrecipe.recipe.dto.RecipeCreateRequest;
import com.myrecipe.recipe.dto.RecipeResponse;
import com.myrecipe.recipe.dto.RecipeUpdateRequest;
import com.myrecipe.recipe.service.RecipeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
public class RecipeController {
    private final RecipeService recipeService;

    @GetMapping("/recipes")
    public ResponseEntity<List<RecipeResponse>> getRecipes() {
        List<Recipe> recipes = recipeService.getRecipes();
        List<RecipeResponse> response = recipes.stream().map(RecipeResponse::from).toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/recipe/{id}")
    public ResponseEntity<RecipeResponse> getRecipe(@PathVariable long id) {
        Recipe recipe = recipeService.getRecipe(id);
        return ResponseEntity.ok(RecipeResponse.from(recipe));
    }

    @PostMapping("/recipe")
    public ResponseEntity<RecipeResponse> createRecipe(@RequestBody @Valid RecipeCreateRequest request) {
        Recipe createdRecipe = recipeService.createRecipe(request);
        return new ResponseEntity<>(RecipeResponse.from(createdRecipe), HttpStatus.CREATED);
    }

    @PutMapping("/recipe/{id}")
    public ResponseEntity<RecipeResponse> updateRecipe(@PathVariable long id, @RequestBody @Valid RecipeUpdateRequest request) {
        Recipe updatedRecipe = recipeService.updateRecipe(id, request);
        return ResponseEntity.ok(RecipeResponse.from(updatedRecipe));
    }

    @DeleteMapping("/recipe/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable long id) {
        recipeService.deleteRecipe(id);
        return ResponseEntity.noContent().build();
    }
}
