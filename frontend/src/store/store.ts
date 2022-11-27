import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import messageReducer from './messageSlice';

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messageReducer,
  },
});
