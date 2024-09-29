package com.nsync.generic.utils;

import java.lang.reflect.Field;

/**
 * Utility class for updating properties of an object.
 *
 * <p>This class provides a method to update the properties of a target object with values from a source object
 * of the same type. Fields named "id" are excluded from being updated.</p>
 *
 * @author mauroDasChagas
 */
public class Updatable {

    /**
     * Updates the non-null properties of the target object with the values from the source object.
     *
     * <p>This method iterates over the fields of the target object's class and updates each field with the corresponding
     * value from the source object, provided that the value is non-null and the field is not named "id".</p>
     *
     * <p>If a field cannot be accessed or modified due to access restrictions, this method throws a {@link RuntimeException}
     * wrapping the underlying {@link IllegalAccessException}.</p>
     *
     * @param <T>    the type of the objects being updated
     * @param target the object whose properties will be updated
     * @param source the object containing the new values to be set on the target
     *
     * @throws RuntimeException if any field in the target object cannot be updated due to access restrictions
     */
    public static <T> void updateProperties(T target, T source) {
        Field[] fields = target.getClass().getDeclaredFields();
        for (Field field : fields) {
            if (!field.getName().equals("id")) {
                field.setAccessible(true);
                try {
                    Object newValue = field.get(source);
                    if (newValue != null) {
                        field.set(target, newValue);
                    }
                } catch (IllegalAccessException e) {
                    throw new RuntimeException("The field could not be updated: " + field.getName(), e);
                }
            }
        }
    }
}