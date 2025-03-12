package com.cdavinci.backend_cdavinci.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Setter
@Getter
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCategory;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;
    
    @ManyToOne
    @jakarta.persistence.JoinColumn(name = "idCategoryRoot")
    private Category categoryRoot;
}
