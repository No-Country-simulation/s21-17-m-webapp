package com.cdavinci.backend_cdavinci.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cdavinci.backend_cdavinci.model.BuyProduct;

import java.util.List;

@Repository
public interface BuyProductRepository extends JpaRepository<BuyProduct, Long> {

    List<BuyProduct> findByProduct_IdProduct(Long idProduct);
}
