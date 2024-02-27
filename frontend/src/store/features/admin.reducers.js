import {
    createSlice,
    createAsyncThunk,
    combineReducers,
  } from "@reduxjs/toolkit";
  import axios from "axios";
import { adminAddAcademicRecordUrl, adminAddSubjectCurriculumUrl, adminAddSubjectUrl, adminAllStudentsUrl, adminAllSubjectCurriculumUrl, adminAllSubjectsUrl, adminAllTeachersUrl, adminDeleteAcademicRecordUrl, adminDeleteCurriculumUrl, adminRemoveSubjectUrl, adminSingleAcademicRecordUrl, adminSingleCurriculumUrl, adminSingleSubjectUrl, adminStudentAcademicRecordUrl, adminStudentAvatarUrl, adminStudentDetailsUrl, adminStudentRegisterUrl, adminStudentRemoveUrl, adminStudentUpdateUrl, adminTeacherAddUrl, adminTeacherDeleteUrl, adminTeacherDetailsUrl, adminTeacherUpdateAvatarUrl, adminTeacherUpdateUrl, adminUpdateAcademicRecordUrl, adminUpdateCurriculumUrl } from "../urls";

  
// all students 
export const adminFetchAllStudents = createAsyncThunk("admin/allStudents", async(none, { rejectWithValue })=>{
      try {
        const config = { headers: { "Content-Type": "application/json" } };
        const res = await axios.get(`${adminAllStudentsUrl}`,config)
        
        return res.data
      } catch (error) {
        return rejectWithValue(error?.response?.data)
      }
  }) 


// single student
export const adminFetchSingleStudent = createAsyncThunk("admin/singleStudent", async(id, { rejectWithValue })=>{
      try {
        const config = { headers: { "Content-Type": "application/json" } };
        const res = await axios.get(`${adminStudentDetailsUrl}${id}`,config)
        
        return res.data
      } catch (error) {
        return rejectWithValue(error?.response?.data)
      }
  }) 


// single student update avatar
export const adminUpdateSingleStudentAvatar = createAsyncThunk("admin/UpdateStudentAvatar", async({id: id, data: data}, { rejectWithValue })=>{
      try {
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const res = await axios.put(`${adminStudentAvatarUrl}${id}`,data, config)
        
        return res.data
      } catch (error) {
        return rejectWithValue(error?.response?.data)
      }
  }) 


// add/register student 
export const adminRegisterStudent = createAsyncThunk("admin/registerStudent", async(data, { rejectWithValue })=>{
      try {
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const res = await axios.post(`${adminStudentRegisterUrl}`,data, config)
        
        return res.data
      } catch (error) {
        return rejectWithValue(error?.response?.data)
      }
  }) 


// update student 
export const adminUpdateStudent = createAsyncThunk("admin/UpdateStudent", async({id: id, data:data}, { rejectWithValue })=>{
      try {
        const config = { headers: { "Content-Type": "application/json" } };
        const res = await axios.put(`${adminStudentUpdateUrl}${id}`,data, config)
        
        return res.data
      } catch (error) {
        return rejectWithValue(error?.response?.data)
      }
  }) 


// update student 
export const adminRemoveStudent = createAsyncThunk("admin/RemoveStudent", async(id, { rejectWithValue })=>{
      try {
        const config = { headers: { "Content-Type": "application/json" } };
        const res = await axios.delete(`${adminStudentRemoveUrl}${id}`, config)
        
        return res.data
      } catch (error) {
        return rejectWithValue(error?.response?.data)
      }
  }) 


// acdemic record student 
export const adminAllStudentAcademicRecord = createAsyncThunk("admin/studentAcademicRecordAll", async(id, { rejectWithValue })=>{
      try {
        const config = { headers: { "Content-Type": "application/json" } };
        const res = await axios.get(`${adminStudentAcademicRecordUrl}${id}`, config)
        
        return res.data
      } catch (error) {
        return rejectWithValue(error?.response?.data)
      }
  }) 


// single acdemic record student 
export const adminSingleAcademicRecord = createAsyncThunk("admin/singleAcademicRecord", async(id, { rejectWithValue })=>{
      try {
        const config = { headers: { "Content-Type": "application/json" } };
        const res = await axios.get(`${adminSingleAcademicRecordUrl}${id}`, config)
        
        return res.data
      } catch (error) {
        return rejectWithValue(error?.response?.data)
      }
  }) 


