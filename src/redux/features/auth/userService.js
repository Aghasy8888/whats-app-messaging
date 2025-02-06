import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginRequest } from '../../../helpers/auth';

export const login = createAsyncThunk(
  'auth/login',
  async ({ data }, { rejectWithValue }) => {
    try {
      const res = await loginRequest(data);
        
      return { res, data };
    } catch (error) {
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);
