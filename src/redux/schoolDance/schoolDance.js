import { createSlice } from "@reduxjs/toolkit";
import { fetchDances } from "../schoolShelf/schoolOperation";

export const schoolSlice = createSlice({
    name:"schoolDance",
    initialState:{
        dances: [],
    trainers: [],
    schedule: [],
        isLoading:false,
        error:null
    },
    reducers: {

  },
  extraReducers:builder=>{
    builder
    .addCase(
        fetchDances.pending,
    state=>{
        state.isLoading=true
    }
    )
   .addCase(
        fetchDances.rejected,
    (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        }
    )
    .addCase(
        fetchDances.fulfilled,
     (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.dances = action.payload;
      })
  }
})


export default schoolSlice.reducer;