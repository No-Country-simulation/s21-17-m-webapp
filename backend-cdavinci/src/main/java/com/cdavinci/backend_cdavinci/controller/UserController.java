package com.cdavinci.backend_cdavinci.controller;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cdavinci.backend_cdavinci.dto.user.NewUserDTO;
import com.cdavinci.backend_cdavinci.dto.user.UserLoginDTO;
import com.cdavinci.backend_cdavinci.model.User;
import com.cdavinci.backend_cdavinci.service.AuthService;
import com.cdavinci.backend_cdavinci.service.UserService;

import jakarta.validation.Valid;

@RestController
public class UserController {

    private final AuthService authService;
    private final UserService userService;

    public UserController(UserService userService, AuthService authService) {

        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody UserLoginDTO loginUserDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Revise sus credenciales");
        }
        try {
            String jwt = authService.authenticate(loginUserDto.getEmail(), loginUserDto.getPassword());
            return ResponseEntity.ok(jwt);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<NewUserDTO> register(@RequestBody NewUserDTO newUserDto) {

        System.out.println(newUserDto.getName());

        return ResponseEntity.status(HttpStatus.CREATED).body(authService.registerUser(newUserDto));

    }

    @GetMapping("/check-auth")
    public ResponseEntity<String> checkAuth() {
        return ResponseEntity.ok().body("Autenticado");
    }

    @GetMapping("api/user")
    public @ResponseBody Iterable<User> sayHello() {
      
        return userService.getUser();
    }
}
