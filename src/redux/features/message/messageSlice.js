import { createSlice } from '@reduxjs/toolkit';
import { openChat, receiveMessages, sendMessage } from './messageService';

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
      .addCase(sendMessage.fulfilled, (state, { payload }) => {
        const currentTimestamp = Math.floor(Date.now() / 1000);

        const message = {
          ...payload,          
          timestamp: currentTimestamp,
        };

        state.messages.push(message);
        state.loading = false;
      })
      .addCase(receiveMessages.fulfilled, (state, { payload }) => {
        if (!payload) return;
        const { messageReceived } = payload;

        if (
          !messageReceived.senderData ||
          messageReceived.senderData.chatId !== state.chatId
        ) {
          return;
        }

        const message = {
          ...messageReceived.senderData,
          ...messageReceived,
        };
        message.textMessage =
          messageReceived.messageData.textMessageData.textMessage;
        message.typeMessage =
          messageReceived.messageData.textMessageData.typeMessage;
        message.senderId = true;

        state.messages.push(message);
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
