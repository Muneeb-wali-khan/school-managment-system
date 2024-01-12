import React from "react";
import { Link } from "react-router-dom";

const NavHome = () => {
  return (
    <>
      <div className="bg-[green] p-5 px-10 gap-12 text-white flex justify-between items-center navHome">
        <div className="logo">
          <h2 className="text-2xl font-bold">APSACS</h2>
        </div>
       <div>
       <h1 className="text-2xl font-semibold uppercase">
        welcome to Army public school sadda portal
        </h1>
       </div>

       <div className="navhomeHome rounded-3xl border border-white py-[7px] px-[20px] ">
        <Link to='/'>Home</Link>
       </div>
      </div>
    </>
  );
};

export default NavHome;
