import {
  createSlice,
  createAsyncThunk,
  combineReducers,
} from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const response = await axios.post("/api/v1/users/register", data, config);

      console.log(response.data);
        return response.data

    } catch (error) {
       return rejectWithValue(error?.response?.data)
    }
  }
);



// export const login = createAsyncThunk("auth/login",async(data,{rejectWithValue})=>{
//     try {

//     } catch (error) {

//     }
// })

const userAuthorizationSlice = createSlice({
  name: "auth",
  initialState: {
    loadingAuth: false,
    errorAuth: null,
    msgAuth: null,
  },

  reducers: {
    clearErrorsAuth(state) {
      state.errorAuth = null,
      state.msgAuth = null
    },
  },

  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.loadingAuth = true;
      state.errorAuth = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loadingAuth = false;
      state.msgAuth = action.payload?.message;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loadingAuth = false;
      state.errorAuth = action.payload?.message;
      state.msgAuth = null;
    });
  },
});

export const { clearErrorsAuth } = userAuthorizationSlice.actions;

const authReducers = combineReducers({
  userAuth: userAuthorizationSlice.reducer,
});

export default authReducers;
