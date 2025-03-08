package com.cdavinci.backend_cdavinci.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.cdavinci.backend_cdavinci.model.User;
import com.cdavinci.backend_cdavinci.model.Customer;
import com.cdavinci.backend_cdavinci.dto.customer.CustomerResponseDTO;
import com.cdavinci.backend_cdavinci.dto.customer.CustomerUpdateDTO;
import com.cdavinci.backend_cdavinci.dto.customer.CustomerRequestDTO;
import com.cdavinci.backend_cdavinci.respository.CustomerRepository;
import com.cdavinci.backend_cdavinci.respository.UserRepository;
import com.cdavinci.backend_cdavinci.service.CustomerService;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class CustomerService {
    
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    
    public CustomerService(CustomerRepository customerRepository,
                           UserRepository userRepository) {
        this.customerRepository = customerRepository;
        this.userRepository = userRepository;
    }

    public List<CustomerResponseDTO> getAllCustomers() {
        List<Customer> customers = customerRepository.findAll();
        return customers.stream().map(this::buildCustomerResponseDTO)
                .collect(Collectors.toList());
    }
    
    public List<CustomerResponseDTO> getCustomersByIdUser(Long idUser) {
        User user = getUserOrThrow(idUser);
        return customerRepository.findByUser(user).stream()
                .map(this::buildCustomerResponseDTO)
                .collect(Collectors.toList());
    }

    public CustomerResponseDTO getCustomerById(Long idCustomer) {
        Customer customer = getCustomerOrThrow(idCustomer);
        return buildCustomerResponseDTO(customer);
    }
    
    @Transactional
    public CustomerResponseDTO createCustomer(CustomerRequestDTO customerRequestDTO) {
        Long idUser  = customerRequestDTO.getUserId();
        User user = getUserOrThrow(idUser);

        Customer customer = new Customer();
        customer.setName(customerRequestDTO.getName());
        customer.setLastname(customerRequestDTO.getLastname());
        customer.setAddress(customerRequestDTO.getAddress());
        customer.setUser(user);
        Customer savedCustomer = customerRepository.save(customer);
        return buildCustomerResponseDTO(savedCustomer);
    }

    @Transactional
    public CustomerResponseDTO updateCustomer(CustomerUpdateDTO customerUpdateDTO){
        Long idCustomer = customerUpdateDTO.getIdCustomer();
        
        Customer oldCustomer = getCustomerOrThrow(idCustomer);
        oldCustomer.setName(customerUpdateDTO.getName());
        oldCustomer.setLastname(customerUpdateDTO.getLastname());
        oldCustomer.setAddress(customerUpdateDTO.getAddress());
        Customer updatedCustomer = customerRepository.save(oldCustomer);
        return buildCustomerResponseDTO(updatedCustomer);
    }
    
    public void deleteCustomer(Long idCustomer) {
        if (!customerRepository.existsById(idCustomer)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer not found");
        }
        customerRepository.deleteById(idCustomer);
    }

    private User getUserOrThrow(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Artisan not found"));
    }

    private Customer getCustomerOrThrow(Long idCustomer) {
        return customerRepository.findById(idCustomer)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
    }

    private CustomerResponseDTO buildCustomerResponseDTO(Customer customer){
        CustomerResponseDTO customerResponseDTO = new CustomerResponseDTO();
        customerResponseDTO.setIdCustomer(customer.getIdCustomer());
        customerResponseDTO.setName(customer.getName());
        customerResponseDTO.setLastname(customer.getLastname());
        customerResponseDTO.setAddress(customer.getAddress());
        customerResponseDTO.setUserId(customer.getUser().getId());
        return customerResponseDTO;
    }
}
