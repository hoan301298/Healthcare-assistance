import express from 'express';
import profileRouter from '../components/profile/profile.router.js';
import placesRouter from '../components/location/places.router.js';
import chatRouter from '../components/chat/chat.router.js';

const api = express();

api.use('/chat', chatRouter);
api.use('/places', placesRouter);
api.use('/auth', profileRouter);

export default api;
