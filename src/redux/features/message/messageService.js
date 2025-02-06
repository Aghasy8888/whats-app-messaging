import { createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../../helpers/request';
import { NUMBER_DOESN_EXIST } from '../../../../constants';
const apiUrl = import.meta.env.VITE_HIGH_BRIDGE_APP_API_URL;

export const openChat = createAsyncThunk(
  'message/openChat',
  async (
    { idInstance, apiTokenInstance, chatId, phoneNumber },
    { rejectWithValue }
  ) => {
    try {
      const response = await request(
        `${apiUrl}/waInstance${idInstance}/checkWhatsapp/${apiTokenInstance}`,
        'POST',
        {
          phoneNumber,
        }
      );

      if (!response.existsWhatsapp) {
        throw new Error(NUMBER_DOESN_EXIST);
      }

      const historyMessages = await request(
        `${apiUrl}/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
        'POST',
        { chatId }
      );

      return { chatId, messages: historyMessages };
    } catch (error) {
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const sendMessage = createAsyncThunk(
  'message/sendMessage',
  async (
    { idInstance, apiTokenInstance, chatId, message },
    { rejectWithValue }
  ) => {
    try {
      const response = await request(
        `${apiUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
        'POST',
        {
          chatId,
          message,
        }
      );

      return { chatId, textMessage: message, idMessage: response.idMessage };
    } catch (error) {
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const receiveMessages = createAsyncThunk(
  'message/receiveMessages',
  async ({ idInstance, apiTokenInstance, chatId }, { rejectWithValue }) => {
    try {
      const response = await request(
        `${apiUrl}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
      );

      if (!response) return null;

      const { receiptId, body } = response;
      const { senderData } = body;

      if (!senderData || senderData.chatId !== chatId) {
        return null;
      }

      await request(
        `${apiUrl}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
        'DELETE'
      );

      return { messageReceived: body };
    } catch (error) {
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);
