package com.example.socialnetwork_messageservice.security;

import com.example.socialnetwork_messageservice.security.jwt.JwtFilter;
import jakarta.servlet.FilterRegistration;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {
    @Bean
    public FilterRegistrationBean jwtFilter(){
        FilterRegistrationBean filter= new FilterRegistrationBean();
        filter.setFilter(new JwtFilter());

//        provide endpoints which needs to be restricted.
//        All Endpoints would be restricted if unspecified
        //filter.addUrlPatterns("/api/message/**");
        return filter;
    }
}
