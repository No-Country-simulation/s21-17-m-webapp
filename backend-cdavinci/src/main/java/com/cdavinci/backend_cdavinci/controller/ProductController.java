package com.cdavinci.backend_cdavinci.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdavinci.backend_cdavinci.dto.product.ProductRequestDTO;
import com.cdavinci.backend_cdavinci.dto.product.ProductResponseDTO;
import com.cdavinci.backend_cdavinci.service.ProductService;

import java.util.List;

@Tag(name = "Products", description = "End-Points Product Management.")
@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    private final ProductService productService;

    public ProductController(ProductService    productService) {
        this.productService = productService;
    }

    @Operation(
            summary     = "Getting all products",
            description = "List of products of all artisans"
    )
    @GetMapping("/getAll")
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @Operation(
            summary     = "Getting products of a only one artisan",
            description = "List of buys, idArtisan required"
    )
    @GetMapping("/artisanlist/{idArtisan}")
    public ResponseEntity<List<ProductResponseDTO>> getProductsByArtisan(@PathVariable Long idArtisan){
        return ResponseEntity.ok(productService.getProductsByIdArtisan(idArtisan));
    }

    @Operation(
            summary     = "Getting a product, idProduct required",
            description = "A only one product"
    )
    @GetMapping("getOne/{idProduct}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable Long idProduct) {
        return ResponseEntity.ok(productService.getProductById(idProduct));
    }
    
    @Operation(
            summary     = "Getting products, idCategory is required",
            description = "List of products of a only one category"
    )
    @GetMapping("categorylist/{idCategory}")
    public ResponseEntity<List<ProductResponseDTO>> getProductsByIdCategory(@PathVariable Long idCategory) {
        List<ProductResponseDTO> products = productService.getProductsByIdCategory(idCategory);
        return ResponseEntity.ok(products);
    }

    @Operation(
            summary     = "Getting list of purchased products, idBuy required",
            description = "List of purchased products of a only one buy"
    )

    @GetMapping("/purchasedsByBuyId/{idBuy}")
    public ResponseEntity<List<ProductResponseDTO>> getPurchasedProductsByBuyId(@PathVariable Long idBuy) {
        List<ProductResponseDTO> products = productService.getPurchasedProductsByBuyId(idBuy);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @Operation(
            summary     = "Create a new Product",
            description = "Body of a new ProductRequestDTO is required"
    )
    @PostMapping("/create")
    public ResponseEntity<ProductResponseDTO> createProduct(@RequestBody ProductRequestDTO productRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).
        body(productService.createProduct(productRequestDTO));
    }

    @Operation(
        summary = "Update product stock",
        description = "Updates the stock of a product by subtracting the specified quantity."
    )
    @PutMapping("/{idProduct}/stock")
    public ResponseEntity<Void> updateProductStock(@PathVariable Long idProduct, 
                                                   @RequestParam int quantity) {
        productService.updateProductStock(idProduct, quantity);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(
            summary     = "Delete a Product",
            description = "Dropping, idProduct is required"
    )
    @DeleteMapping("/delete/{idProducto}")
    public ResponseEntity<Void> deleteProducto(@PathVariable Long idProduct) {
        productService.deleteProduct(idProduct);
        return ResponseEntity.noContent().build();
    }

}
