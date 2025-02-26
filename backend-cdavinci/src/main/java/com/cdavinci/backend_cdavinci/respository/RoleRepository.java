package com.cdavinci.backend_cdavinci.respository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cdavinci.backend_cdavinci.model.Role;
import com.cdavinci.backend_cdavinci.model.enums.RoleList;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRoleName(RoleList name);
}