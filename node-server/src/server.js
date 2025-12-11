import express, { json } from 'express';
import socketService from './components/chat/socket.service.js';
import { mongoConnect } from './db/mongo/db_connect.js';
import { constants } from './constant.js';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import api from './routes/api.js';

const app = express();
const server = http.createServer(app);

app.use(json());
app.use(cookieParser());
app.use(cors({
  origin: constants.ORIGIN_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use('/v1', api);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const io = new Server(server, {
  cors: {
    origin: constants.ORIGIN_URL,
    methods: ['GET', 'POST'],
    credentials: true
  },
  path: "/v1/socket.io"
});
socketService(io);
mongoConnect();

server.listen(constants.PORT, () => {
  console.log(`Server is running on port ${constants.PORT}`);
});
