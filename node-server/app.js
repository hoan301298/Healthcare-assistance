import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import api from './src/routes/api.js';
import { constants } from './src/constant.js';

const app = express();

app.use(morgan('combined'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("trust proxy", 1);

app.use(cors({
  origin: constants.NODE_ENV === "prod" ? true : constants.ORIGIN_URL,
  credentials: true
}));

app.use('/v1', api);

if (constants.NODE_ENV === "prod") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const publicPath = path.join(__dirname, 'public');

  app.use(express.static(publicPath));
  app.get('*', (_req, res) => {
    res.setHeader("Cache-Control", "no-store, must-revalidate");
    return res.sendFile(path.join(publicPath, 'index.html'));
  });
}

export default app;