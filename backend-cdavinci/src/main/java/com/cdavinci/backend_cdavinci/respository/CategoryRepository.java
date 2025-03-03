package com.cdavinci.backend_cdavinci.respository;

import com.cdavinci.backend_cdavinci.model.Category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT c FROM Category c WHERE c.categoryRoot IS NULL")
    List<Category> findRootCategories();

    @Query("SELECT c FROM Category c WHERE c.categoryRoot.idCategory = :idCategoryRoot")
    List<Category> findCategoriesByRootId(@Param("idCategoryRoot") Long idCategoryRoot);
}
