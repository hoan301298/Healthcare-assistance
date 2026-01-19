# ---------- Frontend build ----------
FROM node:20-alpine AS frontend

ARG VITE_GEOCODE_URL
ARG VITE_MAP_API_KEY

WORKDIR /app
COPY client/package*.json ./
RUN npm ci
COPY client .

ENV VITE_GEOCODE_URL=$VITE_GEOCODE_URL
ENV VITE_MAP_API_KEY=$VITE_MAP_API_KEY

RUN npm run build

# ---------- Node server deps ----------
FROM node:20-alpine AS nodeserver
WORKDIR /app
COPY node-server/package*.json ./
RUN npm ci --omit=dev
COPY node-server .
COPY --from=frontend /app/dist ./public

# ---------- Spring Boot build ----------
FROM maven:3.8.1-openjdk-17 AS springboot
WORKDIR /app
COPY springboot-server/pom.xml .
RUN mvn -q -B dependency:go-offline
COPY springboot-server/src ./src
RUN mvn clean package -DskipTests

# ---------- Runtime ----------
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Install Node.js and Nginx
RUN apk add --no-cache nodejs npm nginx

# Copy Node server with frontend
COPY --from=nodeserver /app ./node-server

# Copy Spring Boot jar
COPY --from=springboot /app/target/*.jar ./springboot-server/app.jar

# Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Startup script
COPY start.sh .
RUN sed -i 's/\r$//' start.sh && chmod +x start.sh

EXPOSE 8080

CMD ["./start.sh"]