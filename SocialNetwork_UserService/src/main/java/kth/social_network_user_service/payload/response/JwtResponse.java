package kth.social_network_user_service.payload.response;

import java.util.List;

public class JwtResponse {
  private String token;
  private String type = "Bearer";
  private Long id;
  private String email;
  private String firstname;
  private String lastname;

  private List<String> roles;

  public JwtResponse(String accessToken, Long id, String email, String firstname, String lastname, List<String> roles) {
    this.token = accessToken;
    this.id = id;
    this.email = email;
    this.roles = roles;
    this.firstname = firstname;
    this.lastname = lastname;
  }

  public String getToken() {
    return token;
  }

  public String getType() {
    return type;
  }

  public String getFirstname() {
    return firstname;
  }

  public String getLastname() {
    return lastname;
  }

  public String getAccessToken() {
    return token;
  }

  public void setAccessToken(String accessToken) {
    this.token = accessToken;
  }

  public String getTokenType() {
    return type;
  }

  public void setTokenType(String tokenType) {
    this.type = tokenType;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public List<String> getRoles() {
    return roles;
  }
}
