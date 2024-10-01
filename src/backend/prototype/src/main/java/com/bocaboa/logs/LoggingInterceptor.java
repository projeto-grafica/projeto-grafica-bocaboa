package com.bocaboa.logs;


import jakarta.interceptor.AroundInvoke;
import jakarta.interceptor.Interceptor;
import jakarta.interceptor.InvocationContext;

import java.util.logging.Logger;

@Log
@Interceptor
public class LoggingInterceptor {

    private static final Logger LOGGER = Logger.getLogger(String.valueOf(LoggingInterceptor.class));

    @AroundInvoke
    public Object logMethodInvocation(InvocationContext ctx) throws Exception {
        String className = ctx.getTarget().getClass().getName();
        String methodName = ctx.getMethod().getName();

        LOGGER.info("Entering method: " + className + "." + methodName);

        try {
            Object result = ctx.proceed();
            LOGGER.info("Exiting method: " + className + "." + methodName);
            return result;
        } catch (Exception e) {
            LOGGER.info("Error in method: " + className + "." + methodName);
            throw e;
        }
    }
}
