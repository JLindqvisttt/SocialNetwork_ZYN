package com.example.socialnetwork_postservice.Jwt;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

  @Bean
  public FilterRegistrationBean jwtFilter() {
    FilterRegistrationBean filter= new FilterRegistrationBean();
    filter.setFilter(new JwtFilter());

//        provide endpoints which needs to be restricted.
//        All Endpoints would be restricted if unspecified
    //filter.addUrlPatterns("/api/post/**");
    return filter;
  }
}
