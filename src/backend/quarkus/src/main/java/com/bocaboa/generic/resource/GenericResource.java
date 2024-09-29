package com.nsync.generic.resource;

import com.nsync.exception.custom.BadRequestException;
import com.nsync.exception.custom.EntityNotFoundException;
import com.nsync.generic.entity.GenericEntity;
import com.nsync.generic.utils.Updatable;
import io.quarkus.cache.CacheInvalidate;
import io.quarkus.cache.CacheResult;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;

import java.util.List;

/**
 * A generic RESTful resource providing CRUD operations for entities.
 * <p>
 * This abstract class offers basic Create, Read, Update, and Delete (CRUD) functionality
 * for any entity that extends {@link GenericEntity}. The operations are mapped to standard
 * HTTP methods (GET, POST, PUT, DELETE) and support JSON input/output.
 * </p>
 *
 * <p>
 * Subclasses should provide the specific entity class type, allowing the generic methods
 * to work with any entity type in the application. This resource is designed to be extended
 * by specific resource classes that define the paths and any additional operations needed.
 * </p>
 *
 * @param <T> the type of the entity, which must extend {@link GenericEntity}
 *
 * @author mauroDasChagas
 */
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public abstract class GenericResource<T extends GenericEntity> {

    /**
     * The class type of the entity managed by this resource.
     */
    private final Class<T> entityClass;

    /**
     * The {@link EntityManager} instance used to interact with the persistence context.
     */
    @Inject
    public EntityManager entityManager;

    /**
     * Constructs a new {@code GenericResource} for the specified entity class.
     *
     * @param entityClass the class type of the entity managed by this resource
     */
    public GenericResource(final Class<T> entityClass) {
        this.entityClass = entityClass;
    }

    /**
     * Retrieves all entities of the specified type.
     *
     * @return a list of all entities
     */
    @GET
    @Operation(summary = "Get all entities", description = "Returns a list of all entities.")
    @APIResponses(value = {
            @APIResponse(responseCode = "200", description = "List of entities returned successfully."),
            @APIResponse(responseCode = "500", description = "Internal server error.")
    })
    @CacheResult(cacheName = "entities-cache")
    public List<T> getAll(
            @QueryParam("page") @DefaultValue("0") int page,
            @QueryParam("size") @DefaultValue("10") int size
    ) {
        return entityManager.createQuery("FROM " + entityClass.getSimpleName(), entityClass)
                .setFirstResult(page * size)
                .setMaxResults(size)
                .getResultList();
    }

    /**
     * Retrieves a specific entity by its ID.
     *
     * @param id the ID of the entity to retrieve
     * @return the found entity
     * @throws EntityNotFoundException if the entity with the specified ID does not exist
     */
    @GET
    @Path("{id}")
    @Operation(summary = "Get an entity by ID", description = "Returns the entity corresponding to the provided ID.")
    @APIResponses(value = {
            @APIResponse(responseCode = "200", description = "Entity found."),
            @APIResponse(responseCode = "404", description = "Entity not found.")
    })
    public T get(@PathParam("id") Long id) {
        T entity = entityManager.find(entityClass, id);
        if (entity == null) {
            throw new EntityNotFoundException("Entity with id " + id + " does not exist.");
        }
        return entity;
    }

    /**
     * Creates a new entity.
     *
     * @param entity the entity to create
     * @return a response with the created entity
     * @throws BadRequestException if the provided entity is null or invalid
     */
    @POST
    @Transactional
    @Operation(summary = "Create a new entity", description = "Creates a new entity.")
    @APIResponses(value = {
            @APIResponse(responseCode = "201", description = "Entity created successfully."),
            @APIResponse(responseCode = "400", description = "Error in entity creation.")
    })
    @CacheInvalidate(cacheName = "entities-cache")
    public Response create(T entity) {
        if (entity == null) {
            throw new BadRequestException("The provided entity is empty or invalid.");
        }
        // entity.id = null;
        entityManager.persist(entity);
        return Response.status(Response.Status.CREATED).entity(entity).build();
    }

    /**
     * Updates an existing entity.
     *
     * @param id the ID of the entity to update
     * @param entity the updated entity data
     * @return a response with the updated entity
     * @throws EntityNotFoundException if the entity with the specified ID does not exist
     * @throws BadRequestException if the provided entity is null or invalid
     */
    @PUT
    @Path("{id}")
    @Transactional
    @Operation(summary = "Update an existing entity", description = "Updates the entity corresponding to the provided ID.")
    @APIResponses(value = {
            @APIResponse(responseCode = "200", description = "Entity updated successfully."),
            @APIResponse(responseCode = "404", description = "Entity not found.")
    })
    @CacheInvalidate(cacheName = "entities-cache")
    public Response update(@PathParam("id") Long id, T entity) {
        T existingEntity = entityManager.find(entityClass, id);
        if (existingEntity == null) {
            throw new EntityNotFoundException("Entity with id " + id + " does not exist.");
        }
        if (entity == null) {
            throw new BadRequestException("The provided entity is empty or invalid.");
        }
        updateEntity(existingEntity, entity);
        entityManager.merge(existingEntity);
        return Response.ok(existingEntity).build();
    }

    /**
     * Deletes an entity by its ID.
     *
     * @param id the ID of the entity to delete
     * @return a response indicating the outcome
     * @throws EntityNotFoundException if the entity with the specified ID does not exist
     */
    @DELETE
    @Path("{id}")
    @Transactional
    @Operation(summary = "Delete an entity", description = "Deletes the entity corresponding to the provided ID.")
    @APIResponses(value = {
            @APIResponse(responseCode = "204", description = "Entity deleted successfully."),
            @APIResponse(responseCode = "404", description = "Entity not found.")
    })
    public Response delete(@PathParam("id") Long id) {
        T entity = entityManager.find(entityClass, id);
        if (entity == null) {
            throw new EntityNotFoundException("Entity with id " + id + " does not exist.");
        }
        entityManager.remove(entity);
        return Response.noContent().build();
    }

    /**
     * Updates the properties of an existing entity with those from a new entity.
     * <p>
     * This method is intended to be overridden by subclasses if specific update logic is required.
     * </p>
     *
     * @param existingEntity the entity to be updated
     * @param newEntity the entity containing the new data
     */
    protected void updateEntity(T existingEntity, T newEntity) {
        Updatable.updateProperties(existingEntity, newEntity);
    }
}