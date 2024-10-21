package com.bocaboa.resource;

import com.bocaboa.entity.Sticker;
import com.bocaboa.generic.resource.GenericResource;
import jakarta.ws.rs.Path;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("/stickers")
@Tag(name = "\uD83C\uDFF7\uFE0F Sticker Resource", description = "Operations related to stickers")
public class StickerResource extends GenericResource<Sticker> {

    public StickerResource() {
        super(Sticker.class);
    }
}
