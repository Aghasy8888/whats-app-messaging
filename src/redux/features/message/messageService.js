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

      console.log('historyMessages', historyMessages);

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

      console.log('response', response);

      return { chatId, idMessage: response.idMessage };
    } catch (error) {
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const receiveMessages = createAsyncThunk(
  'message/receiveMessages',
  async (
    { idInstance, apiTokenInstance },
    { rejectWithValue }
  ) => {
    try {
      const response = await request(
        `${apiUrl}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
      );

      console.log('response', response);

      return { response };
    } catch (error) {
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);
