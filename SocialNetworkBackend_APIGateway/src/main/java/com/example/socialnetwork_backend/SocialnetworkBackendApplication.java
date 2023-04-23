package com.example.socialnetwork_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

//API Gateway
@SpringBootApplication
@EnableEurekaClient
public class SocialnetworkBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(SocialnetworkBackendApplication.class, args);
    }

}
