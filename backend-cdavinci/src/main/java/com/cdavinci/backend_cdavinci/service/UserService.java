package com.cdavinci.backend_cdavinci.service;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import com.cdavinci.backend_cdavinci.model.User;
import com.cdavinci.backend_cdavinci.respository.UserRepository;

@Service
public class UserService implements UserDetailsService{

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    

    public  Iterable<User> getUser() {
        return  userRepository.findAll(); 
    }


    @Override
    public UserDetails loadUserByUsername(String gmail) throws UsernameNotFoundException {
        User user = userRepository.findByGmail(gmail)
                                  .orElseThrow(()-> new UsernameNotFoundException("User not found") );
    
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().getRoleName().toString()); 
        
        return new org.springframework.security.core.userdetails.User(
            user.getGmail(),
            user.getPassword(),
            Collections.singleton(authority)
        );
    }

    public boolean existsByGmail(String gmail){
        return userRepository.existsByGmail(gmail);
    }

    public void save(User user){
        userRepository.save(user);
    }

}
