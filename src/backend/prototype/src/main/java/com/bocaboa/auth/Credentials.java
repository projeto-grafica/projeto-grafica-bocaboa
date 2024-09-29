package com.bocaboa.auth;

import jakarta.validation.constraints.NotBlank;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

public class Credentials {
    @NotBlank
    @Schema(required = true, example = "username_example")
    public String username;

    @NotBlank
    @Schema(required = true, example = "password_example")
    public String password;
}
