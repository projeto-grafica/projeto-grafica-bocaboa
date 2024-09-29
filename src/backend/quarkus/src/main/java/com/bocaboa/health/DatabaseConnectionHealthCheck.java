package com.bocaboa.health;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.health.HealthCheck;
import org.eclipse.microprofile.health.HealthCheckResponse;
import org.eclipse.microprofile.health.Readiness;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

/**
 * Health check class to monitor the application's readiness status based on database connectivity.
 * <p>
 * This class implements {@link HealthCheck} and is annotated with {@link Readiness},
 * indicating that it performs a readiness check. The health check is used to determine if the application
 * is ready to handle requests based on the status of the database connection.
 * </p>
 * <p>
 * The health check assesses the readiness of the application by attempting to establish a connection to the
 * database and checking if the connection is valid.
 * </p>
 *
 * @author mauroDasChagas
 */
@Readiness
@ApplicationScoped
public class DatabaseConnectionHealthCheck implements HealthCheck {

    @Inject
    DataSource dataSource;

    /**
     * Performs the readiness check of the application based on database connectivity.
     * <p>
     * The check attempts to establish a connection to the database and verifies if the connection is valid.
     * It returns a {@link HealthCheckResponse} indicating whether the database is connected and available.
     * </p>
     *
     * @return a {@link HealthCheckResponse} indicating the readiness status of the application,
     *         including whether the database connection is valid or not.
     */
    @Override
    public HealthCheckResponse call() {
        try (Connection connection = dataSource.getConnection()) {
            if (connection.isValid(2)) {
                return HealthCheckResponse.up("Database connected! \uD83C\uDFB2");
            } else {
                return HealthCheckResponse.down("Database connection is not valid \uD83E\uDD7A");
            }
        } catch (SQLException e) {
            return HealthCheckResponse.down("Database connection health check failed: " + e.getMessage());
        }
    }
}