// add acdemic record student 
export const adminAddAcademicRecord = createAsyncThunk("admin/studentAddAcademicRecord", async({id: id, data: data}, { rejectWithValue })=>{
      try {
        const config = { headers: { "Content-Type": "application/json" } };
        const res = await axios.post(`${adminAddAcademicRecordUrl}${id}`,data, config)
        
        return res.data
      } catch (error) {
        return rejectWithValue(error?.response?.data)
      }
  }) 


// update acdemic record student 
export const adminUpdateAcademicRecord = createAsyncThunk("admin/studentUpdateAcademicRecord", async({id: id, data: data}, { rejectWithValue })=>{
      try {
        const config = { headers: { "Content-Type": "application/json" } };
        const res = await axios.post(`${adminUpdateAcademicRecordUrl}${id}`,data, config)
        
        return res.data
      } catch (error) {
        return rejectWithValue(error?.response?.data)
      }
  }) 

// delete acdemic record student 
export const adminRemoveAcademicRecord = createAsyncThunk("admin/studentDeleteAcademicRecord", async(id, { rejectWithValue })=>{
      try {
        const config = { headers: { "Content-Type": "application/json" } };
        const res = await axios.delete(`${adminDeleteAcademicRecordUrl}${id}`, config)
        
        return res.data
      } catch (error) {
        return rejectWithValue(error?.response?.data)
      }
  }) 


  const studentOptSlice = createSlice({
    name: 'students',
    initialState:{
      loadingSt: false,
      errSt: null,
      msgSt: null,
      msgUptSt: null,
      errUptSt: null,
      msgDelSt: null,
      errDelSt: null,
      allSt: null,
      singleSt: null,
      academic: null,
      singleAcademic: null


    },

    reducers:{
      clearErrorStudents(state){
        state.errSt =  null
        state.msgSt =  null
        state.msgUptSt =  null
        state.errUptSt =  null
        state.msgDelSt =  null
        state.errDelSt =  null
      }
    },

    extraReducers: (builder) =>{
      // all students
      builder.addCase(adminFetchAllStudents.pending, (state, action)=>{
        state.loadingSt = true
        state.errSt = null
      })
      builder.addCase(adminFetchAllStudents.fulfilled, (state, action)=>{
        state.loadingSt = false
        state.allSt = action.payload.data
      })
      builder.addCase(adminFetchAllStudents.rejected, (state, action)=>{
        state.loadingSt = false
        state.errSt = action.payload.message
      })

      // single student
      builder.addCase(adminFetchSingleStudent.pending, (state, action)=>{
        state.loadingSt = true
        state.errSt = null
      })
      builder.addCase(adminFetchSingleStudent.fulfilled, (state, action)=>{
        state.loadingSt = false
        state.singleSt = action.payload.data
      })
      builder.addCase(adminFetchSingleStudent.rejected, (state, action)=>{
        state.loadingSt = false
        state.errSt = action.payload.message
      })

      // single student update avatar
      builder.addCase(adminUpdateSingleStudentAvatar.pending, (state, action)=>{
        state.loadingSt = true
        state.errSt = null
      })
      builder.addCase(adminUpdateSingleStudentAvatar.fulfilled, (state, action)=>{
        state.loadingSt = false
        state.msgSt = action.payload.message
      })
      builder.addCase(adminUpdateSingleStudentAvatar.rejected, (state, action)=>{
        state.loadingSt = false
        state.errSt = action.payload.message
      })

      // add student
      builder.addCase(adminRegisterStudent.pending, (state, action)=>{
        state.loadingSt = true
        state.errSt = null
      })
      builder.addCase(adminRegisterStudent.fulfilled, (state, action)=>{
        state.loadingSt = false
        state.msgSt = action.payload.message
      })
      builder.addCase(adminRegisterStudent.rejected, (state, action)=>{
        state.loadingSt = false
        state.errSt = action.payload.message
      })

      // update student
      builder.addCase(adminUpdateStudent.pending, (state, action)=>{
        state.loadingSt = true
        state.errSt = null
      })
      builder.addCase(adminUpdateStudent.fulfilled, (state, action)=>{
        state.loadingSt = false
        state.msgSt = action.payload.message
      })
      builder.addCase(adminUpdateStudent.rejected, (state, action)=>{
        state.loadingSt = false
        state.errSt = action.payload.message
      })

      // delete student
      builder.addCase(adminRemoveStudent.pending, (state, action)=>{
        state.loadingSt = true
        state.errSt = null
      })
      builder.addCase(adminRemoveStudent.fulfilled, (state, action)=>{
        state.loadingSt = false
        state.msgSt = action.payload.message
      })
      builder.addCase(adminRemoveStudent.rejected, (state, action)=>{
        state.loadingSt = false
        state.errSt = action.payload.message
      })

      // academic record student
      builder.addCase(adminAllStudentAcademicRecord.pending, (state, action)=>{
        state.loadingSt = true
        state.errSt = null
      })
      builder.addCase(adminAllStudentAcademicRecord.fulfilled, (state, action)=>{
        state.loadingSt = false
        state.academic = action.payload.data
      })
      builder.addCase(adminAllStudentAcademicRecord.rejected, (state, action)=>{
        state.loadingSt = false
        state.errSt = action.payload.message
      })

      // single academic record student
      builder.addCase(adminSingleAcademicRecord.pending, (state, action)=>{
        state.loadingSt = true
        state.errSt = null
      })
      builder.addCase(adminSingleAcademicRecord.fulfilled, (state, action)=>{
        state.loadingSt = false
        state.singleAcademic = action.payload.data
      })
      builder.addCase(adminSingleAcademicRecord.rejected, (state, action)=>{
        state.loadingSt = false
        state.errSt = action.payload.message
      })

      // Add academic record student
      builder.addCase(adminAddAcademicRecord.pending, (state, action)=>{
        state.loadingSt = true
        state.errSt = null
      })
      builder.addCase(adminAddAcademicRecord.fulfilled, (state, action)=>{
        state.loadingSt = false
        state.msgSt = action.payload.message
      })
      builder.addCase(adminAddAcademicRecord.rejected, (state, action)=>{
        state.loadingSt = false
        state.errSt = action.payload.message
      })


      // Update academic record student
      builder.addCase(adminUpdateAcademicRecord.pending, (state, action)=>{
        state.loadingSt = true
        state.errUptSt = null
      })
      builder.addCase(adminUpdateAcademicRecord.fulfilled, (state, action)=>{
        state.loadingSt = false
        state.msgUptSt = action.payload.message
      })
      builder.addCase(adminUpdateAcademicRecord.rejected, (state, action)=>{
        state.loadingSt = false
        state.errUptSt = action.payload.message
      })

      // remove academic record student
      builder.addCase(adminRemoveAcademicRecord.pending, (state, action)=>{
        state.loadingSt = true
        state.errDelSt = null
      })
      builder.addCase(adminRemoveAcademicRecord.fulfilled, (state, action)=>{
        state.loadingSt = false
        state.msgDelSt = action.payload.message
      })
      builder.addCase(adminRemoveAcademicRecord.rejected, (state, action)=>{
        state.loadingSt = false
        state.errDelSt = action.payload.message
      })

    }
  })

  
