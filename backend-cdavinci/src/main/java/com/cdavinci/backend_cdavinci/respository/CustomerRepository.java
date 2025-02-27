package com.cdavinci.backend_cdavinci.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cdavinci.backend_cdavinci.model.Customer;
import com.cdavinci.backend_cdavinci.model.User;

@Repository
public interface CustomerRepository extends JpaRepository <Customer, Long>{

    List<Customer> findByUser(User user);

}
