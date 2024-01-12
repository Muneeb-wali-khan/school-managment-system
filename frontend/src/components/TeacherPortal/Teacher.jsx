import React from "react";
import TrRegisteration from "./TrRegisteration/TrRegisteration"
import TrPayments from "./TrPayments/TrPayments"
import SideBar from "./SideBar/SideBar"
import { Route, Routes } from "react-router-dom";
import TrDash from "./DashboardTeacher/TrDash";
import NotFound from "../Not-Found/NotFound";
const Teacher = () => {
  return (
    <div className="flex">
      <SideBar/>
      <Routes>
        <Route path="/teacher-dash" element={< TrDash/>} />
        <Route path="/*" element={< NotFound/>} />
        <Route path="/teacher-registeration" element={< TrRegisteration/>} />
        <Route path="/teacher-payments" element={< TrPayments/>} />
      </Routes>
    </div>
  )
};

export default Teacher;
