package com.cdavinci.backend_cdavinci.service;

import com.cdavinci.backend_cdavinci.dto.ArtisanDTO;
import com.cdavinci.backend_cdavinci.model.Artisan;
import com.cdavinci.backend_cdavinci.respository.ArtisanRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ArtisanService {

    private final ArtisanRepository artisanRepository;

    public ArtisanService(ArtisanRepository artisanRepository) {
        this.artisanRepository = artisanRepository;
    }

    public List<ArtisanDTO> getArtisans() {
        return artisanRepository.findAll()
                .stream()
                .map(artisan -> new ArtisanDTO(
                        artisan.getName(),
                        artisan.getAboutMe(),
                        artisan.getImageUrl(),
                        artisan.getLocality(),
                        artisan.getSpeciality()
                ))
                .collect(Collectors.toList());
    }
}
