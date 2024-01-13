import React from "react";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoaderTr from "./LoaderTr/LoaderTr"

const TrRegisteration = lazy(()=> import("./TrRegisteration/TrRegisteration")) 
const TrPayments = lazy(()=> import("./TrPayments/TrPayments")) 
const SideBar = lazy(()=> import("./SideBar/SideBar")) 
const TrDash = lazy(()=> import("./DashboardTeacher/TrDash"))
const NotFound = lazy(()=> import("../Not-Found/NotFound"))

const Teacher = () => {
  return (
    <div className="flex">
      <SideBar/>
      <Suspense fallback={<LoaderTr/>}>
        <Routes>
          <Route path="/teacher-dash" element={< TrDash/>} />
          <Route path="/*" element={< NotFound/>} />
          <Route path="/teacher-registeration" element={< TrRegisteration/>} />
          <Route path="/teacher-payments" element={< TrPayments/>} />
        </Routes>
      </Suspense>
    </div>
  )
};

export default Teacher;
