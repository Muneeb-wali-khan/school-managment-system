import React from "react";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoaderAn from "./LoaderAn/LoaderAn"

const Registeration  = lazy(()=> import("./Registeration/Registeration")) 
const AnPayments =  lazy(()=> import("./AnPayments/AnPayments")) 
const SideBar =  lazy(()=> import("./SideBar/SideBar")) 
const AnDash  = lazy(()=> import("./DashboardAdmin/AnDash")) ;
const NotFound  = lazy(()=> import("../Not-Found/NotFound")) ;

const Admin = () => {
  return (
    <div className="flex">
      <SideBar/>
      <Suspense fallback={<LoaderAn/>}>
      <Routes>
        <Route path="/admin-dash" element={< AnDash/>} />
        <Route path="/*" element={< NotFound/>} />
        <Route path="/admin-registeration" element={< Registeration/>} />
        <Route path="/admin-payments" element={< AnPayments/>} />
      </Routes>
      </Suspense>
    </div>
  )
};

export default Admin;
