package com.myrecipe.recipe.service;

import com.myrecipe.common.exception.client.ResourceNotFoundException;
import com.myrecipe.common.exception.server.DataPersistenceException;
import com.myrecipe.recipe.domain.Recipe;
import com.myrecipe.recipe.dto.RecipeCreateRequest;
import com.myrecipe.recipe.dto.RecipeUpdateRequest;
import com.myrecipe.recipe.mapper.RecipeMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class RecipeService {
    private final RecipeMapper recipeMapper;
    private final MessageSource messageSource;

    // ---- 전체 레시피 조회 ---- //
    public List<Recipe> getRecipes() {
        return recipeMapper.getRecipes();
    }

    // ---- 특정 레시피 조회 ---- //
    public Recipe getRecipe(long id) {
        // 입력 데이터 로깅
        log.debug("Getting recipe: ID='{}'", id);

        // 레시피 DB select
        Recipe recipe = recipeMapper.getRecipe(id);

        // 예외 처리
        if (recipe == null) {
            String errorMessage = messageSource.getMessage("recipe.notfound", new Object[]{id}, LocaleContextHolder.getLocale());
            throw new ResourceNotFoundException(errorMessage, "ERR_RECIPE_NOT_FOUND");
        }
        return recipe;
    }

    // ---- 레시피 생성 ---- //
    @Transactional
    public Recipe createRecipe(RecipeCreateRequest request) {
        // 입력 데이터 로깅
        log.debug("Creating recipe: request='{}'", request);

        // Dto -> Domain 변환
        Recipe recipe = request.toDomain();

        // 레시피 DB insert
        int result = recipeMapper.createRecipe(recipe);

        // 예외 처리
        if (result != 1) {
            String errorMessage = messageSource.getMessage("recipe.create.failed", null, LocaleContextHolder.getLocale());
            throw new DataPersistenceException(errorMessage, "ERR_RECIPE_CREATE_FAILED");
        }
        return recipe;
    }

    // ---- 레시피 수정 ---- //
    @Transactional
    public Recipe updateRecipe(long id, RecipeUpdateRequest request) {
        // 입력 데이터 로깅
        log.debug("Updating recipe: ID='{}', request='{}'", id, request);

        // 리소스 존재 여부 확인 및 영속성 객체 획득
        Recipe recipe = getRecipe(id);

        // 영속성 객체의 상태를 Dto의 내용으로 변경
        request.updateDomain(recipe);

        // 레시피 DB update
        int result = recipeMapper.updateRecipe(recipe);

        // 예외 처리
        if (result != 1) {
            String errorMessage = messageSource.getMessage("recipe.update.failed", null, LocaleContextHolder.getLocale());
            throw new DataPersistenceException(errorMessage, "ERR_RECIPE_UPDATE_FAILED");
        }
        return recipe;
    }

    // ---- 레시피 삭제 ---- //
    @Transactional
    public void deleteRecipe(long id) {
        // 입력 데이터 로깅
        log.debug("Deleting recipe: ID='{}'", id);

        // 레시피 DB delete
        int result = recipeMapper.deleteRecipe(id);

        // 예외 처리
        if (result != 1) {
            String errorMessage = messageSource.getMessage("recipe.delete.failed", null, LocaleContextHolder.getLocale());
            throw new DataPersistenceException(errorMessage, "ERR_RECIPE_DELETE_FAILED");
        }
    }
}
