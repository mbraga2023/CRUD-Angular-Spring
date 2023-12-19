# Use Ubuntu as the base image for the build stage
FROM ubuntu:latest AS build

# Install necessary packages and dependencies
RUN apt-get update && apt-get install -y openjdk-17-jdk maven

# Set the working directory
WORKDIR /app

# Copy the entire content of the current directory to the container's working directory
COPY . .

# Build the application
RUN mvn clean install -DskipTests

# Use a smaller JDK slim image for the runtime stage
FROM openjdk:17-jdk-slim

# Expose the port your application uses
EXPOSE 8080

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file from the build stage to the runtime image
COPY --from=build /app/target/crud-spring-0.0.1-SNAPSHOT.jar app.jar

# Define the command to run your application
ENTRYPOINT ["java", "-jar", "app.jar"]
