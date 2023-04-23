package kth.SocialNetwork_VertX;

import io.jsonwebtoken.Jwts;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Promise;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.http.HttpServerOptions;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.Json;
import io.vertx.core.net.PemKeyCertOptions;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.CorsHandler;
import io.vertx.mysqlclient.MySQLConnectOptions;
import io.vertx.mysqlclient.MySQLPool;
import io.vertx.sqlclient.PoolOptions;
import io.vertx.sqlclient.Row;

import java.util.ArrayList;
import java.util.List;

public class DbVerticle extends AbstractVerticle {

  private MySQLPool pool;

  @Override
  public void start(Promise<Void> startPromise) {
    System.out.println("Starting main verticle");
    MySQLConnectOptions connectOptions = new MySQLConnectOptions()
      .setPort(3307)
      .setHost("host.docker.internal")
      .setDatabase("socialnetwork_vertx")
      .setUser("root")
      .setPassword("root");
    PoolOptions poolOptions = new PoolOptions().setMaxSize(5);

    pool = MySQLPool.pool(vertx, connectOptions, poolOptions);

    Router router = Router.router(vertx);
    router.route().handler(BodyHandler.create());
    router.route().handler(CorsHandler.create("*")
      .allowedMethod(HttpMethod.GET)
      .allowedMethod(HttpMethod.POST)
      .allowedMethod(HttpMethod.OPTIONS)
      .allowedHeader("Authorization")
      .allowedHeader("userEmail")
      .allowedHeader("X-PINGARUNER")
      .allowedHeader("Content-Type"));

    router.get("/getAllWeekplans").handler(this::getAllWeekplan);
    router.post("/addWeekplan").handler(this::addWeekplan);

    System.out.println("Starting http Server");
    vertx.createHttpServer(new HttpServerOptions()
        .setSsl(true)
        .removeEnabledSecureTransportProtocol("TLSv1.3")
        .addEnabledSecureTransportProtocol("TLSv1.2")
        .setPemKeyCertOptions(new PemKeyCertOptions()
          .addCertPath("src/main/resources/keystore/cert.pem")
          .addKeyPath("src/main/resources/keystore/key.pem")
        )
      )
      .requestHandler(router)
      .listen(8080);
  }

  private void getAllWeekplan(RoutingContext routingContext) {
    System.out.println("Get all Weekplans");
    String authHeader = routingContext.request().headers().get("Authorization");
    String userEmailtoken = routingContext.request().headers().get("userEmail");
    if (authHeader != null) {
      final String token = authHeader.substring(7);
      String userEmailToken = getUserNameFromJwtToken(token);
      if (userEmailtoken.equals(userEmailToken)) {
        pool
          .query("SELECT * FROM weekplan_t")
          .execute()
          .onFailure(e -> {
            HttpServerResponse responseError = routingContext.response();
            responseError.setStatusCode(201).end();
            System.out.println("Failure with the fetch from DB");
          })
          .onSuccess(rows -> {
            List<Weekplan> getAllList = new ArrayList<>();
            for (Row row : rows) {
              int weekplanID = row.getInteger("weekplanID");
              String userEmail = row.getString("userEmail");
              String createdDate = row.getString("createdDate");

              int mondayHours = row.getInteger("mondayHours");
              int thuesdayHours = row.getInteger("thuesdayHours");
              int wednesdayHours = row.getInteger("wednesdayHours");
              int thursdayHours = row.getInteger("thursdayHours");
              int fridayHours = row.getInteger("fridayHours");
              int saturdayHours = row.getInteger("saturdayHours");
              int sundayHours = row.getInteger("sundayHours");
              String chart = row.getString("chart");
              getAllList.add(new Weekplan(weekplanID, userEmail, createdDate, mondayHours, thuesdayHours, wednesdayHours, thursdayHours, fridayHours, saturdayHours, sundayHours, chart));
            }
            HttpServerResponse responseSucceded = routingContext.response();
            responseSucceded.putHeader("Content-Type", "application/json")
              .putHeader("content-type", "application/json")
              .putHeader("Access-Control-Allow-Origin", "*")
              .putHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
              .end(Json.encodePrettily(getAllList));

            System.out.println("Succeeded to get all weekplan");
          });
      } else {
        System.out.println("Token or the userEmail is invalid/incorrect");
        HttpServerResponse response = routingContext.response();
        response.setStatusCode(400).end();
      }
    } else {
      System.out.println("The Authorization header is null");
      HttpServerResponse response = routingContext.response();
      response.setStatusCode(400).end();
    }
  }

  private void addWeekplan(RoutingContext routingContext) {
    String authHeader = routingContext.request().headers().get("Authorization");
    String userEmailtoken = routingContext.request().headers().get("userEmail");
    if (authHeader != null) {
      final String token = authHeader.substring(7);
      String userEmailToken = getUserNameFromJwtToken(token);
      if (userEmailtoken.equals(userEmailToken)) {
        Weekplan weekplan = Json.decodeValue(routingContext.getBodyAsString(), Weekplan.class);
        String sql = "INSERT INTO socialnetwork_vertx.weekplan_t (userEmail, createdDate, mondayHours, thuesdayHours, wednesdayHours, thursdayHours, fridayHours, saturdayHours, sundayHours,chart)" +
          " VALUES ('" + weekplan.getUserEmail() + "','" + weekplan.getCurrentTime() + "','" + weekplan.getMonday() + "','" + weekplan.getTuesday() + "','" + weekplan.getWednesday() + "','" + weekplan.getThursday() + "','" + weekplan.getFriday() + "','" + weekplan.getSaturday() + "','" + weekplan.getSunday() + "','" + weekplan.getChart() + "')";
        pool
          .query(sql)
          .execute()
          .onFailure(e -> {
            System.out.println("Failure to add a new Weekplan ");
            HttpServerResponse response = routingContext.response();
            response.setStatusCode(400).end();
          })
          .onSuccess(rows -> {
            System.out.println("Succeeded to add a new Weekplan");
            HttpServerResponse response = routingContext.response();
            response.setStatusCode(200).end();
          });
      }
      else {
        System.out.println("Token or the userEmail is invalid/incorrect");
        HttpServerResponse response = routingContext.response();
        response.setStatusCode(400).end();
      }
    }
    else {
      System.out.println("The Authorization header is null");
      HttpServerResponse response = routingContext.response();
      response.setStatusCode(400).end();
    }
  }

  public String getUserNameFromJwtToken(String token) {
    return Jwts.parser().setSigningKey("serverutvecklingSecretKey").parseClaimsJws(token).getBody().getSubject();
  }
}
