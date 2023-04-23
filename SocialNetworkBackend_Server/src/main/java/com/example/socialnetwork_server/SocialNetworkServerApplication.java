package com.example.socialnetwork_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class SocialNetworkServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(SocialNetworkServerApplication.class, args);
    }

}
