import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: "",
  reducers: {
    addAuth: (state, action: PayloadAction<{ jwt: string }>) =>
      action.payload.jwt,
  },
});

export const { addAuth } = authSlice.actions;
export default authSlice.reducer;
