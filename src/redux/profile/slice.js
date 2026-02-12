import { createSlice } from '@reduxjs/toolkit';
import { fetchProfileSubscriptions, fetchProfileSchedules, rescheduleVisit } from './operations';

const initialState = {
  subscriptions: [],
  schedules: [],
  isLoadingSubscriptions: false,
  isLoadingSchedules: false,
  errorSubscriptions: null,
  errorSchedules: null,
  isRescheduling: false,
  errorReschedule: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileSubscriptions.pending, (state) => {
        state.isLoadingSubscriptions = true;
        state.errorSubscriptions = null;
      })
      .addCase(fetchProfileSubscriptions.fulfilled, (state, action) => {
        state.subscriptions = action.payload;
        state.isLoadingSubscriptions = false;
      })
      .addCase(fetchProfileSubscriptions.rejected, (state, action) => {
        state.errorSubscriptions = action.payload;
        state.isLoadingSubscriptions = false;
      })
      .addCase(fetchProfileSchedules.pending, (state) => {
        state.isLoadingSchedules = true;
        state.errorSchedules = null;
      })
      .addCase(fetchProfileSchedules.fulfilled, (state, action) => {
        state.schedules = action.payload;
        state.isLoadingSchedules = false;
      })
      .addCase(fetchProfileSchedules.rejected, (state, action) => {
        state.errorSchedules = action.payload;
        state.isLoadingSchedules = false;
      })
      .addCase(rescheduleVisit.pending, (state) => {
        state.isRescheduling = true;
        state.errorReschedule = null;
      })
      .addCase(rescheduleVisit.fulfilled, (state) => {
        state.isRescheduling = false;
        state.errorReschedule = null;
      })
      .addCase(rescheduleVisit.rejected, (state, action) => {
        state.isRescheduling = false;
        state.errorReschedule = action.payload;
      });
  },
});

export const profileReducer = profileSlice.reducer;
