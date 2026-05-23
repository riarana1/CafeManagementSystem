package com.awesoft.cafe.repositories;

import com.awesoft.cafe.dtos.ProductDto;
import com.awesoft.cafe.entities.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    List<ProductDto> getAllProduct();

    List<ProductDto> getByCategory(@Param("id") Integer id);

    ProductDto getProductById(@Param("id") Integer id);

    @Modifying
    @Transactional
    void updateProductStatus(@Param("status") String status, @Param("id") Integer id);

}
