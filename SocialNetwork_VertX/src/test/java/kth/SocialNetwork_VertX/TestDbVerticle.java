package kth.SocialNetwork_VertX;

import io.vertx.core.Vertx;
import io.vertx.junit5.VertxExtension;
import io.vertx.junit5.VertxTestContext;
import org.junit.jupiter.api.AfterEach;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;



@ExtendWith(VertxExtension.class)
public class TestDbVerticle {

  @BeforeEach
  void deploy_verticle(Vertx vertx, VertxTestContext testContext) {
    vertx.deployVerticle(new DbVerticle(), testContext.succeedingThenComplete());
  }

 /* @Test
  void verticle_deployed(Vertx vertx, VertxTestContext testContext) throws Throwable {
    Assertions.assertTrue("a".equals("a"));
    testContext.completeNow();
  }*/
  @AfterEach
  public void finish(Vertx vertx, VertxTestContext testContext) {
    System.out.println("after");
    vertx.close(testContext.succeeding(response -> {
      testContext.completeNow();
    }));
  }
}
