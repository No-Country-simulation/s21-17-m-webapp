package com.cdavinci.backend_cdavinci.dto.buy;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BuyProductResponseDTO {
    private Long idBuyProduct;
    private Long buyId;
    private Long productId;
    private int quantity;
}
