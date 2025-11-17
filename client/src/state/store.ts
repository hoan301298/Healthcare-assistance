import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import bookingReducer from './bookingSlice';
import appointmentReducer from './appointmentSlice';
import messagesReducer from './messagesSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    booking: bookingReducer,
    appointment: appointmentReducer,
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;