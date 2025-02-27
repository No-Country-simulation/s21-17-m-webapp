package com.cdavinci.backend_cdavinci.service;

import org.springframework.stereotype.Service;
import com.cdavinci.backend_cdavinci.model.User;
import com.cdavinci.backend_cdavinci.model.Buy;
import com.cdavinci.backend_cdavinci.model.Customer;
import com.cdavinci.backend_cdavinci.respository.BuyRepository;
import com.cdavinci.backend_cdavinci.respository.CustomerRepository;
import com.cdavinci.backend_cdavinci.respository.UserRepository;
import com.cdavinci.backend_cdavinci.service.BuyService;

import java.util.List;
import java.util.Optional;


@Service
public class BuyService {
    
    private final BuyRepository buyRepository;
    private final CustomerRepository customerRepository;
    
    public BuyService(BuyRepository buyRepository,
                      CustomerRepository customerRepository) {
        this.buyRepository      = buyRepository;
        this.customerRepository = customerRepository;
    }

    public List<Buy> getAllBuys() {
        return buyRepository.findAll();
    }
    
    public List<Buy> getBuysByIdCustomer(Long idCustomer){
        Optional<Customer> optionalCustomer = customerRepository.findById(idCustomer);
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

    public Customer saveCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public void deleteCustomer(Long idCustomer) {
        customerRepository.deleteById(idCustomer);
    }
}
