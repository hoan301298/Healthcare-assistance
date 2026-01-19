import express from 'express';
import placesRouter from '../components/location/places.router.js';
import chatRouter from '../components/chat/chat.router.js';
import appointmentRouter from '../components/appointment/appointment.router.js';
import authRouter from '../components/profile/auth/auth.router.js';
import userRouter from '../components/profile/user/user.router.js';

const api = express();

api.use('/chat', chatRouter);
api.use('/places', placesRouter);
api.use('/auth', authRouter);
api.use('/users', userRouter);
api.use('/appointments', appointmentRouter);

export default api;
