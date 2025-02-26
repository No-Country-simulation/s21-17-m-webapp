package com.cdavinci.backend_cdavinci.service;

import org.springframework.stereotype.Service;
import com.cdavinci.backend_cdavinci.model.Product;
import com.cdavinci.backend_cdavinci.model.Artisan;
import com.cdavinci.backend_cdavinci.model.Category;
import com.cdavinci.backend_cdavinci.respository.ArtisanRepository;
import com.cdavinci.backend_cdavinci.respository.ProductRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
public class ProductService {
    
    private final ProductRepository productRepository;
    private final CategoryService categoryService;
    private final ArtisanRepository artisanRepository;
    
    public ProductService(ProductRepository productRepository,
                          CategoryService   categoryService,
                          ArtisanRepository artisanRepository) {
                            this.productRepository = productRepository;
                            this.categoryService = categoryService;
                            this.artisanRepository = artisanRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    public List<Product> getProductsByIdArtisan(Long idArtisan){
        Optional<Artisan> optionalArtisan = artisanRepository.findById(idArtisan);
        if(optionalArtisan.isPresent()) {
            Artisan artisan = optionalArtisan.get();
            return productRepository.findByArtisan(artisan);
        } else {
            return java.util.Collections.emptyList();
        }
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

    public Product getProductById(Long idProduct) {
        Optional<Product> optionalProduct = productRepository.findById(idProduct);
        if(optionalProduct.isPresent()){
            return optionalProduct.get();
        } else {
            return null;
        }
    }

    public Product saveProduct(Product product) {
        product.setStockUpdate(LocalDateTime.now());
        return productRepository.save(product);
    }

    public void deleteProduct(Long idProduct) {
        productRepository.deleteById(idProduct);
    }
}
