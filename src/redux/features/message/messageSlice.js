import { createSlice } from '@reduxjs/toolkit';
import { openChat } from './messageService';

const initialState = {
  loading: false,
  messages: [],
  chatId: '',
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(openChat.fulfilled, (state, { payload }) => {
        const { messages, chatId } = payload;

        state.messages = messages;
        state.chatId = chatId;
        state.loading = false;
      })
      .addMatcher(
        (action) => [openChat.pending.type].includes(action.type),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => [openChat.rejected.type].includes(action.type),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const { setUserMessage } = messageSlice.actions;

export const selectMessageLoading = (state) => state.messageReducer.loading;
export const selectChatId = (state) => state.messageReducer.chatId;
export const selectMessages = (state) => state.messageReducer.messages;

export default messageSlice.reducer;
