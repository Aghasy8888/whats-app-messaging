import { createSlice } from '@reduxjs/toolkit';
import { login } from './userService';
import { LOGIN_SUCCESS_MESSAGE } from '../../../../constants';
import { saveWhatsAppId, saveWhatsAppUserInfo } from '../../../helpers/auth';

const initialState = {
  isAuthenticated: null,
  loading: false,
  whatsAppId: null,
  idInstance: '',
  apiTokenInstance: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserAuth(state, { payload }) {
      state.isAuthenticated = payload;
    },
    setUserInfo(state, { payload: { apiTokenInstance, idInstance } }) {      
      state.apiTokenInstance = apiTokenInstance;
      state.idInstance = idInstance;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        const {
          res: { wid },
          data,
        } = payload;
        const { idInstance, apiTokenInstance } = data;

        state.whatsAppId = wid;
        state.successMessage = LOGIN_SUCCESS_MESSAGE;
        state.isAuthenticated = true;
        state.idInstance = idInstance;
        state.apiTokenInstance = apiTokenInstance;
        state.loading = false;
        saveWhatsAppId(wid);
        saveWhatsAppUserInfo(data);
      })
      .addMatcher(
        (action) => [login.pending.type].includes(action.type),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => [login.rejected.type].includes(action.type),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const { setUserAuth, setUserInfo } = authSlice.actions;

export const selectAuthLoading = (state) => state.authReducer.loading;
export const selectAuthError = (state) => state.authReducer.errorMessage;
export const selectWhatsAppId = (state) => state.authReducer.whatsAppId;
export const selectIsAuthenticated = (state) =>
  state.authReducer.isAuthenticated;
export const selectIdInstance = (state) => state.authReducer.idInstance;
export const selectApiTokenInstance = (state) =>
  state.authReducer.apiTokenInstance;

export default authSlice.reducer;
