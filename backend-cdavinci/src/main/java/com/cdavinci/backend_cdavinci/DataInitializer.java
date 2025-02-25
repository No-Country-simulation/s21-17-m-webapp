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

    private final CategoryRepository categoriaRepository;

    public DataInitializer(CategoryRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    @PostConstruct // Se ejecuta al inicio de la aplicación
    public void cargarCategorias() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper(); // Para JSON
        // CSVParser parser = new CSVParser(...); // Para CSV

        InputStream inputStream = getClass().getResourceAsStream("/data/categorias.json"); // Ruta al archivo
        List<Category> categories = objectMapper.readValue(inputStream, new TypeReference<List<Category>>() {});

        // Guarda la categoría y sus subcategorías (cascadeType)
        categoriaRepository.saveAll(categories);
    }
}
