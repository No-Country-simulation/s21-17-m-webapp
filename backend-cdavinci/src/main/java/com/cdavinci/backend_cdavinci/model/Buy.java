package com.cdavinci.backend_cdavinci.model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "buy")
public class Buy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idBuy;
    
    @OneToMany(mappedBy = "buy", cascade = CascadeType.ALL)
    private List<BuyProduct> purchasedProducts;
    
    private LocalDateTime buyDate;
    
    private double amount;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;
}
