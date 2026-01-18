import { mongoConnect } from './src/db/mongo/db_connect.js';
import { constants } from './src/constant.js';
import { Server } from 'socket.io';
import socketGateway from './src/components/chat/socket.gateway.js';
import http from 'http';
import app from './app.js';

const server = http.createServer(app);
const PORT = constants.PORT || 5000;

async function startServer() {
  try {
    await mongoConnect();

    const io = new Server(server, {
      path: "/v1/socket.io",
      cors: {
        origin: constants.NODE_ENV === "prod" ? true : constants.ORIGIN_URL,
        methods: ['GET', 'POST'],
        credentials: true
      },
    });

    socketGateway(io);

    server.listen(PORT, '0.0.0.0', () => {
      console.log(`Express server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();