package com.cdavinci.backend_cdavinci.controller;

import com.cdavinci.backend_cdavinci.dto.ArtisanDTO;
import com.cdavinci.backend_cdavinci.model.Artisan;
import com.cdavinci.backend_cdavinci.model.Role;
import com.cdavinci.backend_cdavinci.model.User;
import com.cdavinci.backend_cdavinci.respository.RoleRepository;
import com.cdavinci.backend_cdavinci.service.ArtisanService;
import com.cdavinci.backend_cdavinci.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/landing")
public class ArtisanController {

    private final ArtisanService artisanService;

    private final UserService userService;
    private final RoleRepository roleRepository;

    public ArtisanController(ArtisanService artisanService, UserService userService, RoleRepository roleRepository) {
        this.artisanService = artisanService;
        this.userService = userService;
        this.roleRepository = roleRepository;
    }

    @GetMapping("/artisans")
    public ResponseEntity<Map<String, List<ArtisanDTO>>> getArtisans() {
        List<ArtisanDTO> artisans = artisanService.getArtisans();
        Map<String, List<ArtisanDTO>> response = new HashMap<>();
        response.put("artisans", artisans);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Getting a artisan, idArtisan required", description = "A only one artisan")
    @GetMapping("/artisan/{idArtisan}")
    public ResponseEntity<ArtisanDTO> getArtisanById(@PathVariable Long idArtisan) {
        ArtisanDTO artisan = artisanService.getArtisanById(idArtisan);
        return ResponseEntity.ok(artisan);
    }

    @GetMapping("/artisan/user/{userId}")
    public ResponseEntity<ArtisanDTO> getArtisanByUserId(@PathVariable Long userId) {
        ArtisanDTO artisan = artisanService.getArtisanByUserId(userId);
        return ResponseEntity.ok(artisan);
    }

    @PostMapping("/create/artisan")
    public ResponseEntity<?> createArtisan(@RequestBody ArtisanDTO artisanDTO, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("user_id");
        User user = userService.findById(userId);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }
        if (artisanService.existsByUser(user)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Este usuario ya tiene un perfil de artesano.");
        }

        if (!user.getRole().getRoleName().equalsIgnoreCase("ARTISAN")) {

            Role artisanRole = roleRepository.findByRoleName("ARTISAN")
                    .orElseThrow(() -> new RuntimeException("No se encontró el rol de ARTESANO en la base de datos."));

            user.setRole(artisanRole);
            userService.save(user);
        }

        Artisan artisan = artisanService.createArtisan(user, artisanDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(artisan);

    }

    @PutMapping("/update/artisan")
    public ResponseEntity<?> updateArtisan(@RequestBody ArtisanDTO artisanDTO, HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("user_id");
        User user = userService.findById(userId);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }

        Artisan artisan = artisanService.findByUser(user);
        if (artisan == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("No existe un perfil de artesano para este usuario.");
        }

        Artisan updatedArtisan = artisanService.updateArtisan(artisan, artisanDTO);
        return ResponseEntity.ok(updatedArtisan);
    }

    @DeleteMapping("/artisans/{id}")
    public ResponseEntity<Void> deleteArtisan(@PathVariable Long id, HttpServletRequest request) {

        Long userId = (Long) request.getAttribute("user_id");
        User user = userService.findById(userId);

        if (user == null) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        try {
            artisanService.deleteArtisan(id, user);
        } catch (RuntimeException e) {

            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }

        return ResponseEntity.noContent().build();
    }

}
