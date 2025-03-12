package com.cdavinci.backend_cdavinci.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cdavinci.backend_cdavinci.dto.customer.CustomerRequestDTO;
import com.cdavinci.backend_cdavinci.dto.customer.CustomerResponseDTO;
import com.cdavinci.backend_cdavinci.dto.customer.CustomerUpdateDTO;
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
    public ResponseEntity<List<CustomerResponseDTO>> getAllCustomers() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    @Operation(
            summary     = "Getting all customers of a user",
            description = "List of customers created by a user"
    )
    @GetMapping("/userlist/{idUser}")
    public ResponseEntity<List<CustomerResponseDTO>> getCustomersByIdUser(@PathVariable Long idUser){
        return ResponseEntity.ok(customerService.getCustomersByIdUser(idUser));
    }

    @Operation(
            summary     = "Getting a only one customers",
            description = "A customer by id"
    )
    @GetMapping("getOne/{idCustomer}")
    public ResponseEntity<CustomerResponseDTO> getCustomById(@PathVariable Long idCustomer) {
        return ResponseEntity.ok(customerService.getCustomerById(idCustomer));
    }

    @Operation(
            summary     = "Create a new Customer",
            description = "Body of a new CustomerRequestDTO is required"
    )
    @PostMapping("/create")
    public ResponseEntity<CustomerResponseDTO> createCustomer(@RequestBody CustomerRequestDTO customerRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).
        body(customerService.createCustomer(customerRequestDTO));
    }

    @Operation(
        summary = "Update a Customer",
        description = "Updates a Customer by editing its fields."
    )
    @PutMapping("/update")
    public ResponseEntity<Void> updateCustomer(@RequestBody CustomerUpdateDTO customerUpdateDTO) {
        customerService.updateCustomer(customerUpdateDTO);
        return new ResponseEntity<>(HttpStatus.OK);
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
