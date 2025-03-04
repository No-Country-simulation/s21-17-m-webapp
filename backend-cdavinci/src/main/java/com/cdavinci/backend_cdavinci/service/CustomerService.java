package com.cdavinci.backend_cdavinci.service;

import org.springframework.stereotype.Service;
import com.cdavinci.backend_cdavinci.model.User;
import com.cdavinci.backend_cdavinci.model.Customer;
import com.cdavinci.backend_cdavinci.respository.CustomerRepository;
import com.cdavinci.backend_cdavinci.respository.UserRepository;
import com.cdavinci.backend_cdavinci.service.CustomerService;

import java.util.List;
import java.util.Optional;


@Service
public class CustomerService {
    
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    
    public CustomerService(CustomerRepository customerRepository,
                           UserRepository userRepository) {
        this.customerRepository = customerRepository;
        this.userRepository = userRepository;
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }
    
    public List<Customer> getCustomersByIdUser(Long idUser){
        Optional<User> optionalUser = userRepository.findById(idUser);
        if(optionalUser.isPresent()) {
            User user = optionalUser.get();
            return customerRepository.findByUser(user);
        } else {
            return java.util.Collections.emptyList();
        }
    }

    public Customer getCustomerById(Long idCustomer) {
        Optional<Customer> optionalCustomer = customerRepository.findById(idCustomer);
        if(optionalCustomer.isPresent()){
            return optionalCustomer.get();
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
