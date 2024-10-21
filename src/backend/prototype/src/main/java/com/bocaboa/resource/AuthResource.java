package com.bocaboa.resource;

import com.bocaboa.auth.AuthService;
import com.bocaboa.auth.Credentials;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.Map;

@Path("/auth")
public class AuthResource {

    @Inject
    AuthService authService;

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response login(Credentials credentials) {
        String username = credentials.username;
        String password = credentials.password;

        return authService.login(username, password)
                .map(token -> Response.ok()
                        .header("Authorization", "Bearer " + token)
                        .build())
                .orElse(Response.status(Response.Status.UNAUTHORIZED).build());
    }
}
