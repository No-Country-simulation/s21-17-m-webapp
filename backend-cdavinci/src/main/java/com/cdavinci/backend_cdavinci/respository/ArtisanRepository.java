package com.cdavinci.backend_cdavinci.respository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cdavinci.backend_cdavinci.model.Artisan;
import com.cdavinci.backend_cdavinci.model.User;

@Repository
public interface ArtisanRepository extends JpaRepository<Artisan, Long> {

        boolean existsByUser(User user);

        Optional<Artisan> findByUser(User user);

        Optional<Artisan> findByUserId(Long userId);
}
