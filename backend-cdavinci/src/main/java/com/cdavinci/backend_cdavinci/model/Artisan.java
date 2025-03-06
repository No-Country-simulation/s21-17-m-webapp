package com.cdavinci.backend_cdavinci.model;

import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "artisan")
public class Artisan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "aboutme", nullable = false)
    private String aboutMe;
    @Column(name = "imageurl", nullable = false)
    private String imageUrl;
    @Column(name = "locality", nullable = false)
    private String locality;
    @Column(name = "speciality", nullable = false)
    private String speciality;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @OneToMany(mappedBy = "artisan", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Product> products;

}