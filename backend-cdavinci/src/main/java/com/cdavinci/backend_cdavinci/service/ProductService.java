package com.cdavinci.backend_cdavinci.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.cdavinci.backend_cdavinci.model.Product;
import com.cdavinci.backend_cdavinci.model.Artisan;
import com.cdavinci.backend_cdavinci.model.Buy;
import com.cdavinci.backend_cdavinci.model.BuyProduct;
import com.cdavinci.backend_cdavinci.model.Category;
import com.cdavinci.backend_cdavinci.dto.product.ProductRequestDTO;
import com.cdavinci.backend_cdavinci.dto.product.ProductResponseDTO;
import com.cdavinci.backend_cdavinci.dto.product.ProductUpdateDTO;
import com.cdavinci.backend_cdavinci.respository.ArtisanRepository;
import com.cdavinci.backend_cdavinci.respository.BuyRepository;
import com.cdavinci.backend_cdavinci.respository.CategoryRepository;
import com.cdavinci.backend_cdavinci.respository.ProductRepository;

import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class ProductService {
    
    private final ProductRepository productRepository;
    private final ArtisanRepository artisanRepository;
    private final BuyRepository buyRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository  productRepository,
                          CategoryRepository categoryRepository,
                          ArtisanRepository  artisanRepository,
                          BuyRepository      buyRepository) {
                        this.productRepository  = productRepository;
                        this.categoryRepository = categoryRepository;
                        this.artisanRepository  = artisanRepository;
                        this.buyRepository      = buyRepository;
    }

    public List<ProductResponseDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(this::buildProductResponseDTO)
                .collect(Collectors.toList());
    }
    
    public List<ProductResponseDTO> getProductsByIdArtisan(Long idArtisan) {
        Artisan artisan = getArtisanOrThrow(idArtisan);
        return productRepository.findByArtisan(artisan).stream()
                .map(this::buildProductResponseDTO)
                .collect(Collectors.toList());
    }

    public List<ProductResponseDTO> getProductsByIdCategory(Long idCategory) {
        Category category = getCategoryOrThrow(idCategory);
        return productRepository.findByCategory(category).stream()
                .map(this::buildProductResponseDTO)
                .collect(Collectors.toList());
    }
    
    public ProductResponseDTO getProductById(Long idProduct) {
        Product product = getProductOrThrow(idProduct);
        return buildProductResponseDTO(product);
    }

    public List<ProductResponseDTO> getPurchasedProductsByBuyId(Long buyId) {
        Buy buy = getBuyOrThrow(buyId);
        return buy.getPurchasedProducts().stream().map(BuyProduct::getProduct)
                .map(this::buildProductResponseDTO).collect(Collectors.toList());
    }
    
    @Transactional
    public void updateProductStock(Long idProduct, int quantity) {
        Product product = getProductOrThrow(idProduct);
        int currentStock = product.getStock();
        if (currentStock < quantity) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Insufficient stock for the product with ID" + idProduct);
        }
        product.setStock(currentStock - quantity);
        product.setStockUpdated(LocalDateTime.now());
        productRepository.save(product);
    }
    
    @Transactional
    public ProductResponseDTO updateProduct(ProductUpdateDTO productUpdateDTO){
        Long idProduct = productUpdateDTO.getIdProduct();
        Category category = getCategoryOrThrow(productUpdateDTO.getIdCategory());
        Product oldProduct = getProductOrThrow(idProduct);
        oldProduct.setName(productUpdateDTO.getName());
        oldProduct.setDescription(productUpdateDTO.getDescription());
        oldProduct.setPrice(productUpdateDTO.getPrice());
        oldProduct.setStock(productUpdateDTO.getStock());
        oldProduct.setUrlImage(productUpdateDTO.getUrlImage());
        oldProduct.setCategory(category);
        oldProduct.setStockUpdated(LocalDateTime.now());
        oldProduct.setActive(productUpdateDTO.isActive());
        Product updatedProduct = productRepository.save(oldProduct);
        return buildProductResponseDTO(updatedProduct);
    }

    @Transactional
    public ProductResponseDTO createProduct(ProductRequestDTO productRequestDTO) {
        Long idCategory = productRequestDTO.getIdCategory();
        Long idArtisan  = productRequestDTO.getIdArtisan();
        Category category = getCategoryOrThrow(idCategory);
        Artisan artisan   = getArtisanOrThrow(idArtisan);

        Product product = new Product();
        product.setName(productRequestDTO.getName());
        product.setDescription(productRequestDTO.getDescription());
        product.setPrice(productRequestDTO.getPrice());
        product.setStock(productRequestDTO.getStock());
        product.setUrlImage(productRequestDTO.getUrlImage());
        product.setCategory(category);
        product.setArtisan(artisan);
        product.setStockUpdated(LocalDateTime.now());
        product.setActive(true);
        Product savedProduct = productRepository.save(product);
        return buildProductResponseDTO(savedProduct);
    }
    
    public void deleteProduct(Long idProduct) {
        if (!productRepository.existsById(idProduct)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
        }
        productRepository.deleteById(idProduct);
    }

    private Category getCategoryOrThrow(Long categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
    }

    private Artisan getArtisanOrThrow(Long artisanId) {
        return artisanRepository.findById(artisanId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Artisan not found"));
    }

    private Product getProductOrThrow(Long idProduct) {
        return productRepository.findById(idProduct)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
    }

    private Buy getBuyOrThrow(Long idBuy) {
        return buyRepository.findById(idBuy)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Buy not found"));
    }

    private ProductResponseDTO buildProductResponseDTO(Product product){
        ProductResponseDTO productResponseDTO = new ProductResponseDTO();
        productResponseDTO.setIdProduct(product.getIdProduct());
        productResponseDTO.setName(product.getName());
        productResponseDTO.setDescription(product.getDescription());
        productResponseDTO.setPrice(product.getPrice());
        productResponseDTO.setStock(product.getStock());
        productResponseDTO.setUrlImage(product.getUrlImage());
        productResponseDTO.setIdCategory(product.getCategory().getIdCategory());
        productResponseDTO.setIdArtisan(product.getArtisan().getId());
        productResponseDTO.setStockUpdated(product.getStockUpdated());
        productResponseDTO.setActive(product.isActive());
        return productResponseDTO;
    }
}
