import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NavHome = () => {
  const navigate = useNavigate();
  const { userD } = useSelector((state) => state.user?.userAuth);

  return (
    <>
      <div className="bg-gray-50 shadow-lg shadow-gray-300 p-5 px-10  text-green-600 flex justify-between items-center navHome">
        <div className="logo">
          <h2 className="text-2xl font-extrabold">APSACS</h2>
        </div>
        <div>
          <h1 className="text-2xl font-bold uppercase">
            welcome to Army public school sadda portal
          </h1>
        </div>

        {userD === null && (
          <Link to="/">
            <div className="navhomeHome hover:text-white  transition-all rounded-3xl border border-green-600 hover:bg-green-600  py-[7px] px-[20px] ">
              Home
            </div>
          </Link>
        )}

        {userD && userD.role === "admin" && (
          <div
            onClick={() => navigate("/admin-portal/admin-dash")}
            className="navhomeHome hover:text-white cursor-pointer flex items-center gap-[9px]  transition-all rounded-3xl border border-green-600 hover:bg-green-600  py-[7px] px-[20px] "
          >
            DashBoard
            <i className="fa fa-dashboard"></i>
          </div>
        )}

        {userD && userD.role === "teacher" && (
          <div
            onClick={() => navigate("/teacher-portal/teacher-dash")}
            className="navhomeHome hover:text-white cursor-pointer flex items-center gap-[9px]  transition-all rounded-3xl border border-green-600 hover:bg-green-600  py-[7px] px-[20px] "
          >
            DashBoard
            <i className="fa fa-dashboard"></i>
          </div>
        )}

        {userD && userD.role === "student" && (
          <div
            onClick={() => navigate("/student-portal/student-dash")}
            className="navhomeHome hover:text-white cursor-pointer flex items-center gap-[9px]  transition-all rounded-3xl border border-green-600 hover:bg-green-600  py-[7px] px-[20px] "
          >
            <i className="fa fa-dashboard"></i>
          </div>
        )}
      </div>
    </>
  );
};

export default NavHome;
