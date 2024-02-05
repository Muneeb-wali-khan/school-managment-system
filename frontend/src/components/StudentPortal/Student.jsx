import React from "react";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoaderSt from "./LoaderSt/LoaderSt"
const Registeration  = lazy(()=> import("./Registeration/Registeration")) 
const StPayments =  lazy(()=> import("./StPayments/StPayments")) 
const SideBar =  lazy(()=> import("./SideBar/SideBar")) 
const StDash  = lazy(()=> import("./DashboardStudent/StDash")) ;
const NotFound  = lazy(()=> import("../Not-Found/NotFound")) ;

const Student = () => {
  return (
    <div className="flex ">
      <SideBar/>
      <Suspense fallback={<LoaderSt/>}>
      <Routes>
        <Route path="/student-dash" element={< StDash/>} />
        <Route path="/*" element={< NotFound/>} />
        <Route path="/student-registeration" element={< Registeration/>} />
        <Route path="/student-payments" element={< StPayments/>} />
      </Routes>
      </Suspense>
    </div>
  )
};

export default Student;
