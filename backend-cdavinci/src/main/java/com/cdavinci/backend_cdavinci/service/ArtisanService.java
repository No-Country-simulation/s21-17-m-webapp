package com.cdavinci.backend_cdavinci.service;

import com.cdavinci.backend_cdavinci.dto.ArtisanDTO;
import com.cdavinci.backend_cdavinci.model.Artisan;
import com.cdavinci.backend_cdavinci.model.Role;
import com.cdavinci.backend_cdavinci.model.User;
import com.cdavinci.backend_cdavinci.respository.ArtisanRepository;
import com.cdavinci.backend_cdavinci.respository.RoleRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ArtisanService {

    private final ArtisanRepository artisanRepository;
    private final RoleRepository roleRepository;

    public ArtisanService(ArtisanRepository artisanRepository, RoleRepository roleRepository) {
        this.artisanRepository = artisanRepository;
        this.roleRepository = roleRepository;
    }

    public List<ArtisanDTO> getArtisans() {
        return artisanRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public ArtisanDTO getArtisanById(Long id) {
        return artisanRepository.findById(id)
                .map(this::convertToDto)
                .orElseThrow(() -> new RuntimeException("Artesano no encontrado con ID: " + id));
    }

    public ArtisanDTO getArtisanByUserId(Long userId) {
        return artisanRepository.findByUserId(userId)
                .map(this::convertToDto)
                .orElseThrow(() -> new RuntimeException("Artesano no encontrado con ID User: " + userId));
    }

    public Artisan createArtisan(User user, ArtisanDTO artisanDTO) {
        Artisan artisan = new Artisan();
        artisan.setName(artisanDTO.getName());
        artisan.setAboutMe(artisanDTO.getAboutMe());
        artisan.setImageUrl(artisanDTO.getImageUrl());
        artisan.setLocality(artisanDTO.getLocality());
        artisan.setSpeciality(artisanDTO.getSpeciality());
        artisan.setUser(user);
        return artisanRepository.save(artisan);
    }

    public boolean existsByUser(User user) {
        return artisanRepository.existsByUser(user);
    }

    public Artisan findByUser(User user) {
        return artisanRepository.findByUser(user).orElse(null);
    }

    public Artisan updateArtisan(Artisan artisan, ArtisanDTO artisanDTO) {
        artisan.setName(artisanDTO.getName());
        artisan.setAboutMe(artisanDTO.getAboutMe());
        artisan.setImageUrl(artisanDTO.getImageUrl());
        artisan.setLocality(artisanDTO.getLocality());
        artisan.setSpeciality(artisanDTO.getSpeciality());

        return artisanRepository.save(artisan);
    }

    public void deleteArtisan(Long id, User user) {
        Artisan artisan = artisanRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("No existe un perfil de artesano para este usuario."));
        if (!artisan.getId().equals(id)) {
            throw new RuntimeException("No puedes eliminar el perfil de otro artesano.");
        }
        Artisan artisanToDelete = artisanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No se encontró un artesano con ese id"));

        User artisanUser = artisanToDelete.getUser();
        Role userRole = roleRepository.findByRoleName("USER")
                .orElseThrow(() -> new RuntimeException("Rol 'USER' no encontrado"));

        artisanUser.setRole(userRole);

        artisanRepository.delete(artisanToDelete);
    }

    public Artisan save(Artisan artisan) {
        return artisanRepository.save(artisan);
    }

    private ArtisanDTO convertToDto(Artisan artisan) {
        return new ArtisanDTO(
                artisan.getId(),
                artisan.getName(),
                artisan.getAboutMe(),
                artisan.getImageUrl(),
                artisan.getLocality(),
                artisan.getSpeciality());
    }
}
