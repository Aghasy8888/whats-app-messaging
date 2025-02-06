import { createSlice } from '@reduxjs/toolkit';
import { login } from '../auth/userService';
import { openChat, receiveMessages } from '../message/messageService';

const initialState = {
  test: '',
  errorMessage: null,
  successMessage: null,
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setSuccessMessage(state, { payload }) {
      state.errorMessage = null;
      state.successMessage = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state) => {
        state.errorMessage = null;
        state.successMessage = 'Вход выполнен успешно';
      })
      .addMatcher(
        (action) =>
          [
            login.rejected.type,
            openChat.rejected.type,
            receiveMessages.rejected.type,
          ].includes(action.type),
        (state, { payload: { errorMessage } }) => {
          state.loading = false;
          state.successMessage = null;
          state.errorMessage = errorMessage;
        }
      );
  },
});

export const { setSuccessMessage } = generalSlice.actions;

export const selectTest = (state) => state.generalReducer.test;
export const selectErrorMessage = (state) => state.generalReducer.errorMessage;
export const selectSuccessMessage = (state) =>
  state.generalReducer.successMessage;

export default generalSlice.reducer;
