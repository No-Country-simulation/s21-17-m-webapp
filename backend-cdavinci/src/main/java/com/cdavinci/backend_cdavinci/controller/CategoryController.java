package com.cdavinci.backend_cdavinci.controller;

import com.cdavinci.backend_cdavinci.model.Category;
import com.cdavinci.backend_cdavinci.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<Category>> getCategories() {
        List<Category> categories = categoryService.getCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/sublist/{categoryRootId}")
    public ResponseEntity<List<Category>> getSubCategories(@PathVariable Long categoriaRootId) {
        List<Category> subCategories = categoryService.getSubCategories(categoriaRootId);
        return ResponseEntity.ok(subCategories);
    }
}
