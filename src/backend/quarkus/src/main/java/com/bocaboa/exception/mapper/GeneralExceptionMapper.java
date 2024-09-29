package com.nsync.exception.mapper;

import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

/**
 * Global exception mapper to handle all uncaught exceptions.
 * <p>
 * This class implements {@link ExceptionMapper} to handle any uncaught exceptions of type {@link Throwable}
 * that occur in the application. It converts these exceptions into a standardized HTTP response.
 * </p>
 *
 * <p><b>Provider Annotation:</b> The {@code @Provider} annotation signifies that this class is a JAX-RS provider.
 * As a result, it is automatically discovered and registered by the JAX-RS runtime. The {@code GeneralExceptionMapper}
 * handles all uncaught exceptions globally within the application, ensuring that clients receive a consistent
 * error response even in the event of unexpected errors.</p>
 *
 * @author mauroDasChagas
 */
@Provider
public class GeneralExceptionMapper implements ExceptionMapper<Throwable> {

    /**
     * Converts any uncaught {@link Throwable} into a {@link Response} object.
     * The response includes an HTTP 500 status code and a JSON body with a generic error message.
     *
     * @param exception the uncaught exception
     * @return a {@code Response} object with HTTP 500 status and a generic error message
     */
    @Override
    public Response toResponse(Throwable exception) {
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity(new AppExceptionMapper.ErrorResponse("An unexpected error occurred: " + exception.getMessage()))
                .type(MediaType.APPLICATION_JSON)
                .build();
    }
}
