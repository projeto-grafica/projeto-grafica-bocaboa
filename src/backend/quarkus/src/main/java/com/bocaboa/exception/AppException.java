package com.nsync.exception;

/**
 * Represents a custom application exception that extends {@link RuntimeException}.
 * This exception includes an HTTP status code that can be used to represent the type of error.
 * <p>
 * It is typically used to signal application-specific issues with a corresponding HTTP status code.
 * </p>
 *
 * @author mauroDasChagas
 */
public class AppException extends RuntimeException {

    private final int statusCode;

    /**
     * Constructs a new {@code AppException} with the specified detail message and status code.
     *
     * @param message the detail message
     * @param statusCode the HTTP status code associated with this exception
     */
    public AppException(String message, int statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

    /**
     * Retrieves the HTTP status code associated with this exception.
     *
     * @return the HTTP status code
     */
    public int getStatusCode() {
        return this.statusCode;
    }
}
