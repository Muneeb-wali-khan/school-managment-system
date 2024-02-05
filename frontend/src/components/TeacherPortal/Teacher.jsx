import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoaderTr from "./LoaderTr/LoaderTr"
import { profileUser } from "../../store/features/user.reducer";
import { useDispatch } from "react-redux";
import { allStudentsClass, profileTeacher } from "../../store/features/teacher.reducers";

const TrRegisteration = lazy(()=> import("../../components/TeacherPortal/components/TrRegisteration/TrRegisteration")) 
const TrStudents = lazy(()=> import("../../components/TeacherPortal/components/TrStudents/TrStudents")) 
const StDetails = lazy(()=> import("../../components/TeacherPortal/components/TrStudents/StDetails/StDetails")) 
const AddStudent = lazy(()=> import("../../components/TeacherPortal/components/TrStudents/AddStudent/AddStudent")) 
const TrProfiles = lazy(()=> import("../../components/TeacherPortal/components/TrProfiles/TrProfiles")) 
const SideBar = lazy(()=> import("./SideBar/SideBar")) 
const TrDash = lazy(()=> import("./DashboardTeacher/TrDash"))
const NotFound = lazy(()=> import("../Not-Found/NotFound"))


const Teacher = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profileUser());
    dispatch(profileTeacher());
    dispatch(allStudentsClass());
  }, [dispatch]);

  return (
    <div className="flex">
      <SideBar/>
      <Suspense fallback={<LoaderTr/>}>
        <Routes>
          <Route path="/*" element={< NotFound/>} />
          <Route path="/teacher-dash" element={< TrDash/>} />
          <Route path="/teacher-registeration" element={< TrRegisteration/>} />
          <Route path="/teacher-students" element={< TrStudents/>} />
          <Route path="/teacher-profile" element={< TrProfiles/>} />
          <Route path="/student-details/:id" element={< StDetails/>} />
          <Route path="/add-student-class" element={< AddStudent/>} />
        </Routes>
      </Suspense>
    </div>
  )
};

export default Teacher;
