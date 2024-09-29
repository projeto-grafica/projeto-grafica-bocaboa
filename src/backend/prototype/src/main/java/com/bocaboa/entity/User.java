package com.bocaboa.entity;

import com.bocaboa.enums.UserRolesEnum;
import com.bocaboa.generic.entity.GenericEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User extends GenericEntity {

    @Column(nullable = false)
    public String username;

    @Column(nullable = false)
    public String password;

    @Column(nullable = false)
    public String email;

    @Column(nullable = false)
    public UserRolesEnum role;
}
