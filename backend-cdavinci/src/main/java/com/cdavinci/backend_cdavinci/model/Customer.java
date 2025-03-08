package com.cdavinci.backend_cdavinci.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCustomer;

    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "last_name", nullable = false)
    private String lastname;
    
    @Column(name = "address", nullable = false)
    private String address;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
