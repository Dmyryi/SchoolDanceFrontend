import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5231';

export const fetchProfileSubscriptions = createAsyncThunk(
  'profile/fetchSubscriptions',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/api/profile/me/subscriptions');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchProfileSchedules = createAsyncThunk(
  'profile/fetchSchedules',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/api/profile/me/schedules');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
