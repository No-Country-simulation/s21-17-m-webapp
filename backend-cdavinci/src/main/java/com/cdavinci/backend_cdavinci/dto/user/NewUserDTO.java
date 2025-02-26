package com.cdavinci.backend_cdavinci.dto.user;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class NewUserDTO{

    private String name;
    private String lastname;
    private String fonenumber;
    private Boolean artisan;
    private String gmail; 
    private String password;

}
