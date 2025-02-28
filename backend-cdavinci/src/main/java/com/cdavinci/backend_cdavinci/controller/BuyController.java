package com.cdavinci.backend_cdavinci.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdavinci.backend_cdavinci.model.Buy;
import com.cdavinci.backend_cdavinci.model.BuyProduct;
import com.cdavinci.backend_cdavinci.service.BuyService;
import java.util.List;

@RestController
@RequestMapping("/api/buy")
public class BuyController {
    
    private final BuyService buyService;

    public BuyController(BuyService buyService) {
        this.buyService = buyService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Buy>> getAllBuys() {
        return ResponseEntity.ok(buyService.getAllBuys());
    }

    @GetMapping("/buylist/{idCustomer}")
    public ResponseEntity<List<Buy>> getBuysByIdCustomer(@PathVariable Long idCustomer) {
        return ResponseEntity.ok(buyService.getBuysByIdCustomer(idCustomer));
    }

    @GetMapping("getOne/{idBuy}")
    public ResponseEntity<Buy> getBuyById(@PathVariable Long idBuy){
        return ResponseEntity.ok(buyService.getBuyById(idBuy));
    }

    @GetMapping("/products/{idBuy}")
    public ResponseEntity<List<BuyProduct>> getPurchasedProducts(@PathVariable Long idBuy) {
        List<BuyProduct> products = buyService.getPurchasedProducts(idBuy);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
    
    @GetMapping("/buys/{productId}")
    public List<Buy> getBuysByProductId(@PathVariable Long productId) {
        return buyService.getBuysByProductId(productId);
    }

    @PostMapping("/save")
    public ResponseEntity<Buy> saveBuy(@RequestBody Buy buy) {
        return ResponseEntity.status(HttpStatus.CREATED).
        body(buyService.saveBuy(buy));
    }

    @DeleteMapping("/delete/{idBuy}")
    public ResponseEntity<Void> deleteBuy(@PathVariable Long idBuy) {
        buyService.deleteBuy(idBuy);
        return ResponseEntity.noContent().build();
    }

}
