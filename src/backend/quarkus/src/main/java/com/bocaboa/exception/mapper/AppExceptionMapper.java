package com.nsync.exception.mapper;

import com.nsync.exception.AppException;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

/**
 * Maps {@link AppException} to an HTTP response.
 * <p>
 * This class implements {@link ExceptionMapper} to handle exceptions of type {@link AppException}
 * and convert them into a structured HTTP response.
 * </p>
 *
 * <p><b>Provider Annotation:</b> The {@code @Provider} annotation indicates that this class is
 * a JAX-RS provider that will be automatically discovered and registered by the JAX-RS runtime.
 * This allows the application to globally handle exceptions of type {@link AppException} and
 * return a consistent JSON response to the client.</p>
 *
 * @author mauroDasChagas
 */
@Provider
public class AppExceptionMapper implements ExceptionMapper<AppException> {

    /**
     * Converts an {@link AppException} into a {@link Response} object.
     * The response will include the HTTP status code and a JSON body with the error message.
     *
     * @param exception the {@code AppException} that was thrown
     * @return a {@code Response} object with the appropriate HTTP status and error message
     */
    @Override
    public Response toResponse(AppException exception) {
        return Response.status(exception.getStatusCode())
                .entity(new ErrorResponse(exception.getMessage()))
                .type(MediaType.APPLICATION_JSON)
                .build();
    }

    /**
     * Represents the structure of the error response returned to the client.
     * Contains only a message field that describes the error.
     */
    public static class ErrorResponse {
        private String message;

        /**
         * Default constructor.
         */
        public ErrorResponse() {}

        /**
         * Constructs an {@code ErrorResponse} with the specified message.
         *
         * @param message the error message
         */
        public ErrorResponse(String message) {
            this.message = message;
        }

        /**
         * Retrieves the error message.
         *
         * @return the error message
         */
        public String getMessage() {
            return message;
        }

        /**
         * Sets the error message.
         *
         * @param message the error message to set
         */
        public void setMessage(String message) {
            this.message = message;
        }
    }
}
