package com.cdavinci.backend_cdavinci.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdavinci.backend_cdavinci.dto.buy.BuyProductRequestDTO;
import com.cdavinci.backend_cdavinci.dto.buy.BuyProductResponseDTO;
import com.cdavinci.backend_cdavinci.model.Buy;
import com.cdavinci.backend_cdavinci.model.BuyProduct;
import com.cdavinci.backend_cdavinci.model.Product;
import com.cdavinci.backend_cdavinci.respository.BuyProductRepository;
import com.cdavinci.backend_cdavinci.respository.ProductRepository;

@Service
public class BuyProductService {

    private final BuyProductRepository buyProductRepository;
    private final ProductRepository productRepository;
    private final ProductService productService;

    public BuyProductService(BuyProductRepository buyProductRepository,
                             ProductRepository productRepository,
                             ProductService productService){
        this.buyProductRepository = buyProductRepository;
        this.productRepository    = productRepository;
        this.productService       = productService;        
    }

    public BuyProductResponseDTO getBuyProductById(Long idBuyProduct){
        Optional<BuyProduct> optionalBuyProduct = buyProductRepository.findById(idBuyProduct);
        if(optionalBuyProduct.isPresent()){
            BuyProduct buyProduct = optionalBuyProduct.get();
            return buildBuyProductResponseDTO(buyProduct);
        }else{
            return null;
        }
    }
    @Transactional
    public List<BuyProduct> createBuyProducts(Buy buy, List<BuyProductRequestDTO> buyProductRequestDTOs) {
        List<BuyProduct> purchasedProducts = new ArrayList<>();
        for (BuyProductRequestDTO buyProductRequestDTO : buyProductRequestDTOs) {
            Long idProduct = buyProductRequestDTO.getIdProduct();
            if (!productRepository.existsById(idProduct)) {
                throw new RuntimeException("Product not found");
            }else{
                Product product = productRepository.findById(idProduct).get();
                int quantity = buyProductRequestDTO.getQuantity();
                BuyProduct buyProduct = new BuyProduct();
                buyProduct.setBuy(buy);
                buyProduct.setProduct(product);
                buyProduct.setQuantity(quantity);
                productService.updateProductStock(idProduct, quantity);
                buyProductRepository.save(buyProduct);
                purchasedProducts.add(buyProduct);
        }
        }
        return purchasedProducts;
    }

    private BuyProductResponseDTO buildBuyProductResponseDTO(BuyProduct buyProduct){
        BuyProductResponseDTO buyProductResponseDTO = new BuyProductResponseDTO();
        return buyProductResponseDTO;
    }
    
}
