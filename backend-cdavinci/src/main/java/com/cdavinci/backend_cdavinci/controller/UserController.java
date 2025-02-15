package com.cdavinci.backend_cdavinci.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cdavinci.backend_cdavinci.model.User;
import com.cdavinci.backend_cdavinci.service.UserService;

@RestController
public class UserController {
    
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public @ResponseBody  Iterable<User> sayHello() {
        return userService.getUser();
    }
}
