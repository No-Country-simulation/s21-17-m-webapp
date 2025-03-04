package com.cdavinci.backend_cdavinci.dto.buy;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BuyRequestDTO {
    private List<BuyProductRequestDTO> purchasedProducts;
    private double amount;
    private Long idCustomer;
}
