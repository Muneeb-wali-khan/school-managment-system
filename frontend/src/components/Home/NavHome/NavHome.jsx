import React from "react";
import { Link } from "react-router-dom";

const NavHome = () => {
  return (
    <>
      <div className="bg-gray-50 shadow-lg shadow-gray-300 p-5 px-10 gap-12 text-green-600 flex justify-between items-center navHome">
        <div className="logo">
          <h2 className="text-2xl font-extrabold">APSACS</h2>
        </div>
        <div>
          <h1 className="text-2xl font-bold uppercase">
            welcome to Army public school sadda portal
          </h1>
        </div>

        <Link to="/">
          <div className="navhomeHome hover:text-white  transition-all rounded-3xl border border-green-600 hover:bg-green-600  py-[7px] px-[20px] ">
            Home
          </div>
        </Link>
      </div>
    </>
  );
};

export default NavHome;
