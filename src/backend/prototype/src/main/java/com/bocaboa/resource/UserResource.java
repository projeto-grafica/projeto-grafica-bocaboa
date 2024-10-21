package com.bocaboa.resource;

import com.bocaboa.entity.User;
import com.bocaboa.generic.resource.GenericResource;
import jakarta.ws.rs.Path;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("/users")
@Tag(name = "\uD83D\uDC64 User Resource", description = "Operations related to users")
public class UserResource extends GenericResource<User> {

    public UserResource() {
        super(User.class);
    }
}
