package com.cdavinci.backend_cdavinci.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cdavinci.backend_cdavinci.model.Producto;
import com.cdavinci.backend_cdavinci.model.Categoria;
import com.cdavinci.backend_cdavinci.service.ProductoService;
import com.cdavinci.backend_cdavinci.repository.CategoriaRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/productos")
public class ProductoController {

    private final ProductoService productoService;
    public ProductoController(ProductoService productoService, 
    CategoriaRepository categoriaRepository) {
        this.productoService = productoService;
        this.categoriaRepository = categoriaRepository;
    }

    @GetMapping("/lista")
    public ResponseEntity<List<Producto>> obtenerTodosLosProductos() {
        return ResponseEntity.ok(productoService.obtenerTodosLosProductos());
    }

    /*@GetMapping("/lista/{idUsuario}")
    public ResponseEntity<List<Producto>> obtenerProductosDeVendedor(@PathVariable Long idUsuario){
        User usuarioVendedor = userRepository.findById(idUsuario);
        productoService.obteneProductosDeVendedor(usuarioVendedor);
    }*/

    @GetMapping("obtener/{idProducto}")
    public ResponseEntity<Producto> obtenerProductoPorId(@PathVariable Long idProducto) {
        Optional<Producto> producto = productoService.obtenerProductoPorId(idProducto);
        return producto.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("obtener/{idCategoria}")
    public ResponseEntity<Producto> obtenerProductoPorIdCategoria(@PathVariable Long idCategoria) {
        Categoria categoria = categoriaRepository.findById(idCategoria);
        Optional<Producto> producto = productoService.obteneProductosDeCategoria(categoria);
        return producto.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/guardar")
    public ResponseEntity<Producto> guardarProducto(@RequestBody Producto producto) {
        return ResponseEntity.status(HttpStatus.CREATED).
        body(productoService.guardarProducto(producto));
    }


    @DeleteMapping("/eliminar/{idProducto}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long idProducto) {
        productoService.eliminarProducto(idProducto);
        return ResponseEntity.noContent().build();
    }

}
