package com.cdavinci.backend_cdavinci;

import com.cdavinci.backend_cdavinci.dto.category.CategoryListRequestDTO;
import com.cdavinci.backend_cdavinci.dto.category.CategoryRequestDTO;
import com.cdavinci.backend_cdavinci.dto.category.CategoryResponseDTO;
import com.cdavinci.backend_cdavinci.service.CategoryService;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Configuration
@Profile("init")
public class DataInitializer {

    private final CategoryService categoryService;


    public DataInitializer(CategoryService categoryService) {
        this.categoryService    = categoryService;
    }

    @Bean
    public CommandLineRunner initializeData() {
        return args -> {
            try {
                 ClassPathResource resource = new ClassPathResource("/data/categories.json");
                 InputStream inputStream = resource.getInputStream();
                 ObjectMapper objectMapper = new ObjectMapper();
                 List<CategoryListRequestDTO> categories = objectMapper.readValue(inputStream, new TypeReference<List<CategoryListRequestDTO>>() {});

                for (CategoryListRequestDTO itemRequestDTO : categories) {
                    CategoryRequestDTO categoryRequestDTO = buildCategoryResponseDTO(itemRequestDTO);
                    CategoryResponseDTO categoryCreatedResponseDTO = categoryService.createCategory(categoryRequestDTO);
                    Long idCategoryRoot = categoryCreatedResponseDTO.getIdCategory();
                    if (itemRequestDTO.getSubcategories() != null) {
                        for (CategoryListRequestDTO subcategoryListRequestDTO : itemRequestDTO.getSubcategories()) {
                            CategoryRequestDTO subCategoryDTO = buildCategoryResponseDTO(subcategoryListRequestDTO); 
                            categoryService.createSubcategory(subCategoryDTO, idCategoryRoot);
                        }
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        };
    }
private CategoryRequestDTO buildCategoryResponseDTO(CategoryListRequestDTO categoryListRequestDTO){
    CategoryRequestDTO categoryRequestDTO = new CategoryRequestDTO();
    categoryRequestDTO.setName(categoryListRequestDTO.getName());
    categoryRequestDTO.setDescription(categoryListRequestDTO.getDescription());
    return categoryRequestDTO;    
}
}
