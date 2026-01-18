#!/bin/sh

echo "🚀 Starting all services..."

# Start Node server (serves frontend + Node APIs)
cd /app/node-server
PORT=5000 node server.js &
NODE_PID=$!
echo "✅ Node server started on port 5000 (PID: $NODE_PID)"

# Start Spring Boot server
cd /app/springboot-server
java -Xmx256m -Xms128m -Dserver.port=5001 -jar app.jar &
SPRING_PID=$!
echo "✅ Spring Boot server started on port 5001 (PID: $SPRING_PID)"

# Give services time to start
sleep 5

# Start Nginx in foreground
echo "✅ Starting Nginx on port 8080"
nginx -g 'daemon off;'