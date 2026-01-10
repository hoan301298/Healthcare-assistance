# Stage 1: build
FROM maven:3.8.1-openjdk-17 AS build

WORKDIR /app

COPY pom.xml . 
RUN mvn dependency:go-offline -B

COPY src ./src

RUN mvn clean package -DskipTests

FROM openjdk:17-ea-5-jdk-alpine

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -jar /app/app.jar --server.port=$PORT"]