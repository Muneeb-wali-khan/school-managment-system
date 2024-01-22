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

       <div className="navhomeHome bg-green-600 transition-all text-white rounded-3xl border border-green-600 hover:bg-transparent hover:text-green-600 py-[7px] px-[20px] ">
        <Link to='/'>Home</Link>
       </div>
      </div>
    </>
  );
};

export default NavHome;
