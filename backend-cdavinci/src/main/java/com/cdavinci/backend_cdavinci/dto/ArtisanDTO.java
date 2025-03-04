package com.cdavinci.backend_cdavinci.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ArtisanDTO {
    private String name;
    private String aboutMe;
    private String imageUrl;
    private String locality;
    private String speciality;
}
