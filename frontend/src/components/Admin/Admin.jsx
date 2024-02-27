import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoaderAn from "./LoaderAn/LoaderAn";
import { useDispatch } from "react-redux";
import { profileUser } from "../../store/features/user.reducer";

// subjects
const AllSubjects = lazy(() =>
  import("./components/AllSubjects/AllSubjects")
);
const SbDetaills = lazy(() =>
  import("./components/AllSubjects/SbDetails/SbDetaills")
);
const CurriculumsSubject = lazy(() =>
  import("./components/AllSubjects/CurriculumsSubject/CurriculumsSubject")
);


// teachers
const AllTeachers = lazy(() =>
  import("./components/AllTeachers/AllTeachers")
);
const TrDetails = lazy(() =>
  import("./components/AllTeachers/TrDetails/TrDetails")
);
const RegisterTeacher = lazy(() =>
  import("./components/AllTeachers/RegTeacher/RegisterTeacher")
);
const UpdateTeacher = lazy(() =>
  import("./components/AllTeachers/UpdateTeacher/UpdateTeacher")
);

// students
const AllStudents = lazy(() => import("./components/AllStudents/ALLStudents"));
const StDetails = lazy(() => import("./components/AllStudents/StDetails/StDetails"));
const RegisterStudent = lazy(() => import("./components/AllStudents/RegStudent/RegisterStudent"));
const UpdateStudent = lazy(() => import("./components/AllStudents/UpdateStudent/UpdateStudent"));
const StAcademicRecords = lazy(() => import("./components/AllStudents/AcademicRecords/StAcademicRecords"));



const AnProfile = lazy(() => import("./components/AnProfile/AnProfile"));
const SideBar = lazy(() => import("./SideBar/SideBar"));
const AnDash = lazy(() => import("./DashboardAdmin/AnDash"));
const NotFound = lazy(() => import("../Not-Found/NotFound"));

const Admin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profileUser());
  }, [dispatch]);

  return (
    <div className="flex">
      <SideBar />
      <Suspense fallback={<LoaderAn />}>
        <Routes>
          <Route path="/admin-dash" element={<AnDash />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/admin-profile" element={<AnProfile />} />

          <Route path="/admin-all-students" element={<AllStudents />} />
          <Route path="/admin-student-details/:id" element={<StDetails />} />
          <Route path="/admin-student-add" element={<RegisterStudent />} />
          <Route path="/admin-update-student/:id" element={<UpdateStudent />} />
          <Route path="/admin-academic-record-student/:id" element={<StAcademicRecords />} />

          <Route path="/admin-all-teachers" element={<AllTeachers />} />
          <Route path="/admin-teacher-details/:id" element={<TrDetails />} />
          <Route path="/admin-teacher-add" element={<RegisterTeacher />} />
          <Route path="/admin-teacher-update/:id" element={<UpdateTeacher />} />

          <Route path="/admin-all-subjects" element={<AllSubjects />} />
          <Route path="/admin-subject-details/:id" element={<SbDetaills />} />
          <Route path="/admin-subject-curriculums/:id" element={<CurriculumsSubject />} />

        </Routes>
      </Suspense>
    </div>
  );
};

export default Admin;
