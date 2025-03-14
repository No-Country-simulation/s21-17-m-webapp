package com.cdavinci.backend_cdavinci.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cdavinci.backend_cdavinci.model.Product;
import com.cdavinci.backend_cdavinci.model.Category;
import com.cdavinci.backend_cdavinci.model.Artisan;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(Category category);
    List<Product> findByArtisan(Artisan artisan);
}
