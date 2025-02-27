package com.cdavinci.backend_cdavinci.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {

    private Long id;
    private String tokend;
    private String name;
    private String last_name;
    private boolean artisan;
    private String phone_number;

}
