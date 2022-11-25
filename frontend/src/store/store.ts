import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
