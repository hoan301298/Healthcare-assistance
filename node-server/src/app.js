import express, { json } from 'express';
import { constants } from './constant.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import api from './routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(morgan('combined'));
app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.set("trust proxy", 1);

app.use(cors({
  origin: constants.ORIGIN_URL,
  credentials: true
}));

app.use('/v1', api);

if (constants.NODE_ENV === 'prod') {
  const buildPath = path.join(__dirname, '..', 'public');
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

export default app;