import {
  createSlice,
  createAsyncThunk,
  combineReducers,
} from "@reduxjs/toolkit";
import axios from "axios";
import {
  allStudentsClassUrl,
  profileUrlTeacher,
  classStudentDetailsUrl,
  classAddStudentUrl,
  classStudentUpdateAvatarUrl,
  classUpdateStudentUrl,
} from "../urls";

// teacher details
export const profileTeacher = createAsyncThunk(
  "teacher/profile",
  async (data, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await axios.get(`${profileUrlTeacher}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// class students
export const allStudentsClass = createAsyncThunk(
  "teacher/classStudents",
  async (data, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await axios.get(`${allStudentsClassUrl}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// class student details
export const classStudentDetail = createAsyncThunk(
  "teacher/classStudent",
  async (id, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await axios.get(
        `${classStudentDetailsUrl}${id}`,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);


// class student update avatar
export const classStudentUpdateAvatar = createAsyncThunk(
  "teacher/classStudentUpdateAvatar",
  async ({id: id, data: data}, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const response = await axios.put(
        `${classStudentUpdateAvatarUrl}${id}`,
        data,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);


// add student to class
export const addStudentToClass = createAsyncThunk("teacher/addStudent", async (data, {rejectWithValue})=>{
  try {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const response = await axios.post(`${classAddStudentUrl}`,data, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})


// add student to class
export const UpdateStudentOfClass = createAsyncThunk("teacher/UpdateStudent", async (data, {rejectWithValue})=>{
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const response = await axios.put(`${classUpdateStudentUrl}`,data, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})


const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    loadingTeacher: false,
    errorTeacher: null,
    profileTeacher: null,
    allStudentsClass: null,
    classStudentDetails: null,
    msgAvatar: null,
    errAvatar: null,
    msgAddSt: null,
    errAddSt: null,
    msgUptSt: null,
    errUptSt: null,
  },

  reducers: {
    clearErrorsTeacher(state) {
      state.errorTeacher = null;
      state.msgAddSt = null;
      state.errAddSt = null;
      state.msgAvatar = null,
      state.errAvatar = null,
      state.msgUptSt = null,
      state.errUptSt = null

    },
  },

  // profile teacher
  extraReducers: (builder) => {
    builder.addCase(profileTeacher.pending, (state, action) => {
      state.loadingTeacher = true;
      state.errorTeacher = null;
    });
    builder.addCase(profileTeacher.fulfilled, (state, action) => {
      state.loadingTeacher = false;
      state.profileTeacher = action.payload?.data;
    });
    builder.addCase(profileTeacher.rejected, (state, action) => {
      state.loadingTeacher = false;
      state.errorTeacher = action.payload?.message;
    });

    // all students class
    builder.addCase(allStudentsClass.pending, (state, action) => {
      state.loadingTeacher = true;
      state.errorTeacher = null;
    });
    builder.addCase(allStudentsClass.fulfilled, (state, action) => {
      state.loadingTeacher = false;
      state.allStudentsClass = action.payload?.data;
    });
    builder.addCase(allStudentsClass.rejected, (state, action) => {
      state.loadingTeacher = false;
      state.errorTeacher = action.payload?.message;
    });

    // class student details
    builder.addCase(classStudentDetail.pending, (state, action) => {
      state.loadingTeacher = true;
      state.errorTeacher = null;
    });
    builder.addCase(classStudentDetail.fulfilled, (state, action) => {
      state.loadingTeacher = false;
      state.classStudentDetails = action.payload?.data;
    });
    builder.addCase(classStudentDetail.rejected, (state, action) => {
      state.loadingTeacher = false;
      state.errorTeacher = action.payload?.message;
    });

    // update avatar student
    builder.addCase(classStudentUpdateAvatar.pending, (state, action) => {
      state.loadingTeacher = true;
      state.errAvatar = null;
    });
    builder.addCase(classStudentUpdateAvatar.fulfilled, (state, action) => {
      state.loadingTeacher = false;
      state.msgAvatar = action.payload?.message;
    });
    builder.addCase(classStudentUpdateAvatar.rejected, (state, action) => {
      state.loadingTeacher = false;
      state.errAvatar = action.payload?.message;
    });

    // add student
    builder.addCase(addStudentToClass.pending, (state, action) => {
      state.loadingTeacher = true;
      state.errorTeacher = null;
    });
    builder.addCase(addStudentToClass.fulfilled, (state, action) => {
      state.loadingTeacher = false;
      state.msgAddSt = action.payload?.message;
    });
    builder.addCase(addStudentToClass.rejected, (state, action) => {
      state.loadingTeacher = false;
      state.errAddSt = action.payload?.message;
    })


    // Update student
    builder.addCase(UpdateStudentOfClass.pending, (state, action) => {
      state.loadingTeacher = true;
      state.errUptSt = null;
    });
    builder.addCase(UpdateStudentOfClass.fulfilled, (state, action) => {
      state.loadingTeacher = false;
      state.msgUptSt = action.payload?.message;
    });
    builder.addCase(UpdateStudentOfClass.rejected, (state, action) => {
      state.loadingTeacher = false;
      state.errUptSt = action.payload?.message;
    })


  },
});

export const { clearErrorsTeacher } = teacherSlice.actions;

const teacherReducers = combineReducers({
  teacherD: teacherSlice.reducer,
});

export default teacherReducers;
