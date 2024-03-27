import {
  createSlice,
  createAsyncThunk,
  combineReducers,
} from "@reduxjs/toolkit";
import axios from "axios";
import { StudentAttendanceUrl, profileUrlStudent } from "../urls";

// student details
export const profileStudent = createAsyncThunk("student/profile",async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const response = await axios.get(`${profileUrlStudent}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// student attendance record
export const studentAttendanceRecords = createAsyncThunk("studentAttendances",async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const response = await axios.get(`${StudentAttendanceUrl}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState: {
    profileStudent: null,
    attendanceRecords: null,
    errorStudent: null,
    loadingStudent: false,
    msgStudent: null,
  },

  reducers: {
    clearErrorsStudent(state) {
      state.errorStudent = null;
      state.msgStudent = null;
    },
  },

  // profile student
  extraReducers: (builder) => {
    builder.addCase(profileStudent.pending, (state, action) => {
      state.loadingStudent = true;
      state.errorStudent = null;
    });
    builder.addCase(profileStudent.fulfilled, (state, action) => {
      state.loadingStudent = false;
      state.profileStudent = action.payload?.data;
    });
    builder.addCase(profileStudent.rejected, (state, action) => {
      state.loadingStudent = false;
      state.errorStudent = action.payload?.message;
    });


    // student attendances records
    builder.addCase(studentAttendanceRecords.pending, (state, action) => {
      state.loadingStudent = true;
      state.errorStudent = null;
    });
    builder.addCase(studentAttendanceRecords.fulfilled, (state, action) => {
      state.loadingStudent = false;
      state.attendanceRecords = action.payload?.data;
    });
    builder.addCase(studentAttendanceRecords.rejected, (state, action) => {
      state.loadingStudent = false;
      state.errorStudent = action.payload?.message;
    });







  },




});



export const { clearErrorsStudent } = studentSlice.actions;

const studentReducers = combineReducers({
  studentD: studentSlice.reducer,
});

export default studentReducers;