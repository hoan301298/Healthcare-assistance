import express, { json } from 'express';
import routes from './routes/route.js';
import chatComponent from './components/chatbox/chatComponent.js';
import { mongoConnect } from './components/mongo/db_connect.js';
import { constants } from './constant.js';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: constants.ORIGIN_URL,
    methods: ['GET', 'POST'],
  }
});

app.use(json());
app.use(cors({
  origin: constants.ORIGIN_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use('/v1', routes);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

chatComponent(io);
mongoConnect();

server.listen(constants.PORT, () => {
  console.log(`Server is running on port ${constants.PORT}`);
});
