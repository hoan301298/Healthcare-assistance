import express from 'express';
import profileRouter from '../components/profile/profile.router.js';
import placesRouter from '../components/location/places.router.js';
import chatRouter from '../components/chat/chat.router.js';
import appointmentRouter from '../components/appointment/appointment.router.js';

const api = express();

api.use('/chat', chatRouter);
api.use('/places', placesRouter);
api.use('/profile', profileRouter);
api.use('/appointments', appointmentRouter);

export default api;
