package com.cdavinci.backend_cdavinci.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cdavinci.backend_cdavinci.model.Category;
import com.cdavinci.backend_cdavinci.respository.CategoryRepository;

@Service
public class CategoryService {
    
    private final CategoryRepository categoryRepository;
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
}

public Optional<Category> getCategoryById(Long idCategory) {
    return categoryRepository.findById(idCategory);
}

public List<Category> getCategories(){
    return categoryRepository.findAll();
}

public List<Category> getSubCategories(Long idCategoryRoot){
    return categoryRepository.
            findCategoriesByCategoryRoot_IdCategory(idCategoryRoot);
}

}