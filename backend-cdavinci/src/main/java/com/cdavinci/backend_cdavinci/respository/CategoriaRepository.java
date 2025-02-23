package com.cdavinci.backend_cdavinci.respository;

import com.cdavinci.backend_cdavinci.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    List<Categoria> findCategoriasByCategoriaRaiz_IdCategoria(
            Long categoriaRaizIdCategoria);

}