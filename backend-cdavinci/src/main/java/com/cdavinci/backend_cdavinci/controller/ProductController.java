package com.cdavinci.backend_cdavinci.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cdavinci.backend_cdavinci.model.Product;
import com.cdavinci.backend_cdavinci.service.ProductService;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService    productService) {
        this.productService = productService;
    }

    @GetMapping("/getList")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/list/{idArtisan}")
    public ResponseEntity<List<Product>> getProductsByArtisan(@PathVariable Long idArtisan){
        return ResponseEntity.ok(productService.getProductsByIdArtisan(idArtisan));
    }

    @GetMapping("getItem/{idProduct}")
    public ResponseEntity<Product> getProductById(@PathVariable Long idProduct) {
        return ResponseEntity.ok(productService.getProductById(idProduct));
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
