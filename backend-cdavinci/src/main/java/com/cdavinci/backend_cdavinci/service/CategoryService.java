package com.cdavinci.backend_cdavinci.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.cdavinci.backend_cdavinci.model.Category;
import com.cdavinci.backend_cdavinci.dto.category.CategoryRequestDTO;
import com.cdavinci.backend_cdavinci.dto.category.CategoryResponseDTO;
import com.cdavinci.backend_cdavinci.respository.CategoryRepository;

@Service
public class CategoryService {
    
private final CategoryRepository categoryRepository;

public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
}

public CategoryResponseDTO getCategoryById(Long idCategory) {
    Category category = getCategoryOrThrow(idCategory);
    return buildCategoryResponseDTO(category);
}

public List<CategoryResponseDTO> getAllCategories() {
    return categoryRepository.findAll().stream()
           .map(this::buildCategoryResponseDTO)
           .collect(Collectors.toList());
}

public List<CategoryResponseDTO> getMainCategories() {
    return categoryRepository.findRootCategories().stream()
            .map(this::buildCategoryResponseDTO)
            .collect(Collectors.toList());
}

public List<CategoryResponseDTO> getSubCategories(Long idCategoryRoot) {
    return categoryRepository.
            findCategoriesByRootId(idCategoryRoot)
            .stream().map(this::buildCategoryResponseDTO)
            .collect(Collectors.toList());
}

public CategoryResponseDTO createCategory(CategoryRequestDTO categoryRequestDTO) {
        Category category = new Category();
        category.setName(categoryRequestDTO.getName());
        category.setDescription(categoryRequestDTO.getDescription());
        Category savedCategory = categoryRepository.save(category);
        return buildCategoryResponseDTO(savedCategory);
    }

public CategoryResponseDTO createSubcategory(CategoryRequestDTO categoryRequestDTO,
                                             Long idCategoryRoot) {
    Category categoryRoot = getCategoryOrThrow(idCategoryRoot);
    Category category = new Category();
    category.setName(categoryRequestDTO.getName());
    category.setDescription(categoryRequestDTO.getDescription());
    category.setCategoryRoot(categoryRoot);
    Category savedCategory = categoryRepository.save(category);
    return buildCategoryResponseDTO(savedCategory);
}

private CategoryResponseDTO buildCategoryResponseDTO(Category category) {
    Long idCategory = category.getIdCategory();
    CategoryResponseDTO categoryResponseDTO = new CategoryResponseDTO();
    categoryResponseDTO.setIdCategory(idCategory);
    categoryResponseDTO.setName(category.getName());
    categoryResponseDTO.setDescription(category.getDescription());
    return categoryResponseDTO;
    }
    
public void deleteCategory(Long idCategory) {
    if (!categoryRepository.existsById(idCategory)) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found");
        }
        categoryRepository.deleteById(idCategory);
    }    

private Category getCategoryOrThrow(Long categoryId) {
    return categoryRepository.findById(categoryId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
}
    
}
