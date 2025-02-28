package com.cdavinci.backend_cdavinci.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdavinci.backend_cdavinci.model.Customer;
import com.cdavinci.backend_cdavinci.service.CustomerService;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    @GetMapping("/userlist/{idUser}")
    public ResponseEntity<List<Customer>> getCustomersByIdUser(@PathVariable Long idUser){
        return ResponseEntity.ok(customerService.getCustomersByIdUser(idUser));
    }

    @GetMapping("getOne/{idCustomer}")
    public ResponseEntity<Customer> getCustomById(@PathVariable Long idCustomer) {
        return ResponseEntity.ok(customerService.getCustomerById(idCustomer));
    }

    @PostMapping("/save")
    public ResponseEntity<Customer> saveProduct(@RequestBody Customer customer) {
        return ResponseEntity.status(HttpStatus.CREATED).
        body(customerService.saveCustomer(customer));
    }

    @DeleteMapping("/delete/{idBuy}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long idCustomer) {
        customerService.deleteCustomer(idCustomer);
        return ResponseEntity.noContent().build();
    }

}
