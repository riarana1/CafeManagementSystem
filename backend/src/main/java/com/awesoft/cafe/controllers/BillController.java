package com.awesoft.cafe.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.awesoft.cafe.entities.Bill;

import java.util.List;
import java.util.Map;

@RequestMapping(path = "/bill")
public interface BillController {
    @PostMapping(path = "/generateReport")
    public ResponseEntity<String> generateReport(@RequestBody Map<String, Object> requestMap);

    @GetMapping(path = "/getBills")
    public ResponseEntity<List<Bill>> getBills();

    @PostMapping(path = "/getPdf")
    public ResponseEntity<byte[]> getPdf(@RequestBody Map<String, Object> requestMap);

    @PostMapping(path = "/delete/{id}")
    public ResponseEntity<String> deleteBill(@PathVariable Integer id);

}

