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

export const bookSchedule = createAsyncThunk(
  'profile/book',
  async ({ sheduleId, actualDate }, thunkAPI) => {
    try {
      await axios.post('/api/profile/book', { sheduleId, actualDate });
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const rescheduleVisit = createAsyncThunk(
  'profile/reschedule',
  async ({ visitId, newSheduleId, newDate }, thunkAPI) => {
    try {
      await axios.put('/api/profile/reschedule', {
        visitId,
        newSheduleId,
        newDate,
      });
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
