package com.cdavinci.backend_cdavinci.dto.customer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CustomerRequestDTO {
    private String name;
    private String lastname;
    private String address;
    private Long userId;
}
