package com.cdavinci.backend_cdavinci.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdavinci.backend_cdavinci.dto.buy.BuyProductResponseDTO;
import com.cdavinci.backend_cdavinci.dto.buy.BuyRequestDTO;
import com.cdavinci.backend_cdavinci.dto.buy.BuyResponseDTO;
import com.cdavinci.backend_cdavinci.service.BuyService;
import java.util.List;

@Tag(name = "Buys", description = "End-Points Buy Management.")
@RestController
@RequestMapping("/api/buy")
public class BuyController {
    
    private final BuyService buyService;

    public BuyController(BuyService buyService) {
        this.buyService = buyService;
    }

    @Operation(
            summary     = "Getting all buys",
            description = "List of buys"
    )
    @GetMapping("/getAll")
    public ResponseEntity<List<BuyResponseDTO>> getAllBuys() {
        return ResponseEntity.ok(buyService.getAllBuys());
    }

    @Operation(
            summary     = "Getting buys of a only one customer",
            description = "List of buys, idCustomer required"
    )
    @GetMapping("/listmadeby/{idCustomer}")
    public ResponseEntity<List<BuyResponseDTO>> getBuysByIdCustomer(@PathVariable Long idCustomer) {
        return ResponseEntity.ok(buyService.getBuysByIdCustomer(idCustomer));
    }

    @Operation(
            summary     = "Getting a only one buy",
            description = "A only one buy, idBuy is required"
    )
    @GetMapping("getOne/{idBuy}")
    public ResponseEntity<BuyResponseDTO> getBuyById(@PathVariable Long idBuy){
        return ResponseEntity.ok(buyService.getBuyById(idBuy));
    }
    
    @Operation(
            summary     = "Getting all buys of a product, idProduct required",
            description = "List of buys(sales) of a only one product"
    )
    @GetMapping("/buys/{idProduct}")
    public List<BuyProductResponseDTO> getBuysByProductId(@PathVariable Long idProduct) {
        return buyService.getBuysByIdProduct(idProduct);
    }

    @Operation(
            summary     = "Create a new buy",
            description = "Body of a new BuyRequestDTO is required"
    )
    @PostMapping("/create")
    public ResponseEntity<BuyResponseDTO> createBuy(@RequestBody BuyRequestDTO buyRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).
        body(buyService.createBuy(buyRequestDTO));
    }

    @Operation(
            summary     = "Delete a Buy, idBuy is required",
            description = "Dropping a only one buy"
    )
    @DeleteMapping("/delete/{idBuy}")
    public ResponseEntity<Void> deleteBuy(@PathVariable Long idBuy) {
        buyService.deleteBuy(idBuy);
        return ResponseEntity.noContent().build();
    }
}
