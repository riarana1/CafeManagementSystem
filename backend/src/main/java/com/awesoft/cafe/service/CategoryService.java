package com.awesoft.cafe.service;

import org.springframework.http.ResponseEntity;

import com.awesoft.cafe.entities.Category;

import java.util.List;
import java.util.Map;


public interface CategoryService {
     ResponseEntity<String> addNewCategory(Map<String, String> requestMap);
     ResponseEntity<List<Category>> getAllCategory(String Value);

     ResponseEntity<String> update(Map<String, String> requestMap);
}
