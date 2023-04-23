package com.example.socialnetwork_postservice.Jwt;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    CorsConfiguration corsConfiguration = new CorsConfiguration();
    corsConfiguration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Cache-Control","userEmail"));
    corsConfiguration.setAllowedOrigins(List.of("*"));
    corsConfiguration.setAllowedMethods(List.of("GET", "POST", "DELETE", "PUT", "OPTIONS", "PATCH"));
    corsConfiguration.setExposedHeaders(List.of("Authorization", "userEmail"));
    http.authorizeHttpRequests().requestMatchers("/**").permitAll().anyRequest()
      .authenticated().and().csrf().disable().cors().configurationSource(request -> corsConfiguration);
    return http.build();
  }
}
