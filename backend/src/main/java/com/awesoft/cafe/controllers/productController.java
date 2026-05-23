package com.awesoft.cafe.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.awesoft.cafe.dtos.ProductDto;

import java.util.List;
import java.util.Map;

@RequestMapping(path = "/product")
public interface productController {
    @PostMapping(path = "/add")
    public ResponseEntity<String> addNewProduct(@RequestBody Map<String, String> requestMap);

    @GetMapping(path = "/get")
    public ResponseEntity<List<ProductDto>> getAllProduct();

    @PostMapping(path = "/update")
    public ResponseEntity<String> update(@RequestBody(required = true) Map<String, String> requestMap);

    @PostMapping(path = "/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id);

    @GetMapping(path = "/getByCategory/{id}")
    public ResponseEntity<List<ProductDto>> getByCategory(@PathVariable Integer id);

    @GetMapping(path = "/getProductById/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Integer id);

    @PostMapping(path = "/updateProductStatus")
    public ResponseEntity<String> updateProductStatus(@RequestBody(required = true) Map<String, String> requestMap);

    /*
    @PostMapping(path = "/updateProductStatus")
    public ResponseEntity<String> updateProductStatus(@RequestBody Map<String, String> requestMap);
    */
}
