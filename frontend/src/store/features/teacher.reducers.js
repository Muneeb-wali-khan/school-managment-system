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
  classDeleteStudentUrl,
  classTeachersOfClassUrl,
  classSubjectsUrl,
  classSubjectsCurriculumUrl,
  classStudentAttendance,
  classStudentAttendanceToday,
  classAbsentNotifyStudents,
  giveAssignmentsClass,
  allAssignmentsClass,
  updateAssignmentOfClassUrl,
  singleAssignmentClass,
} from "../urls";

// teacher details
export const profileTeacher = createAsyncThunk(
  "teacher/profile",
  async (data, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json"},withCredentials: true };
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
      const config = { headers: { "Content-Type": "application/json"},withCredentials: true };
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
      const config = { headers: { "Content-Type": "application/json"},withCredentials: true };
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
      const config = { headers: { "Content-Type": "multipart/form-data"},withCredentials: true };
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
    const config = { headers: { "Content-Type": "multipart/form-data"},withCredentials: true };
    const response = await axios.post(`${classAddStudentUrl}`,data, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})


// add student to class
export const UpdateStudentOfClass = createAsyncThunk("teacher/UpdateStudent", async ({id: id, data: data}, {rejectWithValue})=>{
  try {
    const config = { headers: { "Content-Type": "application/json"},withCredentials: true };
    const response = await axios.put(`${classUpdateStudentUrl}${id}`,data, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})


// add student to class
export const DeleteStudentOfClass = createAsyncThunk("teacher/DeleteStudent", async (id, {rejectWithValue})=>{
  try {
    const config = { headers: { "Content-Type": "application/json"},withCredentials: true };
    const response = await axios.delete(`${classDeleteStudentUrl}${id}`, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})


// all tecahers  of class
export const allTeachersOfClass = createAsyncThunk("teacher/allTeachersOfClass", async (data, {rejectWithValue})=>{
  try {
    const config = { headers: { "Content-Type": "application/json"},withCredentials: true };
    const response = await axios.get(`${classTeachersOfClassUrl}`, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})


// all subjects  of class
export const allSubjectsOfClass = createAsyncThunk("teacher/allSubjectsOfClass", async (data, {rejectWithValue})=>{
  try {
    const config = { headers: { "Content-Type": "application/json"},withCredentials: true };
    const response = await axios.get(`${classSubjectsUrl}`, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})


// ccurriculum of subject
export const curriculumOfSubjectsClass = createAsyncThunk("teacher/curriculumOfSubjectClass", async (id, {rejectWithValue})=>{
  try {
    const config = { headers: { "Content-Type": "application/json"},withCredentials: true };
    const response = await axios.get(`${classSubjectsCurriculumUrl}`, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})

// take attendence 
export const takeAttendance = createAsyncThunk("teacher/takeAttendance", async (data, {rejectWithValue})=>{
  try {
    const config = { headers: { "Content-Type": "application/json"},withCredentials: true };
    const response = await axios.post(`${classStudentAttendance}`,data, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})

//  attendence today 
export const showAttendanceToday = createAsyncThunk("teacher/showAttendanceToday", async (data, {rejectWithValue})=>{
  try {
    const config = { headers: { "Content-Type": "application/json"},withCredentials: true };
    const response = await axios.get(`${classStudentAttendanceToday}`, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})


//  notify absent students 
export const notifyAbsentStudents = createAsyncThunk("teacher/notifyAbsent", async (data, {rejectWithValue})=>{
  try {
    const config = { headers: { "Content-Type": "application/json"},withCredentials: true };
    const response = await axios.post(`${classAbsentNotifyStudents}`, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})


//  give assigments class 
export const createAssignmentsOfClass = createAsyncThunk("teacher/createAssigmentsClass", async (data, {rejectWithValue})=>{
  try {
    const config = { headers: { "Content-Type": "application/json"},withCredentials: true };
    const response = await axios.post(`${giveAssignmentsClass}`,data, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})



//  all assigments class 
export const allAssignmentsOfClass = createAsyncThunk("teacher/allAssigmentsClass", async (data, {rejectWithValue})=>{
  try {
    const config = { headers: { "Content-Type": "application/json"},withCredentials: true };
    const response = await axios.get(`${allAssignmentsClass}`, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})

//  single assigments class 
export const singleAssignmentOfClass = createAsyncThunk("teacher/singleAssigmentClass", async (id, {rejectWithValue})=>{
  try {
    const config = { headers: { "Content-Type": "application/json"},withCredentials: true };
    const response = await axios.get(`${singleAssignmentClass}${id}`, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})



//  update assigment class 
export const updateAssignmentOfClass = createAsyncThunk("teacher/updateAssigmentClass", async ({id:id, data: data}, {rejectWithValue})=>{
  try {
    const config = { headers: { "Content-Type": "application/json"},withCredentials: true };
    const response = await axios.put(`${updateAssignmentOfClassUrl}${id}`,data, config);
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
    msgTeacher: null,
    profileTeacher: null,
    allTeachersCl: null,
    allSubjectsCl: null,
    subjectCurriculum: null,
    allStudentsClass: null,
    classStudentDetails: null,
    attendanceToday: null,
    assigments: null,
    singleAssigment: null,
    msgAvatar: null,
    errAvatar: null,
    msgAddSt: null,
    errAddSt: null,
    msgUptSt: null,
    errUptSt: null,
    msgDelSt: null,
    errDelSt: null,
    errAttSt : null,
    msgAttSt : null,
    errorNotify : null,
    msgNotify : null,
    errorAssigment : null,
    msgAssigment : null
  },

  reducers: {
    clearErrorsTeacher(state) {
      state.errorTeacher = null;
      state.msgTeacher = null;
      state.msgAddSt = null;
      state.errAddSt = null;
      state.msgAvatar = null,
      state.errAvatar = null,
      state.msgUptSt = null,
      state.errUptSt = null
      state.msgDelSt = null,
      state.errDelSt = null
      state.errAttSt = null,
      state.msgAttSt = null,
      state.errorNotify = null,
      state.msgNotify = null,
      state.errorAssigment = null,
      state.msgAssigment = null

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

    // Delete student
    builder.addCase(DeleteStudentOfClass.pending, (state, action) => {
      state.loadingTeacher = true;
      state.errDelSt = null;
    });
    builder.addCase(DeleteStudentOfClass.fulfilled, (state, action) => {
      state.loadingTeacher = false;
      state.msgDelSt = action.payload?.message;
    });
    builder.addCase(DeleteStudentOfClass.rejected, (state, action) => {
      state.loadingTeacher = false;
      state.errDelSt = action.payload?.message;
    })

    // all teachers of class
    builder.addCase(allTeachersOfClass.pending, (state, action) => {
      state.loadingTeacher = true;
      state.errorTeacher = null;
    });
    builder.addCase(allTeachersOfClass.fulfilled, (state, action) => {
      state.loadingTeacher = false;
      state.allTeachersCl = action.payload?.data;
    });
    builder.addCase(allTeachersOfClass.rejected, (state, action) => {
      state.loadingTeacher = false;
      state.errorTeacher = action.payload?.message;
    })

    // all Subjects of class
    builder.addCase(allSubjectsOfClass.pending, (state, action) => {
      state.loadingTeacher = true;
      state.errorTeacher = null;
    });
    builder.addCase(allSubjectsOfClass.fulfilled, (state, action) => {
      state.loadingTeacher = false;
      state.allSubjectsCl = action.payload?.data;
    });
    builder.addCase(allSubjectsOfClass.rejected, (state, action) => {
      state.loadingTeacher = false;
      state.errorTeacher = action.payload?.message;
    })


    // curriculum of  Subject
    builder.addCase(curriculumOfSubjectsClass.pending, (state, action) => {
      state.loadingTeacher = true;
      state.errorTeacher = null;
    });
    builder.addCase(curriculumOfSubjectsClass.fulfilled, (state, action) => {
      state.loadingTeacher = false;
      state.subjectCurriculum = action.payload?.data;
    });
    builder.addCase(curriculumOfSubjectsClass.rejected, (state, action) => {
      state.loadingTeacher = false;
      state.errorTeacher = action.payload?.message;
    })

    // take attendance of class
    builder.addCase(takeAttendance.pending, (state, action) => {
      state.loadingTeacher = true;
      state.errAttSt = null;
    });
    builder.addCase(takeAttendance.fulfilled, (state, action) => {
      state.loadingTeacher = false;
      state.msgAttSt = action.payload?.message;
    });
    builder.addCase(takeAttendance.rejected, (state, action) => {
      state.loadingTeacher = false;
      state.errAttSt = action.payload?.message;
    })


    // show attendance of today if takened
    builder.addCase(showAttendanceToday.pending, (state, action) => {
      state.loadingTeacher = true;
      state.errorTeacher = null;
    });
    builder.addCase(showAttendanceToday.fulfilled, (state, action) => {
      state.loadingTeacher = false;
      state.attendanceToday = action.payload?.data;
    });
    builder.addCase(showAttendanceToday.rejected, (state, action) => {
      state.loadingTeacher = false;
      state.errorTeacher = action.payload?.message;
    })

    // notify absent students
    builder.addCase(notifyAbsentStudents.pending, (state, action) => {
      state.loadingTeacher = true;
      state.errorNotify = null;
    });
    builder.addCase(notifyAbsentStudents.fulfilled, (state, action) => {
      state.loadingTeacher = false;
      state.msgNotify = action.payload?.message;
    });
    builder.addCase(notifyAbsentStudents.rejected, (state, action) => {
      state.loadingTeacher = false;
      state.errorNotify = action.payload?.message;
    })

    // give assigment to class
    builder.addCase(createAssignmentsOfClass.pending, (state, action) => {
      state.loadingTeacher = true;
      state.errorAssigment = null;
    });
    builder.addCase(createAssignmentsOfClass.fulfilled, (state, action) => {
      state.loadingTeacher = false;
      state.msgAssigment = action.payload?.message;
    });
    builder.addCase(createAssignmentsOfClass.rejected, (state, action) => {
      state.loadingTeacher = false;
      state.errorAssigment = action.payload?.message;
    })

    // all assigments of class
    builder.addCase(allAssignmentsOfClass.pending, (state, action) => {
      state.loadingTeacher = true;
      state.errorTeacher = null;
    });
    builder.addCase(allAssignmentsOfClass.fulfilled, (state, action) => {
      state.loadingTeacher = false;
      state.assigments = action.payload?.data;
    });
    builder.addCase(allAssignmentsOfClass.rejected, (state, action) => {
      state.loadingTeacher = false;
      state.errorTeacher = action.payload?.message;
    })

    // // single assigment of class
    builder.addCase(singleAssignmentOfClass.pending, (state, action) => {
      state.loadingTeacher = true;
      state.errorAssigment = null;
    });
    builder.addCase(singleAssignmentOfClass.fulfilled, (state, action) => {
      state.loadingTeacher = false;
      state.singleAssigment = action.payload?.data;
    });
    builder.addCase(singleAssignmentOfClass.rejected, (state, action) => {
      state.loadingTeacher = false;
      state.errorAssigment = action.payload?.message;
    })

    // update assigment of class
    builder.addCase(updateAssignmentOfClass.pending, (state, action) => {
      state.loadingTeacher = true;
      state.errorAssigment = null;
    });
    builder.addCase(updateAssignmentOfClass.fulfilled, (state, action) => {
      state.loadingTeacher = false;
      state.msgAssigment = action.payload?.message;
    });
    builder.addCase(updateAssignmentOfClass.rejected, (state, action) => {
      state.loadingTeacher = false;
      state.errorAssigment = action.payload?.message;
    })


  },
});

export const { clearErrorsTeacher } = teacherSlice.actions;

const teacherReducers = combineReducers({
  teacherD: teacherSlice.reducer,
});

export default teacherReducers;
