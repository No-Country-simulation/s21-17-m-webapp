package com.cdavinci.backend_cdavinci.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Entity
@Setter
@Getter
@Table(name = "categorias")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCategoria;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    @ManyToOne
    @jakarta.persistence.JoinColumn(name = "categoria_raiz_id")
    private Categoria categoriaRaiz;

    @OneToMany(mappedBy = "categoriaRaiz", cascade = CascadeType.ALL) // CascadeType para subcategorías
    private List<Categoria> subcategorias;

}