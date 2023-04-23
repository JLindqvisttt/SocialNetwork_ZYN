package com.example.socialnetwork_messageservice.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

public class JwtFilter extends GenericFilterBean {

    @Value("serverutvecklingSecretKey")
    private String secretKey;


    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        final HttpServletRequest request = (HttpServletRequest) servletRequest;
        final HttpServletResponse response = (HttpServletResponse) servletResponse;
        final String authHeader = request.getHeader("authorization");
        System.out.println("TOKEN" + authHeader);
        if ("OPTIONS".equals(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            filterChain.doFilter(request, response);
        } else {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                throw new ServletException("An exception occurred");
            }
            final String token = authHeader.substring(7);

            String userEmailToken = getUserNameFromJwtToken(token);
            String userEmailRequest = request.getHeader("userEmail");

            if(userEmailToken.equals(userEmailRequest)){

                Claims claims = Jwts.parser().setSigningKey("serverutvecklingSecretKey").parseClaimsJws(token).getBody();
                request.setAttribute("claims", claims);
                request.setAttribute("post", servletRequest.getParameter("id"));
                filterChain.doFilter(request, response);
            }
        }
    }
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey("serverutvecklingSecretKey").parseClaimsJws(token).getBody().getSubject();
    }

}