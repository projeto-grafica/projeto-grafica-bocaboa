package com.nsync.exception.custom;

import com.nsync.exception.AppException;
import jakarta.ws.rs.core.Response;

/**
 * Exception thrown to indicate that a bad request was made by the client.
 * <p>
 * This exception extends {@link AppException} and sets the HTTP status code to {@link Response.Status#BAD_REQUEST}
 * (400). It is used to signal errors related to invalid client input or requests that cannot be processed due to
 * client-side issues.
 * </p>
 *
 * <p><b>Constructor:</b></p>
 * <ul>
 *     <li>{@link #BadRequestException(String message)} - Constructs a new {@code BadRequestException} with the
 *     specified detail message. The HTTP status code is automatically set to 400 (Bad Request).</li>
 * </ul>
 *
 * @author mauroDasChagas
 */
public class BadRequestException extends AppException {

    /**
     * Constructs a new {@code BadRequestException} with the specified detail message.
     * The HTTP status code is set to 400 (Bad Request).
     *
     * @param message the detail message explaining the cause of the exception
     */
    public BadRequestException(String message) {
        super(message, Response.Status.BAD_REQUEST.getStatusCode());
    }
}
