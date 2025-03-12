package com.cdavinci.backend_cdavinci.dto.product;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProductRequestDTO {
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
