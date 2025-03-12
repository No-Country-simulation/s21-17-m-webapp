package com.cdavinci.backend_cdavinci.dto.buy;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BuyProductResponseDTO {
    private Long idBuy;
    private Long idProduct;
    private String name;
    private String description;
    private BigDecimal price;
    private int quantity;
}
