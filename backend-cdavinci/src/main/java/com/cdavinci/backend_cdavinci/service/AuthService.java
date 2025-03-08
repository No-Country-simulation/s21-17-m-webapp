package com.cdavinci.backend_cdavinci.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cdavinci.backend_cdavinci.dto.user.NewUserDTO;
import com.cdavinci.backend_cdavinci.dto.user.UserLoginDTO;
import com.cdavinci.backend_cdavinci.dto.user.UserResponseDTO;
import com.cdavinci.backend_cdavinci.jwt.JwtUtil;
import com.cdavinci.backend_cdavinci.model.Role;
import com.cdavinci.backend_cdavinci.model.User;
import com.cdavinci.backend_cdavinci.respository.RoleRepository;
import com.cdavinci.backend_cdavinci.respository.UserRepository;

@Service
public class AuthService {

    private final UserService userService;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @Autowired
    public AuthService(UserService userService, RoleRepository roleRepository, PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil, AuthenticationManagerBuilder authenticationManagerBuilder, UserRepository userRepository) {
        this.userService = userService;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.userRepository = userRepository;
    }

    public String authenticate(String username, String password) {
        try {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,
                    password);
            Authentication authResult = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authResult);
            return jwtUtil.generateToken(authResult);
       
        } catch (Exception e) {
            throw new RuntimeException("Error en la autenticación", e);
        }

    }

    public UserResponseDTO registerUser(NewUserDTO newUserDto) {
        if (userService.existsByGmail(newUserDto.getGmail())) {
            throw new IllegalArgumentException("El nombre de usuario ya existe");
        }

        UserResponseDTO userResponse = new UserResponseDTO();
        boolean isArtisan = newUserDto.getArtisan();


        try {

            String roleName = isArtisan ? "ARTISAN" : "USER";

            Role role = roleRepository.findByRoleName(roleName)
            .orElseGet(() -> {
                Role newRole = new Role();
                newRole.setRoleName(roleName);
                return roleRepository.save(newRole);
            });


            User user = new User();
            user.setName(newUserDto.getName());
            user.setLast_name(newUserDto.getLastname());
            user.setGmail(newUserDto.getGmail());
            user.setPassword(passwordEncoder.encode(newUserDto.getPassword()));
            user.setRole(role);
            user.setPhoneNumber(newUserDto.getFonenumber());

            userService.save(user);

            // for autentication afther register a new user
            String jwt = authenticate(newUserDto.getGmail(), newUserDto.getPassword());
            Optional<User> registerUser = userRepository.findByGmail(user.getGmail());

            if (registerUser.isEmpty()) {
                throw new RuntimeException("No se pudo recuperar el usuario después del registro");
            }

           // boolean newRole = registerUser.get().getRole().toString() == "ARTISAN" ? true : false;

            userResponse = new UserResponseDTO(
                    registerUser.get().getId(),
                    jwt,
                    registerUser.get().getName(),
                    registerUser.get().getLast_name(),
                    isArtisan,
                    registerUser.get().getPhoneNumber());

        } catch (Exception e) {
            throw new RuntimeException("No se pudo registrar el usuario", e);
        }

        return userResponse;
    }

    public UserResponseDTO autenticateUser(UserLoginDTO user){
        
        String jwt = authenticate(user.getEmail(), user.getPassword());
        Optional<User> loginUser = userRepository.findByGmail(user.getEmail());

        boolean newRole = loginUser.get().getRole().getRoleName().toString().equals("ARTISAN") ? true : false;

        UserResponseDTO userResponse = new UserResponseDTO();

        userResponse = new UserResponseDTO(
            loginUser.get().getId(),
            jwt,
            loginUser.get().getName(),
            loginUser.get().getLast_name(),
            newRole,
            loginUser.get().getPhoneNumber()
        );
        
        return userResponse;
        
    }
}