package com.cdavinci.backend_cdavinci.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import com.cdavinci.backend_cdavinci.dto.category.CategoryRequestDTO;
import com.cdavinci.backend_cdavinci.dto.category.CategoryResponseDTO;
import com.cdavinci.backend_cdavinci.service.CategoryService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Tag(name = "Categories", description = "End-Points Category Management.")
@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @Operation(
            summary     = "Getting all categories",
            description = "Total categories List"
    )
    @GetMapping("/all")
    public ResponseEntity<List<CategoryResponseDTO>> getAllCategories() {
        List<CategoryResponseDTO> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @Operation(
            summary     = "Getting categories main",
            description = "Main categories List"
    )
    @GetMapping("/mainlist")
    public ResponseEntity<List<CategoryResponseDTO>> getMainCategories() {
        List<CategoryResponseDTO> categories = categoryService.getMainCategories();
        return ResponseEntity.ok(categories);
    }

    @Operation(
            summary     = "Getting subcategories, categoryRootId required",
            description = "Sublist of a root category"
    )
    @GetMapping("/sublist/{categoryRootId}")
    public ResponseEntity<List<CategoryResponseDTO>> getSubCategories(@PathVariable Long categoriaRootId) {
        List<CategoryResponseDTO> subCategories = categoryService.getSubCategories(categoriaRootId);
        return ResponseEntity.ok(subCategories);
    }


    @Operation(
        summary     = "Create a new category, without root",
        description = "Create a new main category from name and description"
    )
    @PostMapping("create/main")
    public ResponseEntity<CategoryResponseDTO> createCategory(@RequestBody CategoryRequestDTO categoryRequestDTO) {
        CategoryResponseDTO categoryResponseDTO = categoryService.createCategory(categoryRequestDTO);
        return new ResponseEntity<>(categoryResponseDTO, HttpStatus.CREATED);
    }

    @Operation(
        summary     = "Create a new subcategory, idCategoryRoot is required",
        description = "Create a subcategory from a root category"
    )
    @PostMapping("createsub/{idCategoryRoot}")
    public ResponseEntity<CategoryResponseDTO> createSubcategory(@RequestBody CategoryRequestDTO categoryRequestDTO, 
                                                                 @PathVariable Long idCategoryRoot){
        CategoryResponseDTO categoryResponseDTO = categoryService.createSubcategory(categoryRequestDTO, idCategoryRoot);
        return new ResponseEntity<>(categoryResponseDTO, HttpStatus.CREATED);
    }

    @Operation(
            summary     = "Delete a category, idCategory is required",
            description = "Dropping a only one category"
    )
    @DeleteMapping("/delete/{idCategory}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long idCategory) {
        categoryService.deleteCategory(idCategory);
        return ResponseEntity.noContent().build();
    }
    
}
