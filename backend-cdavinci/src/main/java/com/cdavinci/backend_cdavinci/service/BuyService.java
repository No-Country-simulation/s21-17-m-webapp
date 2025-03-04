package com.cdavinci.backend_cdavinci.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.cdavinci.backend_cdavinci.model.Buy;
import com.cdavinci.backend_cdavinci.model.BuyProduct;
import com.cdavinci.backend_cdavinci.model.Customer;
import com.cdavinci.backend_cdavinci.dto.buy.BuyRequestDTO;
import com.cdavinci.backend_cdavinci.dto.buy.BuyResponseDTO;
import com.cdavinci.backend_cdavinci.dto.buy.BuyProductRequestDTO;
import com.cdavinci.backend_cdavinci.respository.BuyProductRepository;
import com.cdavinci.backend_cdavinci.respository.BuyRepository;
import com.cdavinci.backend_cdavinci.respository.CustomerRepository;
import com.cdavinci.backend_cdavinci.respository.ProductRepository;
import com.cdavinci.backend_cdavinci.service.BuyService;

import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BuyService {
    
    private final BuyRepository buyRepository;
    private final CustomerRepository customerRepository;
    private final BuyProductRepository buyProductRepository;
    private final ProductRepository productRepository;
    private final BuyProductService buyProductService;

    public BuyService(BuyRepository buyRepository,
                      CustomerRepository customerRepository,
                      BuyProductRepository buyProductRepository,
                      ProductRepository productRepository,
                      BuyProductService buyProductService) {
                    this.buyRepository        = buyRepository;
                    this.customerRepository   = customerRepository;
                    this.buyProductRepository = buyProductRepository;
                    this.productRepository    = productRepository;
                    this.buyProductService    = buyProductService;
    }

    public List<BuyResponseDTO> getAllBuys() {
        List<Buy> listBuy = buyRepository.findAll();
        return listBuy.stream().map(this::buildBuyResponseDTO)
                .collect(Collectors.toList());
    }
                
    public List<BuyResponseDTO> getBuysByIdCustomer(Long idCustomer) {
        Customer customer = getCustomerOrThrow(idCustomer);
        return buyRepository.findByCustomer(customer).stream()
                .distinct().map(this::buildBuyResponseDTO)
                .collect(Collectors.toList());
    }

    public BuyResponseDTO getBuyById(Long idBuy) {
        Buy buy = getBuyOrThrow(idBuy);
        return buildBuyResponseDTO(buy);
    }

    public List<BuyResponseDTO> getBuysByIdProduct(Long idProduct) {
        validateProductExists(idProduct);
        List<Buy> buys = getBuysByProductIdFromRepository(idProduct);
        return buys.stream().map(this::buildBuyResponseDTO)
                .collect(Collectors.toList());
    }     

    @Transactional
    public BuyResponseDTO createBuy(BuyRequestDTO buyRequestDTO) {
    long idCustomer = buyRequestDTO.getIdCustomer();
    if (!customerRepository.existsById(idCustomer)) {
            throw new RuntimeException("Customer not found");
        }else{       
            Buy newBuy = new Buy();
            Customer customer = customerRepository.findById(idCustomer).get();
            newBuy.setCustomer(customer);
            newBuy.setBuyDate(LocalDateTime.now());
            newBuy.setAmount(buyRequestDTO.getAmount());
            newBuy = buyRepository.save(newBuy);
            List<BuyProductRequestDTO> buyProductRequestDTO 
            = buyRequestDTO.getPurchasedProducts();
            List<BuyProduct> purchasedItems 
            = buyProductService.createBuyProducts(newBuy,buyProductRequestDTO);
            newBuy.setPurchasedProducts(purchasedItems);
            buyRepository.save(newBuy);
            return buildBuyResponseDTO(newBuy);    
        }
    }
    
    public void deleteBuy(Long idBuy) {
        if (!buyRepository.existsById(idBuy)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Buy not found");
        }
        buyRepository.deleteById(idBuy);
    }

    private void validateProductExists(Long idProduct) {
        if (!productRepository.existsById(idProduct)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto not found");
        }
    }

    private List<Buy> getBuysByProductIdFromRepository(Long idProduct) {
        return buyProductRepository.findByProduct_IdProduct(idProduct).stream()
                .map(BuyProduct::getBuy)
                .distinct()
                .collect(Collectors.toList());
    }

    private Customer getCustomerOrThrow(Long idCustomer) {
        return customerRepository.findById(idCustomer)
                .orElseThrow(() -> 
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer not found"));
    }

    private Buy getBuyOrThrow(Long idBuy) {
        return buyRepository.findById(idBuy)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Buy not found"));
    }

    private BuyResponseDTO buildBuyResponseDTO(Buy buy){
        BuyResponseDTO buyResponseDTO = new BuyResponseDTO();
        buyResponseDTO.setIdBuy(buy.getIdBuy());
        buyResponseDTO.setCustomerId(buy.getCustomer().getIdProduct());
        buyResponseDTO.setBuyDate(buy.getBuyDate());
        buyResponseDTO.setAmount(buy.getAmount());
        return buyResponseDTO;
    }
}
