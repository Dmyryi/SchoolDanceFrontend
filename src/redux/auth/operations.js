import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5231';

const setAuthHeader = token =>{
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

const clearAuthHeader = ()=>{
    axios.defaults.headers.common.Authorization = '';
    localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
}



export const register = createAsyncThunk(
    'auth/register',
    async(credential, thunkAPI)=>{
        try{
const res = await axios.post('/api/auth/register', credential);

setAuthHeader(res.data.tokens.accessToken);
return res.data;
        }catch(error){
  const errorMessage =
        error.response?.data?.message || 'An error occurred during login';

      alert(errorMessage);
      return thunkAPI.rejectWithValue(error.message);
        }
    }
)



export const logIn = createAsyncThunk(
    'auth/logIn',
    async(credential, thunkAPI)=>{
        try{
const res = await axios.post('/api/auth/login', credential);
        setAuthHeader(res.data.tokens.accessToken);
        return res.data;
        }catch(error){
 const errorMessage =
        error.response?.data?.message || 'An error occurred during login';

      alert(errorMessage);
      alert(error.message.request);
      return thunkAPI.rejectWithValue(error.message);
        }
        
    }
)

export const logOut = createAsyncThunk(
  'auth/logOut',
  async (_, thunkAPI) => {
     try {
      const refreshToken = localStorage.getItem('refreshToken');

      
      await axios.post('/api/auth/logout', { refreshToken });
  
    clearAuthHeader();
    
  } catch (error) {
    clearAuthHeader();
    return thunkAPI.rejectWithValue(error.message);
  }
  });


export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    // Reading the token from the state via getState()
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      // If there is no token, exit without performing any request
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      // If there is a token, add it to the HTTP header and perform the request
      setAuthHeader(persistedToken);
      const res = await axios.get('/api/profile/me');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);