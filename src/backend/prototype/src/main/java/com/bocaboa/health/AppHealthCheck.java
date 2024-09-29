package com.bocaboa.health;

import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.health.HealthCheck;
import org.eclipse.microprofile.health.HealthCheckResponse;
import org.eclipse.microprofile.health.Liveness;

import java.io.File;

/**
 * Health check class to monitor the application's liveness status.
 * <p>
 * This class implements {@link HealthCheck} and is annotated with {@link Liveness},
 * indicating that it performs a liveness check. The health check is used to determine if the application
 * is still running and able to respond to requests.
 * </p>
 * <p>
 * The health check assesses the application's status based on memory and disk space metrics:
 * <ul>
 *     <li>{@code freeMemory}: The amount of free memory available to the JVM.</li>
 *     <li>{@code totalMemory}: The total amount of memory currently available to the JVM.</li>
 *     <li>{@code maxMemory}: The maximum amount of memory that the JVM can use.</li>
 *     <li>{@code freeDiskSpace}: The amount of free disk space available on the root partition.</li>
 *     <li>{@code totalDiskSpace}: The total amount of disk space available on the root partition.</li>
 * </ul>
 * </p>
 * <p>
 * The system is considered "up" if more than 10% of memory and disk space is free. This threshold can be adjusted
 * as needed based on application requirements.
 * </p>
 *
 * @author mauroDasChagas
 */
@Liveness
@ApplicationScoped
public class AppHealthCheck implements HealthCheck {

    /**
     * Performs the liveness check of the application.
     * <p>
     * The check assesses the application's health by evaluating memory and disk space metrics.
     * It returns a {@link HealthCheckResponse} with details about the current memory and disk usage.
     * </p>
     *
     * @return a {@link HealthCheckResponse} indicating the liveness status of the application,
     *         including memory and disk space metrics.
     */
    @Override
    public HealthCheckResponse call() {
        // memory usage details
        long freeMemory = Runtime.getRuntime().freeMemory();
        long totalMemory = Runtime.getRuntime().totalMemory();
        long maxMemory = Runtime.getRuntime().maxMemory();

        // disk space details
        File diskPartition = new File("/");
        long freeSpace = diskPartition.getFreeSpace();
        long totalSpace = diskPartition.getTotalSpace();

        // system is "up" if there is more than 10% of free memory and free disk space
        // no specific reason for this 10%, improve this metric if necessary
        boolean up = freeMemory > (totalMemory * 0.1) && freeSpace > (totalSpace * 0.1);

        return HealthCheckResponse.named("System health check")
                .withData("freeMemory", freeMemory)
                .withData("totalMemory", totalMemory)
                .withData("maxMemory", maxMemory)
                .withData("freeDiskSpace", freeSpace)
                .withData("totalDiskSpace", totalSpace)
                .status(up)
                .build();
    }
}
