package com.cdavinci.backend_cdavinci.dto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class UserResponseDTO {
 
    private Long id;   
    private String tokend;
    private String name;
    private String last_name;
    private String phone_number;
  

    public UserResponseDTO(Long id, String tokend, String name, String last_name, String phone_number) {
        this.id = id;
        this.tokend = tokend;
        this.name = name;
        this.last_name = last_name;
        this.phone_number = phone_number;
    }

}
    
