FROM maven:3.8.1-openjdk-17 AS build

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package

FROM openjdk:17-jdk

WORKDIR /app

COPY --from=build /app/target/*.jar server-0.0.1-SNAPSHOT.jar

EXPOSE 8080

CMD ["java", "-jar", "server-0.0.1-SNAPSHOT.jar"]