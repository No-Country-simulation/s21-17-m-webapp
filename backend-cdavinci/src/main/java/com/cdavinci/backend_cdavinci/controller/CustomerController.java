package com.cdavinci.backend_cdavinci.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdavinci.backend_cdavinci.model.Customer;
import com.cdavinci.backend_cdavinci.service.CustomerService;

import java.util.List;

@Tag(name = "Customers", description = "End-Points Customer Management.")
@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @Operation(
            summary     = "Getting all customers",
            description = "List of registred customers"
    )
    @GetMapping("/getAll")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    @Operation(
            summary     = "Getting all customers of a user",
            description = "List of customers created by a user"
    )
    @GetMapping("/userlist/{idUser}")
    public ResponseEntity<List<Customer>> getCustomersByIdUser(@PathVariable Long idUser){
        return ResponseEntity.ok(customerService.getCustomersByIdUser(idUser));
    }

    @Operation(
            summary     = "Getting a only one customers",
            description = "A customer by id"
    )
    @GetMapping("getOne/{idCustomer}")
    public ResponseEntity<Customer> getCustomById(@PathVariable Long idCustomer) {
        return ResponseEntity.ok(customerService.getCustomerById(idCustomer));
    }

    @Operation(
            summary     = "Save a new customer",
            description = "Body of a new customer is required"
    )
    @PostMapping("/save")
    public ResponseEntity<Customer> saveProduct(@RequestBody Customer customer) {
        return ResponseEntity.status(HttpStatus.CREATED).
        body(customerService.saveCustomer(customer));
    }

    @Operation(
            summary     = "Delete a customer",
            description = "Dropping, idCustomer is required"
    )
    @DeleteMapping("/delete/{idCustomer}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long idCustomer) {
        customerService.deleteCustomer(idCustomer);
        return ResponseEntity.noContent().build();
    }

}
