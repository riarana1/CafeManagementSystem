package com.awesoft.cafe.service.Impl;

import com.awesoft.cafe.repositories.BillRepository;
import com.awesoft.cafe.repositories.CategoryRepository;
import com.awesoft.cafe.repositories.ProductRepository;
import com.awesoft.cafe.service.DashboardService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    BillRepository billDao;


    @Override
    public ResponseEntity<Map<String, Object>> getCount() {
        System.out.println("inside getCount");

        Map<String , Object> map = new HashMap<>();
        map.put("category" , categoryRepository.count());
        map.put("product" , productRepository.count());
        map.put("bill" , billDao.count());
        return new ResponseEntity<>(map , HttpStatus.OK);
    }
}
