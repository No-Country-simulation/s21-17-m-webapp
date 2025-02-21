package com.cdavinci.backend_cdavinci.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cdavinci.backend_cdavinci.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
   
}