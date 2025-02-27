package com.cdavinci.backend_cdavinci.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cdavinci.backend_cdavinci.model.Buy;
import com.cdavinci.backend_cdavinci.model.Customer;

@Repository
public interface BuyRepository extends JpaRepository <Buy, Long>{
    List<Buy> findByCustomer(Customer customer);
}
