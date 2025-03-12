package com.cdavinci.backend_cdavinci.dto.buy;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BuyResponseDTO {
    private Long idBuy;
    private Long idBuyProduct;
    private LocalDateTime buyDate;
    private double amount;
    private Long customerId;
}