// =============================================TeacherSlice==========================================================
  // all teachers
  export const adminFetchAllTeachers = createAsyncThunk("admin/fetchAllTeachers", async(id, {rejectWithValue})=>{
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const res = await axios.get(`${adminAllTeachersUrl}`,config)
      return res.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  })


  // single teacher details
  export const adminFetchSingleTeacher = createAsyncThunk("admin/fetchSingleTeacher", async(id, {rejectWithValue})=>{
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const res = await axios.get(`${adminTeacherDetailsUrl}${id}`,config)
      return res.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  })


  // add teacher
  export const adminAddTeacher = createAsyncThunk("admin/AddTeacher", async(data, {rejectWithValue})=>{
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const res = await axios.post(`${adminTeacherAddUrl}`,data,config)
      return res.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  })


  // Update teacher
  export const adminUpdateTeacher = createAsyncThunk("admin/UpdateTeacher", async({id: id, data:data}, {rejectWithValue})=>{
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const res = await axios.put(`${adminTeacherUpdateUrl}${id}`,data,config)
      return res.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  })


  // Update avatar teacher
  export const adminUpdateAvatarTeacher = createAsyncThunk("admin/UpdateAvatarTeacher", async({id: id, data:data}, {rejectWithValue})=>{
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const res = await axios.put(`${adminTeacherUpdateAvatarUrl}${id}`,data,config)
      return res.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  })


  // Delete teacher
  export const adminRemoveTeacher = createAsyncThunk("admin/removeAvatarTeacher", async(id, {rejectWithValue})=>{
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const res = await axios.delete(`${adminTeacherDeleteUrl}${id}`,config)
      return res.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  })



  const teacherOptSlice = createSlice({
    name: 'teachers',
    initialState:{
      loadingTr: false,
      errTr: null,
      msgTr: null,
      msgUptTr: null,
      errUptTr: null,
      msgDelTr: null,
      errDelTr: null,
      allTr: null,
      singleTr: null


    },


    reducers:{
      clearErrorTeachers(state){
        state.errTr =  null
        state.msgTr =  null
        state.msgUptTr =  null
        state.errUptTr =  null
        state.msgDelTr =  null
        state.errDelTr =  null
      }
    },

    extraReducers: (builder)=>{
      // all teachers
      builder.addCase(adminFetchAllTeachers.pending, (state, action)=>{
        state.loadingTr = true
        state.errTr = null
      })
      builder.addCase(adminFetchAllTeachers.fulfilled, (state, action)=>{
        state.loadingTr = false
        state.allTr = action.payload.data
      })
      builder.addCase(adminFetchAllTeachers.rejected, (state, action)=>{
        state.loadingTr = false
        state.errTr = action.payload.message
      })

      // single teacher
      builder.addCase(adminFetchSingleTeacher.pending, (state, action)=>{
        state.loadingTr = true
        state.errTr = null
      })
      builder.addCase(adminFetchSingleTeacher.fulfilled, (state, action)=>{
        state.loadingTr = false
        state.singleTr = action.payload.data
      })
      builder.addCase(adminFetchSingleTeacher.rejected, (state, action)=>{
        state.loadingTr = false
        state.errTr = action.payload.message
      })

      // update single teacher avatar
        builder.addCase(adminUpdateAvatarTeacher.pending, (state, action)=>{
        state.loadingTr = true
        state.errTr = null
      })
      builder.addCase(adminUpdateAvatarTeacher.fulfilled, (state, action)=>{
        state.loadingTr = false
        state.msgTr = action.payload.message
      })
      builder.addCase(adminUpdateAvatarTeacher.rejected, (state, action)=>{
        state.loadingTr = false
        state.errTr = action.payload.message
      })


      // add teacher
      builder.addCase(adminAddTeacher.pending, (state, action)=>{
        state.loadingTr = true
        state.errTr = null
      })
      builder.addCase(adminAddTeacher.fulfilled, (state, action)=>{
        state.loadingTr = false
        state.msgTr = action.payload.message
      })
      builder.addCase(adminAddTeacher.rejected, (state, action)=>{
        state.loadingTr = false
        state.errTr = action.payload.message
      })

      // Update teacher
      builder.addCase(adminUpdateTeacher.pending, (state, action)=>{
        state.loadingTr = true
        state.errUptTr = null
      })
      builder.addCase(adminUpdateTeacher.fulfilled, (state, action)=>{
        state.loadingTr = false
        state.msgUptTr = action.payload.message
      })
      builder.addCase(adminUpdateTeacher.rejected, (state, action)=>{
        state.loadingTr = false
        state.errUptTr = action.payload.message
      })

      // Delete teacher
      builder.addCase(adminRemoveTeacher.pending, (state, action)=>{
        state.loadingTr = true
        state.errDelTr = null
      })
      builder.addCase(adminRemoveTeacher.fulfilled, (state, action)=>{
        state.loadingTr = false
        state.msgDelTr = action.payload.message
      })
      builder.addCase(adminRemoveTeacher.rejected, (state, action)=>{
        state.loadingTr = false
        state.errDelTr = action.payload.message
      })


    }


  })


