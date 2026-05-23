package com.awesoft.cafe.service;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;

import com.awesoft.cafe.dtos.ProductDto;

import java.util.List;
import java.util.Map;

public interface productService {
    ResponseEntity<String> addNewProduct(Map<String, String> requestMap);

    ResponseEntity<List<ProductDto>> getAllProduct();

    ResponseEntity<String> update(Map<String, String> requestMap);

    ResponseEntity<String> delete(Integer id);

    ResponseEntity<List<ProductDto>> getByCategory(Integer id);

    ResponseEntity<ProductDto> getProductById(Integer id);
    @Modifying
    @Transactional
    ResponseEntity<String> updateProductStatus(Map<String, String> requestMap);

}
