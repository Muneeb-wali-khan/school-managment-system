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
  deleteAssignmentOfClassUrl,
  allNotificationsForTeachersUrl,
  allNotificationsPersonalTeacherUrl,
  classAllNotificationsUrl,
  createAllNotificationsUrl,
  createSingleNotificationUrl,
  updateSingleNotificationUrl,
  deleteSingleNotificationUrl,
  SingleNotificationClassUrl,
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


// update student to class
export const UpdateStudentOfClass = createAsyncThunk("teacher/UpdateStudent", async ({id: id, data: data}, {rejectWithValue})=>{
  try {
    const config = { headers: { "Content-Type": "application/json"},withCredentials: true };
    const response = await axios.put(`${classUpdateStudentUrl}${id}`,data, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})


// delete student to class
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

//  delete assigment class 
export const removeAssignmentOfClass = createAsyncThunk("teacher/deleteAssigmentClass", async (id, {rejectWithValue})=>{
  try {
    const config = { headers: { "Content-Type": "application/json"},withCredentials: true };
    const response = await axios.delete(`${deleteAssignmentOfClassUrl}${id}`, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})

//  all notifications teachers 
export const allNotificationsTeachers = createAsyncThunk("teacher/notificationsTeachers", async (id, {rejectWithValue})=>{
  try {
    const config = { headers: { "Content-Type": "application/json"},withCredentials: true };
    const response = await axios.get(`${allNotificationsForTeachersUrl}`, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})


//  personal notifications teacher
export const personalNotificationsTeacher = createAsyncThunk("teacher/notificationsTeachersPersonal", async (id, {rejectWithValue})=>{
  try {
    const config = { headers: { "Content-Type": "application/json"},withCredentials: true };
    const response = await axios.get(`${allNotificationsPersonalTeacherUrl}`, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})


// all notifications of class 
export const allNotificationsClass = createAsyncThunk("teacher/notificationsClass", async (id, {rejectWithValue})=>{
  try {
    const config = { headers: { "Content-Type": "application/json"},withCredentials: true };
    const response = await axios.get(`${classAllNotificationsUrl}`, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})


// notify whole class students
export const notifyForAllClass = createAsyncThunk("teacher/notificationForClass", async (data, {rejectWithValue})=>{
  try {
    const config = { headers: { "Content-Type": "application/json"},withCredentials: true };
    const response = await axios.post(`${createAllNotificationsUrl}`,data, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})



// notify single student of class
export const singleNotificationForSt = createAsyncThunk("teacher/notificationsClassStudent", async (data, {rejectWithValue})=>{
  try {
    const config = { headers: { "Content-Type": "application/json"},withCredentials: true };
    const response = await axios.post(`${createSingleNotificationUrl}`,data, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})


// update notification of class 
export const updateNotificationClass = createAsyncThunk("teacher/updateNotificationsClass", async ({id: id, data:data}, {rejectWithValue})=>{
  try {
    const config = { headers: { "Content-Type": "application/json"},withCredentials: true };
    const response = await axios.put(`${updateSingleNotificationUrl}${id}`,data, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})


// single notification by id 
export const singleNotificationClass = createAsyncThunk("teacher/singleNotificationClass", async (id, {rejectWithValue})=>{
  try {
    const config = { headers: { "Content-Type": "application/json"},withCredentials: true };
    const response = await axios.get(`${SingleNotificationClassUrl}${id}`, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})

// remove notification of class 
export const removeNotificationClass = createAsyncThunk("teacher/removeNotificationsClass", async (id, {rejectWithValue})=>{
  try {
    const config = { headers: { "Content-Type": "application/json"},withCredentials: true };
    const response = await axios.delete(`${deleteSingleNotificationUrl}${id}`, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
})




const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    loadingTeachers: false,
    loadingProfileTeacher: false,
    loadingStudent: false,
    loadingNotify: false,
    loadingNotifications: false,
    loadingSubject: false,
    loadingAssigments: false,
    loadingAttendance: false,
    loadingAbsentNotify: false,
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
    msgAssigment : null,
    notificationsTeachers: null,
    personalNotifications: null,
    clsNotifications: null,
    singleNotification: null,
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
      state.loadingProfileTeacher = true;
      state.errorTeacher = null;
    });
    builder.addCase(profileTeacher.fulfilled, (state, action) => {
      state.loadingProfileTeacher = false;
      state.profileTeacher = action.payload?.data;
    });
    builder.addCase(profileTeacher.rejected, (state, action) => {
      state.loadingProfileTeacher = false;
      state.errorTeacher = action.payload?.message;
    });

    // all students class
    builder.addCase(allStudentsClass.pending, (state, action) => {
      state.loadingStudent = true;
      state.errorTeacher = null;
    });
    builder.addCase(allStudentsClass.fulfilled, (state, action) => {
      state.loadingStudent = false;
      state.allStudentsClass = action.payload?.data;
    });
    builder.addCase(allStudentsClass.rejected, (state, action) => {
      state.loadingStudent = false;
      state.errorTeacher = action.payload?.message;
    });

    // class student details
    builder.addCase(classStudentDetail.pending, (state, action) => {
      state.loadingStudent = true;
      state.errorTeacher = null;
    });
    builder.addCase(classStudentDetail.fulfilled, (state, action) => {
      state.loadingStudent = false;
      state.classStudentDetails = action.payload?.data;
    });
    builder.addCase(classStudentDetail.rejected, (state, action) => {
      state.loadingStudent = false;
      state.errorTeacher = action.payload?.message;
    });

    // update avatar student
    builder.addCase(classStudentUpdateAvatar.pending, (state, action) => {
      state.loadingStudent = true;
      state.errAvatar = null;
    });
    builder.addCase(classStudentUpdateAvatar.fulfilled, (state, action) => {
      state.loadingStudent = false;
      state.msgAvatar = action.payload?.message;
    });
    builder.addCase(classStudentUpdateAvatar.rejected, (state, action) => {
      state.loadingStudent = false;
      state.errAvatar = action.payload?.message;
    });

    // add student
    builder.addCase(addStudentToClass.pending, (state, action) => {
      state.loadingStudent = true;
      state.errorTeacher = null;
    });
    builder.addCase(addStudentToClass.fulfilled, (state, action) => {
      state.loadingStudent = false;
      state.msgAddSt = action.payload?.message;
      
      // Append the newly added student to the allStudentsClass array
      state.allStudentsClass?.[0].push(action.payload?.data);
    });
    
    builder.addCase(addStudentToClass.rejected, (state, action) => {
      state.loadingStudent = false;
      state.errAddSt = action.payload?.message;
    })


    // Update student
    builder.addCase(UpdateStudentOfClass.pending, (state, action) => {
      state.loadingStudent = true;
      state.errUptSt = null;
    });
    builder.addCase(UpdateStudentOfClass.fulfilled, (state, action) => {
      state.loadingStudent = false;
      state.msgUptSt = action.payload?.message;
      
      const updatedStudent = action.payload?.data;
      const updatedStudentIndex = state.allStudentsClass?.[0]?.findIndex(student => student._id === updatedStudent._id);
      
      if (updatedStudentIndex !== -1) {
        state.allStudentsClass[0][updatedStudentIndex] = updatedStudent;
      }
    });
    
    builder.addCase(UpdateStudentOfClass.rejected, (state, action) => {
      state.loadingStudent = false;
      state.errUptSt = action.payload?.message;
    })

    // Delete student
    builder.addCase(DeleteStudentOfClass.pending, (state, action) => {
      state.loadingStudent = true;
      state.errDelSt = null;
    });
    builder.addCase(DeleteStudentOfClass.fulfilled, (state, action) => {
      state.loadingStudent = false;
      state.msgDelSt = action.payload?.message;
      
      // Filter out the deleted student from the allStudentsClass array
      const filter  = state.allStudentsClass?.[0]?.filter(student => student?._id !== action.payload?.data?._id);
      state.allStudentsClass[0] = filter;
      
    });
    
    builder.addCase(DeleteStudentOfClass.rejected, (state, action) => {
      state.loadingStudent = false;
      state.errDelSt = action.payload?.message;
    })

    // all teachers of class
    builder.addCase(allTeachersOfClass.pending, (state, action) => {
      state.loadingTeachers = true;
      state.errorTeacher = null;
    });
    builder.addCase(allTeachersOfClass.fulfilled, (state, action) => {
      state.loadingTeachers = false;
      state.allTeachersCl = action.payload?.data;
    });
    builder.addCase(allTeachersOfClass.rejected, (state, action) => {
      state.loadingTeachers = false;
      state.errorTeacher = action.payload?.message;
    })

    // all Subjects of class
    builder.addCase(allSubjectsOfClass.pending, (state, action) => {
      state.loadingSubject = true;
      state.errorTeacher = null;
    });
    builder.addCase(allSubjectsOfClass.fulfilled, (state, action) => {
      state.loadingSubject = false;
      state.allSubjectsCl = action.payload?.data;
    });
    builder.addCase(allSubjectsOfClass.rejected, (state, action) => {
      state.loadingSubject = false;
      state.errorTeacher = action.payload?.message;
    })


    // curriculum of  Subject
    builder.addCase(curriculumOfSubjectsClass.pending, (state, action) => {
      state.loadingSubject = true;
      state.errorTeacher = null;
    });
    builder.addCase(curriculumOfSubjectsClass.fulfilled, (state, action) => {
      state.loadingSubject = false;
      state.subjectCurriculum = action.payload?.data;
    });
    builder.addCase(curriculumOfSubjectsClass.rejected, (state, action) => {
      state.loadingSubject = false;
      state.errorTeacher = action.payload?.message;
    })

    // take attendance of class
    builder.addCase(takeAttendance.pending, (state, action) => {
      state.loadingAttendance = true;
      state.errAttSt = null;
    });
    builder.addCase(takeAttendance.fulfilled, (state, action) => {
      state.loadingAttendance = false;
      state.msgAttSt = action.payload?.message;
      const data =  action.payload?.data
      if(data?.length > 0) {
        state.attendanceToday = data
      }
    });
    builder.addCase(takeAttendance.rejected, (state, action) => {
      state.loadingAttendance = false;
      state.errAttSt = action.payload?.message;
    })


    // show attendance of today if takened
    builder.addCase(showAttendanceToday.pending, (state, action) => {
      state.loadingAttendance = true;
      state.errorTeacher = null;
    });
    builder.addCase(showAttendanceToday.fulfilled, (state, action) => {
      state.loadingAttendance = false;
      state.attendanceToday = action.payload?.data;
    });
    builder.addCase(showAttendanceToday.rejected, (state, action) => {
      state.loadingAttendance = false;
      state.errorTeacher = action.payload?.message;
    })

    // notify absent students
    builder.addCase(notifyAbsentStudents.pending, (state, action) => {
      state.loadingTeachers = true;
      state.errorNotify = null;
    });
    builder.addCase(notifyAbsentStudents.fulfilled, (state, action) => {
      state.loadingTeachers = false;
      state.msgNotify = action.payload?.message;
    });
    builder.addCase(notifyAbsentStudents.rejected, (state, action) => {
      state.loadingTeachers = false;
      state.errorNotify = action.payload?.message;
    })

    // give assigment to class
    builder.addCase(createAssignmentsOfClass.pending, (state, action) => {
      state.loadingAssigments = true;
      state.errorAssigment = null;
    });
    builder.addCase(createAssignmentsOfClass.fulfilled, (state, action) => {
      state.loadingAssigments = false;
      state.msgAssigment = action.payload?.message;
      state.assigments?.push(action.payload?.data);
    });
    builder.addCase(createAssignmentsOfClass.rejected, (state, action) => {
      state.loadingAssigments = false;
      state.errorAssigment = action.payload?.message;
    })

    // all assigments of class
    builder.addCase(allAssignmentsOfClass.pending, (state, action) => {
      state.loadingAssigments = true;
      state.errorTeacher = null;
    });
    builder.addCase(allAssignmentsOfClass.fulfilled, (state, action) => {
      state.loadingAssigments = false;
      state.assigments = action.payload?.data;
    });
    builder.addCase(allAssignmentsOfClass.rejected, (state, action) => {
      state.loadingAssigments = false;
      state.errorTeacher = action.payload?.message;
    })

    // // single assigment of class
    builder.addCase(singleAssignmentOfClass.pending, (state, action) => {
      state.loadingAssigments = true;
      state.errorAssigment = null;
    });
    builder.addCase(singleAssignmentOfClass.fulfilled, (state, action) => {
      state.loadingAssigments = false;
      state.singleAssigment = action.payload?.data;
    });
    builder.addCase(singleAssignmentOfClass.rejected, (state, action) => {
      state.loadingAssigments = false;
      state.errorAssigment = action.payload?.message;
    })

    // update assigment of class
    builder.addCase(updateAssignmentOfClass.pending, (state, action) => {
      state.loadingAssigments = true;
      state.errorAssigment = null;
    });
    builder.addCase(updateAssignmentOfClass.fulfilled, (state, action) => {
      state.loadingAssigments = false;
      state.msgAssigment = action.payload?.message;
      const updatedAss = action.payload?.data;

      const index = state.assigments?.findIndex(assigment => assigment?._id === updatedAss?._id);
      if(index !== -1){
        state.assigments[index] = updatedAss;
      }
    });
    builder.addCase(updateAssignmentOfClass.rejected, (state, action) => {
      state.loadingAssigments = false;
      state.errorAssigment = action.payload?.message;
    })


    // delete assigment of class
    builder.addCase(removeAssignmentOfClass.pending, (state, action) => {
      state.loadingAssigments = true;
      state.errorAssigment = null;
    });
    builder.addCase(removeAssignmentOfClass.fulfilled, (state, action) => {
      state.loadingAssigments = false;
      state.msgAssigment = action.payload?.message;
      const filter = state.assigments?.filter(assigment => assigment?._id !== action.payload?.data?._id);
      state.assigments = filter;
    });
    builder.addCase(removeAssignmentOfClass.rejected, (state, action) => {
      state.loadingAssigments = false;
      state.errorAssigment = action.payload?.message;
    })

    // all notifications for teachers
    builder.addCase(allNotificationsTeachers.pending, (state, action) => {
      state.loadingNotify = true;
      state.errorTeacher = null;
    });
    builder.addCase(allNotificationsTeachers.fulfilled, (state, action) => {
      state.loadingNotify = false;
      state.notificationsTeachers = action.payload?.data;
    });
    builder.addCase(allNotificationsTeachers.rejected, (state, action) => {
      state.loadingNotify = false;
      state.errorTeacher = action.payload?.message;
    })

    // personal notifications of teacher
    builder.addCase(personalNotificationsTeacher.pending, (state, action) => {
      state.loadingNotify = true;
      state.errorTeacher = null;
    });
    builder.addCase(personalNotificationsTeacher.fulfilled, (state, action) => {
      state.loadingNotify = false;
      state.personalNotifications = action.payload?.data;
    });
    builder.addCase(personalNotificationsTeacher.rejected, (state, action) => {
      state.loadingNotify = false;
      state.errorTeacher = action.payload?.message;
    })

    // all notifications of class
    builder.addCase(allNotificationsClass.pending, (state, action) => {
      state.loadingNotifications = true;
      state.errorTeacher = null;
    });
    builder.addCase(allNotificationsClass.fulfilled, (state, action) => {
      state.loadingNotifications = false;
      state.clsNotifications = action.payload?.data;
    });
    builder.addCase(allNotificationsClass.rejected, (state, action) => {
      state.loadingNotifications = false;
      state.errorTeacher = action.payload?.message;
    })

    //  notify all class students
    builder.addCase(notifyForAllClass.pending, (state, action) => {
      state.loadingNotifications = true;
      state.errorTeacher = null;
    });
    builder.addCase(notifyForAllClass.fulfilled, (state, action) => {
      state.loadingNotifications = false;
      state.msgTeacher = action.payload?.message;
      state.clsNotifications?.push(action.payload?.data);
    });
    builder.addCase(notifyForAllClass.rejected, (state, action) => {
      state.loadingNotifications = false;
      state.errorTeacher = action.payload?.message;
    })

    //  notify single class student
    builder.addCase(singleNotificationForSt.pending, (state, action) => {
      state.loadingNotifications = true;
      state.errorTeacher = null;
    });
    builder.addCase(singleNotificationForSt.fulfilled, (state, action) => {
      state.loadingNotifications = false;
      state.msgTeacher = action.payload?.message;
      state.clsNotifications?.push(action.payload?.data);
    });
    builder.addCase(singleNotificationForSt.rejected, (state, action) => {
      state.loadingNotifications = false;
      state.errorTeacher = action.payload?.message;
    })

    //  update notification class
    builder.addCase(updateNotificationClass.pending, (state, action) => {
      state.loadingNotifications = true;
      state.errorTeacher = null;
    });
    builder.addCase(updateNotificationClass.fulfilled, (state, action) => {
      state.loadingNotifications = false;
      state.msgTeacher = action.payload?.message;
      const index = state.clsNotifications?.findIndex(n => n?._id === action.payload?.data?._id);
      if(index !== -1) state.clsNotifications[index] = action.payload?.data;
    });
    builder.addCase(updateNotificationClass.rejected, (state, action) => {
      state.loadingNotifications = false;
      state.errorTeacher = action.payload?.message;
    })

    //  single notification class by id
    builder.addCase(singleNotificationClass.pending, (state, action) => {
      state.loadingNotifications = true;
      state.errorTeacher = null;
    });
    builder.addCase(singleNotificationClass.fulfilled, (state, action) => {
      state.loadingNotifications = false;
      state.singleNotification = action.payload?.data;
    });
    builder.addCase(singleNotificationClass.rejected, (state, action) => {
      state.loadingNotifications = false;
      state.errorTeacher = action.payload?.message;
    })

    //  delete notification class
    builder.addCase(removeNotificationClass.pending, (state, action) => {
      state.loadingNotifications = true;
      state.errorTeacher = null;
    });
    builder.addCase(removeNotificationClass.fulfilled, (state, action) => {
      state.loadingNotifications = false;
      state.msgTeacher = action.payload?.message;
      const filter = state.clsNotifications?.filter(n => n?._id !== action.payload?.data?._id)
      state.clsNotifications = filter;
    });
    builder.addCase(removeNotificationClass.rejected, (state, action) => {
      state.loadingNotifications = false;
      state.errorTeacher = action.payload?.message;
    })


  },
});

export const { clearErrorsTeacher } = teacherSlice.actions;

const teacherReducers = combineReducers({
  teacherD: teacherSlice.reducer,
});

export default teacherReducers;
