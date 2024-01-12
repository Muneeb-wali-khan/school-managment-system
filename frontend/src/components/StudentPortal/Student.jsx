import React from "react";
import Registeration from "./Registeration/Registeration"
import StPayments from "./StPayments/StPayments"
import SideBar from "./SideBar/SideBar"
import { Route, Routes } from "react-router-dom";
import StDash from "./DashboardStudent/StDash";
import NotFound from "../Not-Found/NotFound";

const Student = () => {
  return (
    <div className="flex">
      <SideBar/>
      <Routes>
        <Route path="/student-dash" element={< StDash/>} />
        <Route path="/*" element={< NotFound/>} />
        <Route path="/student-registeration" element={< Registeration/>} />
        <Route path="/student-payments" element={< StPayments/>} />
      </Routes>
    </div>
  )
};

export default Student;
