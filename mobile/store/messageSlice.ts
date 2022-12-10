import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage } from "../types/";

const messagesSlice = createSlice({
  name: "messages",
  initialState: [] as IMessage[],
  reducers: {
    getAllMessages: (state, action: PayloadAction<IMessage[]>) =>
      action.payload,
    addOneMessage: (state, action: PayloadAction<IMessage>) => [
      action.payload,
      ...state,
    ],
  },
});

export const { getAllMessages, addOneMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
