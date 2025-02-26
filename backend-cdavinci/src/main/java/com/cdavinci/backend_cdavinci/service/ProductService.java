package com.cdavinci.backend_cdavinci.service;

import org.springframework.stereotype.Service;
import com.cdavinci.backend_cdavinci.model.Product;
import com.cdavinci.backend_cdavinci.model.User;
import com.cdavinci.backend_cdavinci.model.Category;
import com.cdavinci.backend_cdavinci.respository.ProductRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
public class ProductService {
    
    private final ProductRepository productRepository;
    private final CategoryService categoryService;
    
    public ProductService(ProductRepository productRepository,
                          CategoryService categoryService) {
                            this.productRepository = productRepository;
                            this.categoryService = categoryService;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    public List<Product> getProductsByArtisan(User user){
        return productRepository.findByUser(user);
    }

    public List<Product> getProductsByIdCategory(Long idCategory){
        Optional<Category> optionalCategory = categoryService.getCategoryById(idCategory);
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            return productRepository.findByCategory(category);
        } else {
            return java.util.Collections.emptyList();
        }
    }

    public Optional<Product> getProductById(Long idProduct) {
        return productRepository.findById(idProduct);
    }

    public Product saveProduct(Product product) {
        product.setStockUpdate(LocalDateTime.now());
        return productRepository.save(product);
    }

    public void deleteProduct(Long idProduct) {
        productRepository.deleteById(idProduct);
    }
}
