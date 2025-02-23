package com.cdavinci.backend_cdavinci;

import com.cdavinci.backend_cdavinci.model.Categoria;
import com.cdavinci.backend_cdavinci.respository.CategoriaRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Component
public class DataInitializer {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @PostConstruct // Se ejecuta al inicio de la aplicación
    public void cargarCategorias() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper(); // Para JSON
        // CSVParser parser = new CSVParser(...); // Para CSV

        InputStream inputStream = getClass().getResourceAsStream("/data/categorias.json"); // Ruta al archivo
        List<Categoria> categorias = objectMapper.readValue(inputStream, new TypeReference<List<Categoria>>() {});

        // Guarda la categoría y sus subcategorías (cascadeType)
        categoriaRepository.saveAll(categorias);
    }
}
