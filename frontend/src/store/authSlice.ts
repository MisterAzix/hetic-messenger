import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: '',
  reducers: {
    addAuth(state = '', action) {
      return action.payload.jwt;
    },
  },
});

export const { addAuth } = authSlice.actions;
export default authSlice.reducer;
