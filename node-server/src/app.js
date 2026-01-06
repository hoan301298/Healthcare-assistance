import express, { json } from 'express';
import { constants } from './constant.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import api from './routes/api.js';

const app = express();

app.use(morgan('dev'));
app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.set("trust proxy", 1);

app.use(cors({
  origin: constants.NODE_ENV === "prod" ? true : constants.ORIGIN_URL,
  credentials: true
}));

app.use('/', api);

if (constants.NODE_ENV === 'dev'){
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const publicPath = path.join(__dirname, '..', 'public');
  app.use(express.static(publicPath));

  app.get('*', (req, res) => {
    if (req.path.startsWith('/v1')) {
      return res.status(404).json({ error: 'API endpoint not found' });
    }

    // Send index.html for all frontend routes
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}

export default app;