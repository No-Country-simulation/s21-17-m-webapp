package com.cdavinci.backend_cdavinci.dto.buy;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BuyProductRequestDTO {
    private Long idProduct;
    private int quantity;
}
