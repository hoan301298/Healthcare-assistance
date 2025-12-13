import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import bookingReducer from './bookingSlice';
import appointmentReducer from './appointmentSlice';
import chatReducer from './chatSlice';
import authReducer from './auth/authSlice';
import authFormReducer from './auth/authFormSlice'

export const store = configureStore({
  reducer: {
    search: searchReducer,
    booking: bookingReducer,
    appointment: appointmentReducer,
    chat: chatReducer,
    auth: authReducer,
    authForm: authFormReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;