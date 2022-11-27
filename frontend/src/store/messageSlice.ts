import { createSlice } from '@reduxjs/toolkit';
import { IMessage } from '../types';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [] as IMessage[],
  reducers: {
    getAllMessages: (state, action) => action.payload,
    addOneMessage: (state, action) => [action.payload, ...state],
  },
});

export const { getAllMessages, addOneMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
