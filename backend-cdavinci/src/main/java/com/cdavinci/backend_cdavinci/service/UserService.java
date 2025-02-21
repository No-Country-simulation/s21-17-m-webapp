package com.cdavinci.backend_cdavinci.service;

import org.springframework.stereotype.Service;


import com.cdavinci.backend_cdavinci.model.User;
import com.cdavinci.backend_cdavinci.respository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    

    public  Iterable<User> getUser() {
        return  userRepository.findAll(); 
    }





    
}
