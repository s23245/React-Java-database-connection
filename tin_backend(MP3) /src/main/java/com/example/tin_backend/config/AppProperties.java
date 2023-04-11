package com.example.tin_backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "app")
public class AppProperties
{
    private String jwtSecret;
    private long jwtExpirationInMs;

    private String jwtHeader;

    private String jwtTokenPrefix;

    public String getJwtHeader() {
        return jwtHeader;
    }

    public void setJwtHeader(String jwtHeader) {
        this.jwtHeader = jwtHeader;
    }

    public String getJwtTokenPrefix() {
        return jwtTokenPrefix;
    }

    public void setJwtTokenPrefix(String jwtTokenPrefix) {
        this.jwtTokenPrefix = jwtTokenPrefix;
    }

    public String getJwtSecret() {
        return jwtSecret;
    }

    public void setJwtSecret(String jwtSecret) {
        this.jwtSecret = jwtSecret;
    }

    public long getJwtExpirationInMs() {
        return jwtExpirationInMs;
    }

    public void setJwtExpirationInMs(long jwtExpirationInMs) {
        this.jwtExpirationInMs = jwtExpirationInMs;
    }
}
