package com.awesoft.cafe.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import jakarta.persistence.*;
import java.io.Serializable;

@NamedQuery(name = "User.findByEmailId", query = "select u from User u where u.email=:email")

@NamedQuery(name = "User.getAllUser" , query = "select new com.awesoft.cafe.dtos.UserDto(u.id , u.name , u.email , u.contactNumber , u.status) from User u where u.role = 'user'")

@NamedQuery(name = "User.getAllAdmin" , query = "select u.email from User u where u.role = 'admin'")

@NamedQuery(name = "User.updateStatus" , query = "update User u set u.status=:status where u.id =:id")

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DynamicUpdate
@DynamicInsert
@Table(name = "users")

public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "contactNumber")
    private String contactNumber;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;
    @Column(name = "status")
    private String status;

    @Column(name = "role")
    private String role;

}
