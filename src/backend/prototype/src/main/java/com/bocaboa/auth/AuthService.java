package com.bocaboa.auth;

import com.bocaboa.entity.User;
import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@ApplicationScoped
public class AuthService {

    @Inject
    EntityManager entityManager;

    public Optional<String> login(String username, String password) {
        User user = entityManager.createQuery("SELECT u FROM User u WHERE u.username = :username", User.class)
                .setParameter("username", username)
                .getSingleResult();

        if (user != null && user.password.equals(password)) {
            return Optional.of(generateToken(user));
        }

        return Optional.empty();
    }

    private String generateToken(User user) {
        Set<String> roles = new HashSet<>();
        roles.add(user.role.name());

        return Jwt.issuer("bocaboa-auth-server")
                .subject(user.username)
                .groups(roles)
                .sign();
    }
}
