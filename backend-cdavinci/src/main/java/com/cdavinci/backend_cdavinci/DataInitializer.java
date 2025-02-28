package com.cdavinci.backend_cdavinci;

import com.cdavinci.backend_cdavinci.model.Category;
import com.cdavinci.backend_cdavinci.respository.CategoryRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Component
public class DataInitializer {

    private final CategoryRepository categoryRepository;

    public DataInitializer(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @PostConstruct // Se ejecuta al inicio de la aplicación
    public void cargarCategorias() throws IOException {

        if (categoryRepository.count() == 0) {
            ObjectMapper objectMapper = new ObjectMapper(); // Para JSON
            // CSVParser parser = new CSVParser(...); // Para CSV

            InputStream inputStream = getClass().getResourceAsStream("/data/categories.json"); // Ruta al archivo
            List<Category> categories = objectMapper.readValue(inputStream, new TypeReference<List<Category>>() {
            });
            System.out.println(categories);
            // Guarda la categoría y sus subcategorías (cascadeType)
            categoryRepository.saveAll(categories);
        }
    }
}
