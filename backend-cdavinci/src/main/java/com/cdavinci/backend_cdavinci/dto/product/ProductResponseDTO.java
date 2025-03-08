package com.cdavinci.backend_cdavinci.dto.product;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDTO {
    private Long idProduct;
    private String name;
    private String description;
    private BigDecimal price;
    private int stock;
    private String urlImage;
    private Long idCategory;
    private Long idArtisan;
    private LocalDateTime stockUpdated;
    private boolean active;
}
