import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import bookingReducer from './bookingSlice';
import appointmentReducer from './appointmentSlice';
import supportReducer from './supportSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    booking: bookingReducer,
    appointment: appointmentReducer,
    support: supportReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;