package com.cdavinci.backend_cdavinci.dto.customer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerUpdateDTO {
    private Long idCustomer;
    private String name;
    private String lastname;
    private String address;
}
