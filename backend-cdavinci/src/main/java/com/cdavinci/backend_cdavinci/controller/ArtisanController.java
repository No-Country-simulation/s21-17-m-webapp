package com.cdavinci.backend_cdavinci.controller;

import com.cdavinci.backend_cdavinci.dto.ArtisanDTO;
import com.cdavinci.backend_cdavinci.service.ArtisanService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/landing")
public class ArtisanController {

    private final ArtisanService artisanService;

    public ArtisanController(ArtisanService artisanService) {
        this.artisanService = artisanService;
    }

    @GetMapping("/artisans")
    public ResponseEntity<Map<String, List<ArtisanDTO>>> getArtisans() {
        List<ArtisanDTO> artisans = artisanService.getArtisans();
        Map<String, List<ArtisanDTO>> response = new HashMap<>();
        response.put("artisans", artisans);
        return ResponseEntity.ok(response);
    }
}
