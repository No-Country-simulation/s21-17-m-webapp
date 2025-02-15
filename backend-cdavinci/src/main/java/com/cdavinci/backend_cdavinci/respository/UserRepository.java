package com.cdavinci.backend_cdavinci.respository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cdavinci.backend_cdavinci.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Integer>{
    
}
