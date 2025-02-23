package com.cdavinci.backend_cdavinci.service;

import com.cdavinci.backend_cdavinci.model.Categoria;
import org.springframework.stereotype.Service;
import com.cdavinci.backend_cdavinci.respository.CategoriaRepository;

import java.util.List;

@Service
public class CategoriaService {

private final CategoriaRepository categoriaRepository;
public CategoriaService(CategoriaRepository categoriaRepository) {
    this.categoriaRepository = categoriaRepository;
}
public List<Categoria> listarCategorias(){
    return categoriaRepository.findAll();
}
public List<Categoria> listarSubCategorias(Long idCategoria){
    return categoriaRepository.
            findCategoriasByCategoriaRaiz_IdCategoria(idCategoria);
}
}