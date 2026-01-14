import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:5231';

export const fetchDances = createAsyncThunk(
    'dances/fetchAll',
    async(_, thunkApi)=>{
        try{
const response = await axios.get('/api/school/dances');
console.log('Dances from API - full response:', response);
console.log('Dances from API - data:', response.data);
return response.data;
        }catch(error){
            console.error('Error fetching dances:', error);
            console.error('Error details:', error.response?.data || error.message);
            throw error;
        }
    }
)

export const fetchTrainerByDance = createAsyncThunk(
    'trainer/fetchByDance',
    async(_, thunkApi)=>{
        try{

        }catch(error){
            throw error;
        }
    }
)