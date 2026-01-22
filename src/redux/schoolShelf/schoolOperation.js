import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:5231';

export const fetchDances = createAsyncThunk(
    'dances/fetchAllDances',
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

export const fetchTrainersByDance = createAsyncThunk(
    'trainer/fetchTrainers',
    async(todoId, thunkApi)=>{
        try{
const response = await axios.get(`/api/school/trainer/${todoId}`);

return response.data;
        }catch(error){
            throw error;
        }
    }
)

export const fetchShedulesByTrainer = createAsyncThunk(
    'shedule/fetchShedules',
    async(trainerId, thunkApi)=>{
        try{
const response = await axios.get(`/api/school/shedule/${trainerId}`);
console.log(response);
return response.data;
        }catch(error){
            throw error;
        }
    }
)