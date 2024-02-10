import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoaderAn from "./LoaderAn/LoaderAn";
import { useDispatch } from "react-redux";
import { profileUser } from "../../store/features/user.reducer";

const Registeration = lazy(() =>
  import("./components/Registeration/Registeration")
);

const AnProfile = lazy(() => import("./components/AnProfile/AnProfile"));
const AnPayments = lazy(() => import("./components/AnPayments/AnPayments"));
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
          <Route path="/admin-registeration" element={<Registeration />} />
          <Route path="/admin-payments" element={<AnPayments />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default Admin;
