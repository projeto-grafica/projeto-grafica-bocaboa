package com.bocaboa;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.RestAssured;
import org.junit.jupiter.api.Test;

import static org.hamcrest.Matchers.is;

@QuarkusTest
public class BocaBoaHelloTest {

    @Test
    public void testHelloEndpoint() {
        RestAssured.given()
                .when().get("/hello")
                .then()
                    .statusCode(200)
                    .body(is("Hello, BocaBoa! \uD83D\uDC4B"));
    }
}
