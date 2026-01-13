FROM node:20-alpine AS builder

# Frontend build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci

COPY client ./
RUN npm run build

# Production image
FROM node:20-alpine

WORKDIR /app/node-server

COPY node-server/package*.json ./
RUN npm ci --omit=dev

COPY node-server ./
COPY --from=builder /app/client/dist ./public

ENV NODE_ENV=prod
EXPOSE 8080

CMD ["node", "server.js"]