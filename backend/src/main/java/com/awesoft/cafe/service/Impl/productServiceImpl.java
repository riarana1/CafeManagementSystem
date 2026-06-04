package com.awesoft.cafe.service.Impl;

import com.awesoft.cafe.constants.CafeConstants;
import com.awesoft.cafe.dtos.ProductDto;
import com.awesoft.cafe.entities.Category;
import com.awesoft.cafe.entities.Product;
import com.awesoft.cafe.jwt.CustomerUserDetailsService;
import com.awesoft.cafe.jwt.JwtFilter;
import com.awesoft.cafe.repositories.ProductRepository;
import com.awesoft.cafe.service.productService;
import com.awesoft.cafe.utils.CafeUtils;
import com.awesoft.cafe.utils.EmailUtil;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
public class productServiceImpl implements productService {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    com.awesoft.cafe.jwt.jwtUtil jwtUtil;

    @Autowired
    JwtFilter jwtFilter;
    @Autowired
    CustomerUserDetailsService customerUserDetailsService;

    @Autowired
    EmailUtil emailUtil;

    @Override
    public ResponseEntity<String> addNewProduct(Map<String, String> requestMap) {
        log.info("Inside addNewProduct{}", requestMap);
        try {
            if (jwtFilter.isAdmin()) {
                if (validateProductMap(requestMap, false)) {
                    productRepository.save(getProductFromMap(requestMap, false));
                    return CafeUtils.getResponeEntity("Product Added Successfully", HttpStatus.OK);
                }
            } else {
                return CafeUtils.getResponeEntity(CafeConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            log.error("Error adding new product: ", ex);
        }
        return CafeUtils.getResponeEntity(CafeConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @Override
    public ResponseEntity<List<ProductDto>> getAllProduct() {
        try {
            return new ResponseEntity<>(productRepository.getAllProduct(), HttpStatus.OK);
        } catch (Exception ex) {
            log.error("Error retrieving all products: ", ex);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @Override
    public ResponseEntity<String> update(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin()) {
                if (validateProductMap(requestMap, true)) {
                    Optional<Product> optional = productRepository.findById(Integer.parseInt(requestMap.get("id")));
                    if (!optional.isEmpty()) {
                        productRepository.save(getProductFromMap(requestMap, true));
                        return CafeUtils.getResponeEntity("Product is updated successfully", HttpStatus.OK);

                    } else {
                        return CafeUtils.getResponeEntity("Product id doesn't exist", HttpStatus.OK);
                    }

                }
                return CafeUtils.getResponeEntity(CafeConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            } else {
                return CafeUtils.getResponeEntity(CafeConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            log.error("Error updating product: ", ex);
        }
        return CafeUtils.getResponeEntity(CafeConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> delete(Integer id) {
        try {
            if (jwtFilter.isAdmin()) {
                Optional<Product> optional = productRepository.findById(id);
                if (!optional.isEmpty()) {
                    productRepository.deleteById(id);
                    //System.out.println("Product is deleted successfully");
                    return CafeUtils.getResponeEntity("Product is deleted successfully", HttpStatus.OK);
                }
                //System.out.println("Product id doesn't exist");
                return CafeUtils.getResponeEntity("Product id doesn't exist", HttpStatus.OK);
            } else {
                return CafeUtils.getResponeEntity(CafeConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            log.error("Error deleting product: ", ex);
        }
        return CafeUtils.getResponeEntity(CafeConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @Override
    public ResponseEntity<List<ProductDto>> getByCategory(Integer id) {
        try {
            return new ResponseEntity<>(productRepository.getByCategory(id), HttpStatus.OK);
        } catch (Exception ex) {
            log.error("Error retrieving products by category: ", ex);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<ProductDto> getProductById(Integer id) {
        try {
            return new ResponseEntity<>(productRepository.getProductById(id), HttpStatus.OK);
        } catch (Exception ex) {
            log.error("Error retrieving product by id: ", ex);
        }
        return new ResponseEntity<>(new ProductDto(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Modifying
    @Transactional
    @Override
    public ResponseEntity<String> updateProductStatus(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin()) {
                Optional<Product> optional = productRepository.findById(Integer.parseInt(requestMap.get("id")));
                if (!optional.isEmpty()) {
                    productRepository.updateProductStatus(requestMap.get("status"), Integer.parseInt(requestMap.get("id")));
                    return CafeUtils.getResponeEntity("Product status is updated successfully", HttpStatus.OK);
                }
                return CafeUtils.getResponeEntity("Product id doesn't exist", HttpStatus.OK);
            }
        } catch (Exception ex) {
            log.error("Error updating product status: ", ex);
        }
        return CafeUtils.getResponeEntity(CafeConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    private boolean validateProductMap(Map<String, String> requestMap, boolean validateId) {
        if (requestMap.containsKey("name")) {
            if (requestMap.containsKey("id") && validateId) {
                return true;
            } else if (!validateId) {
                return true;
            }
        }
        return false;
    }

    private Product getProductFromMap(Map<String, String> requestMap, boolean isUpdate) {
        Product product = new Product();
        Category category = new Category();
        category.setId(Integer.parseInt(requestMap.get("categoryId")));

        product.setCategory(category);
        product.setName(requestMap.get("name"));
        product.setDescription(requestMap.get("description"));
        product.setPrice(Integer.parseInt(requestMap.get("price")));

        if (isUpdate) {
            product.setId(Integer.parseInt(requestMap.get("id")));
            product.setStatus(requestMap.get("status"));
        } else {
            product.setStatus("true");
        }

        return product;
    }
}
