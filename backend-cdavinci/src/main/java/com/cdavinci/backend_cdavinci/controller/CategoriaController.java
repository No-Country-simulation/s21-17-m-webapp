package com.cdavinci.backend_cdavinci.controller;

import com.cdavinci.backend_cdavinci.model.Categoria;
import com.cdavinci.backend_cdavinci.service.CategoriaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    private final CategoriaService categoriaService;
    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @GetMapping("/lista")
    public ResponseEntity<List<Categoria>> getCategorias() {
        List<Categoria> categorias = categoriaService.listarCategorias();
        return ResponseEntity.ok(categorias);
    }

    @GetMapping("/sub-lista/{categoriaRaizId}")
    public ResponseEntity<List<Categoria>> getSubCategorias(@PathVariable Long categoriaRaizId) {
        List<Categoria> subCategorias = categoriaService.listarSubCategorias(categoriaRaizId);
        return ResponseEntity.ok(subCategorias);
    }
}
