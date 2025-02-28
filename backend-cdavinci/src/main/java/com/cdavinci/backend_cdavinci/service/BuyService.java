package com.cdavinci.backend_cdavinci.service;

import org.springframework.stereotype.Service;
import com.cdavinci.backend_cdavinci.model.Buy;
import com.cdavinci.backend_cdavinci.model.BuyProduct;
import com.cdavinci.backend_cdavinci.model.Customer;
import com.cdavinci.backend_cdavinci.respository.BuyProductRepository;
import com.cdavinci.backend_cdavinci.respository.BuyRepository;
import com.cdavinci.backend_cdavinci.respository.CustomerRepository;
import com.cdavinci.backend_cdavinci.service.BuyService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class BuyService {
    
    private final BuyRepository buyRepository;
    private final CustomerRepository customerRepository;
    private final BuyProductRepository buyProductRepository;

    public BuyService(BuyRepository buyRepository,
                      CustomerRepository customerRepository,
                      BuyProductRepository buyProductRepository) {
        this.buyRepository        = buyRepository;
        this.customerRepository   = customerRepository;
        this.buyProductRepository = buyProductRepository;
    }

    public List<Buy> getAllBuys() {
        return buyRepository.findAll();
    }
    
    public List<Buy> getBuysByIdCustomer(Long idCustomer){
        Optional<Customer> optionalCustomer = 
        customerRepository.findById(idCustomer);
        if(optionalCustomer.isPresent()) {
            Customer customer = optionalCustomer.get();
            return buyRepository.findByCustomer(customer);
        } else {
            return java.util.Collections.emptyList();
        }
    }

    public Buy getBuyById(Long idBuy) {
        Optional<Buy> optionalBuy = buyRepository.findById(idBuy);
        if(optionalBuy.isPresent()){
            return optionalBuy.get();
        } else {
            return null;
        }
    }
        
    public List<Buy> getBuysByProductId(Long idProduct) {
        List<BuyProduct> buyProducts = buyProductRepository
        .findByProduct_IdProduct(idProduct);
        return buyProducts.stream().map(BuyProduct::getBuy)
                .collect(Collectors.toList());
    }

    public List<BuyProduct> getPurchasedProducts(Long idBuy) {
        Buy buy  = getBuyById(idBuy);
        return buy.getPurchasedProducts();
    }

    public Buy saveBuy(Buy buy) {
        return buyRepository.save(buy);
    }

    public void deleteBuy(Long idBuy) {
        buyRepository.deleteById(idBuy);
    }
}
