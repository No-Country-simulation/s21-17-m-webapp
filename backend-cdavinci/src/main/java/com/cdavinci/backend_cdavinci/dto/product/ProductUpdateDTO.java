package com.cdavinci.backend_cdavinci.dto.product;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductUpdateDTO {
    private Long idProduct;
    private String name;
    private String description;
    private BigDecimal price;
    private int stock;
    private String urlImage;
    private Long idCategory;
    private boolean active;
}
