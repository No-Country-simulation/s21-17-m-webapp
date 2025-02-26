package com.cdavinci.backend_cdavinci.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cdavinci.backend_cdavinci.model.Product;
import com.cdavinci.backend_cdavinci.service.ProductService;
import com.cdavinci.backend_cdavinci.respository.CategoryRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductoController {

    private final ProductService productService;

    public ProductoController(ProductService productService, 
    CategoryRepository categoryRepository) {
        this.productService = productService;
    }

    @GetMapping("/getList")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    /*@GetMapping("/lista/{idUsuario}")
    public ResponseEntity<List<Producto>> obtenerProductosDeVendedor(@PathVariable Long idUsuario){
        User usuarioVendedor = userRepository.findById(idUsuario);
        productoService.obteneProductosDeVendedor(usuarioVendedor);
    }*/

    @GetMapping("getItem/{idProduct}")
    public ResponseEntity<Product> getProductById(@PathVariable Long idProduct) {
    
    Optional<Product> productOptional = productService.getProductById(idProduct);
    if (productOptional.isPresent()) {
        return ResponseEntity.ok(productOptional.get());
    } else {
        return ResponseEntity.notFound().build();
    }
    }

    @GetMapping("getList/{idCategory}")
    public ResponseEntity<List<Product>> getProductsByIdCategory(@PathVariable Long idCategory) {
        List<Product> products = productService.getProductsByIdCategory(idCategory);
        return ResponseEntity.ok(products);
    }

    @PostMapping("/save")
    public ResponseEntity<Product> saveProduct(@RequestBody Product product) {
        return ResponseEntity.status(HttpStatus.CREATED).
        body(productService.saveProduct(product));
    }


    @DeleteMapping("/delete/{idProducto}")
    public ResponseEntity<Void> deleteProducto(@PathVariable Long idProduct) {
        productService.deleteProduct(idProduct);
        return ResponseEntity.noContent().build();
    }

}
