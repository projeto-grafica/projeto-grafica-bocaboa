package com.nsync.exception.custom;

import com.nsync.exception.AppException;
import jakarta.ws.rs.core.Response;

/**
 * Exception thrown to indicate that a requested entity was not found.
 * <p>
 * This exception extends {@link AppException} and sets the HTTP status code to {@link Response.Status#NOT_FOUND}
 * (404). It is used to signal that the requested resource or entity could not be found in the server.
 * </p>
 *
 * <p><b>Constructor:</b></p>
 * <ul>
 *     <li>{@link #EntityNotFoundException(String message)} - Constructs a new {@code EntityNotFoundException} with
 *     the specified detail message. The HTTP status code is automatically set to 404 (Not Found).</li>
 * </ul>
 *
 * @author mauroDasChagas
 */
public class EntityNotFoundException extends AppException {

    /**
     * Constructs a new {@code EntityNotFoundException} with the specified detail message.
     * The HTTP status code is set to 404 (Not Found).
     *
     * @param message the detail message explaining the cause of the exception
     */
    public EntityNotFoundException(String message) {
        super(message, Response.Status.NOT_FOUND.getStatusCode());
    }
}
