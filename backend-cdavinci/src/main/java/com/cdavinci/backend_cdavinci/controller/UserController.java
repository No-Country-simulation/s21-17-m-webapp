package com.cdavinci.backend_cdavinci.controller;

import java.io.IOException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cdavinci.backend_cdavinci.model.User;
import com.cdavinci.backend_cdavinci.service.UserService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public void redirectToSwagger(HttpServletResponse response) throws IOException {
        response.sendRedirect("/swagger-ui/index.html");
    }

    @GetMapping("/user")
    public @ResponseBody Iterable<User> sayHello() {
        return userService.getUser();
    }
}
