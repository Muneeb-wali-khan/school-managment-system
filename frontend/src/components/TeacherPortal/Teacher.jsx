import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoaderTr from "./LoaderTr/LoaderTr"
import { profileUser } from "../../store/features/user.reducer";
import { useDispatch } from "react-redux";
import { allStudentsClass, allSubjectsOfClass, allTeachersOfClass, profileTeacher } from "../../store/features/teacher.reducers";

const AllTeachers = lazy(()=> import("../../components/TeacherPortal/components/AllTeachers/AllTeachers")) 
const AllSubjects = lazy(()=> import("../../components/TeacherPortal/components/AllSubjects/AllSubjects")) 
const TrStudents = lazy(()=> import("../../components/TeacherPortal/components/TrStudents/TrStudents")) 
const StDetails = lazy(()=> import("../../components/TeacherPortal/components/TrStudents/StDetails/StDetails")) 
const UpdateStudent = lazy(()=> import("../../components/TeacherPortal/components/TrStudents/UpdateStudent/UpdateStudent")) 
const AddStudent = lazy(()=> import("../../components/TeacherPortal/components/TrStudents/AddStudent/AddStudent")) 
const TrProfiles = lazy(()=> import("../../components/TeacherPortal/components/TrProfiles/TrProfiles")) 
const CurriculumSub = lazy(()=> import("../../components/TeacherPortal/components/AllSubjects/CurriculumSubject/CurriculumSub")) 
const TakeAttendance = lazy(()=> import("../../components/TeacherPortal/components/Attendance/TakeAttendance")) 

const SideBar = lazy(()=> import("./SideBar/SideBar")) 
const TrDash = lazy(()=> import("./DashboardTeacher/TrDash"))
const NotFound = lazy(()=> import("../Not-Found/NotFound"))


const Teacher = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profileUser());
    dispatch(profileTeacher());
    dispatch(allStudentsClass());
    dispatch(allTeachersOfClass());
    dispatch(allSubjectsOfClass());
  }, [dispatch]);

  return (
    <div className="flex">
      <SideBar/>
      <Suspense fallback={<LoaderTr/>}>
        <Routes>
          <Route path="/*" element={< NotFound/>} />
          <Route path="/teacher-dash" element={< TrDash/>} />
          <Route path="/all-class-teachers" element={< AllTeachers/>} />
          <Route path="/all-class-subjects" element={< AllSubjects/>} />
          <Route path="/teacher-students" element={< TrStudents/>} />
          <Route path="/teacher-profile" element={< TrProfiles/>} />
          <Route path="/student-details/:id" element={< StDetails/>} />
          <Route path="/add-student-class" element={< AddStudent/>} />
          <Route path="/update-student-class/:id" element={< UpdateStudent/>} />
          <Route path="/curriculum-subject" element={< CurriculumSub/>} />
          <Route path="/take-attendance-student" element={< TakeAttendance/>} />
        </Routes>
      </Suspense>
    </div>
  )
};

export default Teacher;
