import { mongoConnect } from './db/mongo/db_connect.js';
import { constants } from './constant.js';
import { Server } from 'socket.io';
import socketGateway from '../src/components/chat/socket.gateway.js';
import http from 'http';
import app from './app.js';

const server = http.createServer(app);
const PORT = constants.PORT || 5000;

async function startServer() {
  try {
    await mongoConnect();

    const io = new Server(server, {
      cors: {
        origin: constants.ORIGIN_URL,
        methods: ['GET', 'POST'],
        credentials: true
      },
      path: "/v1/socket.io"
    });

    socketGateway(io);

    server.listen(PORT, () => {
      console.log(`Server is running on port ${constants.PORT}`);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

if (constants.NODE_ENV !== 'prod') {
  startServer();
}

export default app;