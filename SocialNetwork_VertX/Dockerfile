FROM openjdk:17
# Extend vert.x image
FROM vertx/vertx3

#                                                       (1)
ENV VERTICLE_NAME kth.SocialNetwork_VertX.MainVerticle
ENV VERTICLE_FILE target/SocialNetwork_VertX-1.0.0-SNAPSHOT.jar

# Set the location of the verticles
ENV VERTICLE_HOME /usr/verticles

EXPOSE 8080

# Copy your verticle to the container                   (2)
COPY $VERTICLE_FILE $VERTICLE_HOME/

# Launch the verticle
WORKDIR $VERTICLE_HOME
ENTRYPOINT ["sh", "-c"]
CMD ["exec vertx run $VERTICLE_NAME -cp $VERTICLE_HOME/*"]

