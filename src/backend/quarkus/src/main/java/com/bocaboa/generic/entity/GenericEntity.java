package com.nsync.generic.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

/**
 * An abstract base class for all entities in the application.
 * <p>
 * This class provides a generic identifier (ID) field that is automatically generated.
 * It extends {@link PanacheEntityBase}, offering convenience methods for database operations.
 * Entities that extend this class inherit the ID field and its mapping configuration.
 * </p>
 *
 * <p>
 * Classes extending this class must be annotated with {@code @Entity} or similar, as this class
 * itself is annotated with {@link MappedSuperclass}, which means it is not a complete entity
 * by itself and will not be mapped to a database table. Instead, it is designed to be extended
 * by other entity classes, which will inherit its properties and mappings.
 * </p>
 *
 * @author mauroDasChagas
 */
@MappedSuperclass
public abstract class GenericEntity extends PanacheEntityBase {

    /**
     * The unique identifier for each entity.
     * <p>
     * This ID is automatically generated and used as the primary key for the entity.
     * </p>
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
}
