import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: "",
  reducers: {
    addAuth: (state, action: PayloadAction<{ jwt: string }>) =>
      action.payload.jwt,
    clearAuth: () => "",
  },
});

export const { addAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
