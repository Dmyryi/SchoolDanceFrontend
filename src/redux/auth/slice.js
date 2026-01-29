import { createSlice } from "@reduxjs/toolkit"
import { register, logIn,refreshUser } from "./operations";


const initialState ={
    user:[],
    token:null,
    isLoggedIn:false,
    isRefreshing:false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.tokens.accessToken;
      state.isLoggedIn = true;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.tokens.accessToken;
      state.isLoggedIn = true;
    });
    builder
  .addCase(refreshUser.pending, (state) => {
    state.isRefreshing = true;
  })
  .addCase(refreshUser.fulfilled, (state, action) => {
    state.user = action.payload; 
    state.isLoggedIn = true;
    state.isRefreshing = false;
  })
  .addCase(refreshUser.rejected, (state) => {
    state.isRefreshing = false;
    state.token = null;
  });
  },
  reducers: undefined
})


export const authReducer = authSlice.reducer;