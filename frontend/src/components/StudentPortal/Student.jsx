import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoaderSt from "./LoaderSt/LoaderSt";
import { useDispatch } from "react-redux";

import { profileUser } from "../../store/features/user.reducer";
import { profileStudent } from "../../store/features/student.reducers";

const StAttendanceRecord = lazy(() => import("./components/StAttendanceRecords/StAttendanceRecord"));
const StProfiles = lazy(() => import("./components/StProfiles/StProfiles"));
const StPayments = lazy(() => import("./StPayments/StPayments"));
const SideBar = lazy(() => import("./SideBar/SideBar"));
const StDash = lazy(() => import("./DashboardStudent/StDash"));
const NotFound = lazy(() => import("../Not-Found/NotFound"));

const Student = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profileUser());
    dispatch(profileStudent());
  }, [dispatch]);

  return (
    <div className="flex ">
      <SideBar />
      <Suspense fallback={<LoaderSt />}>
        <Routes>
          <Route path="/student-dash" element={<StDash />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/student-profile" element={<StProfiles />} />
          <Route path="/student-attendance-record" element={<StAttendanceRecord />} />
          <Route path="/student-payments" element={<StPayments />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default Student;
