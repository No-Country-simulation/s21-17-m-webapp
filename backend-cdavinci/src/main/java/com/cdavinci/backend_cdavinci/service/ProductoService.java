package com.cdavinci.backend_cdavinci.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cdavinci.backend_cdavinci.model.*;
import com.cdavinci.backend_cdavinci.respository.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    public ProductoService() {
    }

    @Autowired
    private ProductoRepository productoRepository;

    public List<Producto> obtenerTodosLosProductos() {
        return productoRepository.findAll();
    }
    
    public List<Producto> obteneProductosDeVendedor(User user){
        return productoRepository.findByVendedor(user);
    }

    public List<Producto> obteneProductosDeCategoria(Categoria categoria){
        return productoRepository.findByCategoria(categoria);
    }

    public Optional<Producto> obtenerProductoPorId(Long id) {
        return productoRepository.findById(id);
    }

    public Producto guardarProducto(Producto producto) {
        producto.setFechaInventario(LocalDateTime.now());
        return productoRepository.save(producto);
    }

    public void eliminarProducto(Long id) {
        productoRepository.deleteById(id);
    }
}