// =======================================Subjects Slice====================================================================

//all subjects ✅ 
export const adminFetchAllSubjects = createAsyncThunk("admin/allSubjects",async(id,{rejectWithValue})=>{
  try {
    const config = {headers: {"Content-Type": "application/json"}};
    const res = await axios.get(`${adminAllSubjectsUrl}`,config)
    return res.data

  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

// single subject ✅
export const adminFetchSingleSubject = createAsyncThunk("admin/singleSubject",async(id,{rejectWithValue})=>{
  try {
    const config = {headers: {"Content-Type": "application/json"}};
    const res = await axios.get(`${adminSingleSubjectUrl}${id}`,config)
    return res.data

  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

// add subject ✅
export const adminAddSubject = createAsyncThunk("admin/addSubject",async(subject,{rejectWithValue})=>{
  try {
    const config = {headers: {"Content-Type": "application/json"}};
    console.log("action" , subject);
    const res = await axios.post(`${adminAddSubjectUrl}`,subject,config)
    console.log(res.data);
    return res.data

  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})


// delete subject ❌
export const adminDeleteSubject = createAsyncThunk("admin/deleteSubject",async(id,{rejectWithValue})=>{
  try {
    const config = {headers: {"Content-Type": "application/json"}};
    const res = await axios.delete(`${adminRemoveSubjectUrl}${id}`,config)
    return res.data

  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})


// all subject curriculums ✅
export const adminAllCurriculumsSubject = createAsyncThunk("admin/curriculumsSubject",async(id,{rejectWithValue})=>{
  try {
    const config = {headers: {"Content-Type": "application/json"}};
    const res = await axios.get(`${adminAllSubjectCurriculumUrl}${id}`,config)
    return res.data

  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})


// add subject curriculum ✅
export const adminAddCurriculumSubject = createAsyncThunk("admin/addcurriculumSubject",async({id: id, data:data},{rejectWithValue})=>{
  try {
    const config = {headers: {"Content-Type": "application/json"}};
    const res = await axios.post(`${adminAddSubjectCurriculumUrl}${id}`,data,config)
    return res.data

  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

// single subject curriculum ✅
export const adminSingleCurriculumSubject = createAsyncThunk("admin/singleCurriculumSubject",async(id,{rejectWithValue})=>{
  try {
    const config = {headers: {"Content-Type": "application/json"}};
    const res = await axios.get(`${adminSingleCurriculumUrl}${id}`,config)
    return res.data

  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

// update subject curriculum ✅
export const adminUpdateCurriculumSubject = createAsyncThunk("admin/updateCurriculumSubject",async({id:id, data:data},{rejectWithValue})=>{
  try {
    const config = {headers: {"Content-Type": "application/json"}};
    const res = await axios.put(`${adminUpdateCurriculumUrl}${id}`,data,config)
    return res.data

  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

// delete subject curriculum ✅
export const adminRemoveCurriculumSubject = createAsyncThunk("admin/removeCurriculumSubject",async(id,{rejectWithValue})=>{
  try {
    const config = {headers: {"Content-Type": "application/json"}};
    const res = await axios.delete(`${adminDeleteCurriculumUrl}${id}`,config)
    return res.data

  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})


const subjectOptSlice = createSlice({
  name: 'subjects',
  initialState:{
    loadingSb: false,
    errSb: null,
    msgSb: null,
    msgUptSb: null,
    errUptSb: null,
    msgDelSb: null,
    errDelSb: null,
    curriculums: null,
    msgUptSbCur: null,
    errUptSbCur: null,
    msgDelSbCur: null,
    errDelSbCur: null,
    allSb: null,
    singleSb: null,
    singleSbCurriculum: null,


  },

  reducers:{
    clearErrorSubjects(state){
      state.errSb =  null
      state.msgSb =  null
      state.msgUptSb =  null
      state.errUptSb =  null
      state.msgDelSb =  null
      state.errDelSb =  null
      state.msgUptSbCur = null
      state.errUptSbCur = null
      state.msgDelSbCur = null
      state.errDelSbCur = null
    }
  },


  extraReducers: (builder) => {
      // all subjects
      builder.addCase(adminFetchAllSubjects.pending, (state, action)=>{
        state.loadingSb = true
        state.errSb = null
      })
      builder.addCase(adminFetchAllSubjects.fulfilled, (state, action)=>{
        state.loadingSb = false
        state.allSb = action.payload.data
      })
      builder.addCase(adminFetchAllSubjects.rejected, (state, action)=>{
        state.loadingSb = false
        state.errSb = action.payload.message
      })

      // single subjects
      builder.addCase(adminFetchSingleSubject.pending, (state, action)=>{
        state.loadingSb = true
        state.errSb = null
      })
      builder.addCase(adminFetchSingleSubject.fulfilled, (state, action)=>{
        state.loadingSb = false
        state.singleSb = action.payload.data
      })
      builder.addCase(adminFetchSingleSubject.rejected, (state, action)=>{
        state.loadingSb = false
        state.errSb = action.payload.message
      })

      // add subject
      builder.addCase(adminAddSubject.pending, (state, action)=>{
        state.loadingSb = true
        state.errSb = null
      })
      builder.addCase(adminAddSubject.fulfilled, (state, action)=>{
        state.loadingSb = false
        state.msgSb = action.payload.message
      })
      builder.addCase(adminAddSubject.rejected, (state, action)=>{
        state.loadingSb = false
        state.errSb = action.payload.message
      })

      // delete subject
      builder.addCase(adminDeleteSubject.pending, (state, action)=>{
        state.loadingSb = true
        state.errDelSb = null
      })
      builder.addCase(adminDeleteSubject.fulfilled, (state, action)=>{
        state.loadingSb = false
        state.msgDelSb = action.payload.message
      })
      builder.addCase(adminDeleteSubject.rejected, (state, action)=>{
        state.loadingSb = false
        state.errDelSb = action.payload.message
      })


      // all curriculums of  subject
      builder.addCase(adminAllCurriculumsSubject.pending, (state, action)=>{
        state.loadingSb = true
        state.errSb = null
      })
      builder.addCase(adminAllCurriculumsSubject.fulfilled, (state, action)=>{
        state.loadingSb = false
        state.curriculums = action.payload.data
      })
      builder.addCase(adminAllCurriculumsSubject.rejected, (state, action)=>{
        state.loadingSb = false
        state.errSb = action.payload.message
      })

      // add curriculum of  subject
      builder.addCase(adminAddCurriculumSubject.pending, (state, action)=>{
        state.loadingSb = true
        state.errSb = null
      })
      builder.addCase(adminAddCurriculumSubject.fulfilled, (state, action)=>{
        state.loadingSb = false
        state.msgSb = action.payload.message
      })
      builder.addCase(adminAddCurriculumSubject.rejected, (state, action)=>{
        state.loadingSb = false
        state.errSb = action.payload.message
      })

      // single curriculum of  subject
      builder.addCase(adminSingleCurriculumSubject.pending, (state, action)=>{
        state.loadingSb = true
        state.errSb = null
      })
      builder.addCase(adminSingleCurriculumSubject.fulfilled, (state, action)=>{
        state.loadingSb = false
        state.singleSbCurriculum = action.payload.data
      })
      builder.addCase(adminSingleCurriculumSubject.rejected, (state, action)=>{
        state.loadingSb = false
        state.errSb = action.payload.message
      })

      // Update curriculum of  subject
      builder.addCase(adminUpdateCurriculumSubject.pending, (state, action)=>{
        state.loadingSb = true
        state.errUptSbCur = null
      })
      builder.addCase(adminUpdateCurriculumSubject.fulfilled, (state, action)=>{
        state.loadingSb = false
        state.msgUptSbCur = action.payload.message
      })
      builder.addCase(adminUpdateCurriculumSubject.rejected, (state, action)=>{
        state.loadingSb = false
        state.errUptSbCur = action.payload.message
      })

      // delete curriculum of  subject
      builder.addCase(adminRemoveCurriculumSubject.pending, (state, action)=>{
        state.loadingSb = true
        state.errDelSbCur = null
      })
      builder.addCase(adminRemoveCurriculumSubject.fulfilled, (state, action)=>{
        state.loadingSb = false
        state.msgDelSbCur = action.payload.message
      })
      builder.addCase(adminRemoveCurriculumSubject.rejected, (state, action)=>{
        state.loadingSb = false
        state.errDelSbCur = action.payload.message
      })


  }

})





  export const {clearErrorStudents} = studentOptSlice.actions
  export const {clearErrorTeachers} = teacherOptSlice.actions
  export const {clearErrorSubjects} = subjectOptSlice.actions

  const adminReducers = combineReducers({
    students: studentOptSlice.reducer ,
    teachers: teacherOptSlice.reducer ,
    subjects: subjectOptSlice.reducer
  })


  export default adminReducers