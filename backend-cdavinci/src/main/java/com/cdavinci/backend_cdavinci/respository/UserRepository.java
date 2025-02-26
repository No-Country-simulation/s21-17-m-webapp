package com.cdavinci.backend_cdavinci.respository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.cdavinci.backend_cdavinci.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

   
    Optional<User> findByGmail(String gmail); 
    boolean existsByGmail(String gmail);
    

}
