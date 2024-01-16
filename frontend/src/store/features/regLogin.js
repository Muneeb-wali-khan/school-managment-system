import {createSlice, createAsyncThunk, combineReducers} from "@reduxjs/toolkit"
import axios from "axios"



export const register = createAsyncThunk("auth/register",async(data,{rejectWithValue})=>{
    try {
        const config = { headers: { "Content-Type": "multipart/form-data" } };

    } catch (error) {
        
    }
})

export const login = createAsyncThunk("auth/login",async(data,{rejectWithValue})=>{
    try {
        
    } catch (error) {
        
    }
})


const userAuthorizationSlice = createSlice({
    name:"auth",
    initialState:{
        register:{},
        login:{
            isLogin:false,
        },

    }
})


const authReducers = combineReducers({
    userAuth: userAuthorizationSlice.reducer,
})

export default authReducers