package com.cdavinci.backend_cdavinci.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cdavinci.backend_cdavinci.dto.user.NewUserDTO;
import com.cdavinci.backend_cdavinci.jwt.JwtUtil;
import com.cdavinci.backend_cdavinci.model.Role;
import com.cdavinci.backend_cdavinci.model.User;
import com.cdavinci.backend_cdavinci.model.enums.RoleList;
import com.cdavinci.backend_cdavinci.respository.RoleRepository;

@Service
public class AuthService {

    private final UserService userService;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @Autowired
    public AuthService(UserService userService, RoleRepository roleRepository, PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil, AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.userService = userService;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    public String authenticate(String username, String password) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,
                password);
        Authentication authResult = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authResult);
        return jwtUtil.generateToken(authResult);
    }

    public NewUserDTO registerUser(NewUserDTO newUserDto) {
        if (userService.existsByGmail(newUserDto.getGmail())) {
            throw new IllegalArgumentException("El nombre de usuario ya existe");
        }

        try {
            Role roleUser = new Role();
            Boolean role = newUserDto.getArtisan();
    
            if (!role) {
                roleUser.setRoleName(RoleList.ROLE_USER);
            } else {
                roleUser.setRoleName(RoleList.ROLE_ARTISAN);
            }
            
            roleUser = roleRepository.save(roleUser);

            User user = new User();
            user.setName(newUserDto.getName());
            user.setLast_name(newUserDto.getLastname());
            user.setGmail(newUserDto.getGmail());
            user.setPassword(passwordEncoder.encode(newUserDto.getPassword()));
            user.setRole(roleUser);
    
            userService.save(user);
        } catch( Exception e){
            System.out.println("Ya fue " + e);
        }

 

        return newUserDto;
    }
}