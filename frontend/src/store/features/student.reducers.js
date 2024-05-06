import {
  createSlice,
  createAsyncThunk,
  combineReducers,
} from "@reduxjs/toolkit";
import axios from "axios";
import { SingleStudentNotificationsUrl, StudentAssigmentsUrl, StudentAttendanceUrl, StudentsNotificationsUrl, profileUrlStudent } from "../urls";

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
export const studentAttendanceRecords = createAsyncThunk("student/studentAttendances",async (data, { rejectWithValue }) => {
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

// student class assigments
export const studentClassAssignments = createAsyncThunk("student/studentAssiments",async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const response = await axios.get(`${StudentAssigmentsUrl}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Students class Notifications ❌
export const studentClassNotifications = createAsyncThunk("student/studentClassNotifications",async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const response = await axios.get(`${StudentsNotificationsUrl}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// single student class Notifications ❌
export const singleStudentNotifications = createAsyncThunk("student/singleStudentNotifications",async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const response = await axios.get(`${SingleStudentNotificationsUrl}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState: {
    loadingStudentProfile: false,
    loadingStAttendances: false,
    loadingStAssigments: false,
    loadingNotify: false,
    profileStudent: null,
    attendanceRecords: null,
    errorStudent: null,
    msgStudent: null,
    assigments: null,
    stClsNotifications: null,
    singleStNotifications: null
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
      state.loadingStudentProfile = true;
      state.errorStudent = null;
    });
    builder.addCase(profileStudent.fulfilled, (state, action) => {
      state.loadingStudentProfile = false;
      state.profileStudent = action.payload?.data;
    });
    builder.addCase(profileStudent.rejected, (state, action) => {
      state.loadingStudentProfile = false;
      state.errorStudent = action.payload?.message;
    });


    // student attendances records
    builder.addCase(studentAttendanceRecords.pending, (state, action) => {
      state.loadingStAttendances = true;
      state.errorStudent = null;
    });
    builder.addCase(studentAttendanceRecords.fulfilled, (state, action) => {
      state.loadingStAttendances = false;
      state.attendanceRecords = action.payload?.data;
    });
    builder.addCase(studentAttendanceRecords.rejected, (state, action) => {
      state.loadingStAttendances = false;
      state.errorStudent = action.payload?.message;
    });


    // student Assigments class
    builder.addCase(studentClassAssignments.pending, (state, action) => {
      state.loadingStAssigments = true;
      state.errorStudent = null;
    });
    builder.addCase(studentClassAssignments.fulfilled, (state, action) => {
      state.loadingStAssigments = false;
      state.assigments = action.payload?.data;
    });
    builder.addCase(studentClassAssignments.rejected, (state, action) => {
      state.loadingStAssigments = false;
      state.errorStudent = action.payload?.message;
    });


    // students Notifications class
    builder.addCase(studentClassNotifications.pending, (state, action) => {
      state.loadingNotify = true;
      state.errorStudent = null;
    });
    builder.addCase(studentClassNotifications.fulfilled, (state, action) => {
      state.loadingNotify = false;
      state.stClsNotifications = action.payload?.data;
    });
    builder.addCase(studentClassNotifications.rejected, (state, action) => {
      state.loadingNotify = false;
      state.errorStudent = action.payload?.message;
    });

    // single student Notification
    builder.addCase(singleStudentNotifications.pending, (state, action) => {
      state.loadingNotify = true;
      state.errorStudent = null;
    });
    builder.addCase(singleStudentNotifications.fulfilled, (state, action) => {
      state.loadingNotify = false;
      state.singleStNotifications = action.payload?.data;
    });
    builder.addCase(singleStudentNotifications.rejected, (state, action) => {
      state.loadingNotify = false;
      state.errorStudent = action.payload?.message;
    });



  },




});



export const { clearErrorsStudent } = studentSlice.actions;

const studentReducers = combineReducers({
  studentD: studentSlice.reducer,
});

export default studentReducers;