package com.awesoft.cafe.repositories;

import com.awesoft.cafe.dtos.UserDto;
import com.awesoft.cafe.entities.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmailId(@Param("email") String email);

    List<UserDto> getAllUser();

    @Transactional
    @Modifying
   Integer updateStatus(@Param("status") String status, @Param("id") Integer id);

    List<String> getAllAdmin();

    User findByEmail(String email);


}

