package kth.SocialNetwork_VertX;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Promise;
import io.vertx.core.Vertx;

public class MainVerticle extends AbstractVerticle {
  public static void main(String[] args) {
    Vertx vertx = Vertx.vertx();
    System.out.println("Starting...");
    vertx.deployVerticle(new DbVerticle());
  }

  @Override
  public void start(Promise<Void> promise)
  {
    System.out.println("Welcome to vertx");
  }
  @Override
  public void stop(){
    System.out.println("Shutting down application");
  }
}
