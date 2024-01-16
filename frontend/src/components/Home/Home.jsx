import React from "react";
import { Link } from "react-router-dom";
import NavHome from "./NavHome/NavHome";
import { useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <>
      <NavHome />

      <div className="flex bg-[url('/banner2.jpg')] bg-no-repeat bg-cover bg-bottom max-w-[100%] min-h-[100vh] h-[100vh] justify-center gap-12 flex-wrap  pt-20">
        <Link to="/logins">
          <div className=" bg-[white] rounded-full  hover:bg-[green]  text-black hover:text-white cursor-pointer transition-all gap-5 flex-col shadow-2xl w-[230px] h-[230px]  flex items-center justify-center   border-[2px] hover:border-[white] ">
            <div className="flex justify-center items-center flex-col">
              <i className="fa fa-user text-5xl"></i>
            </div>
            <div className="">
              <h3 className=" font-medium text-xl">Login</h3>
            </div>
          </div>
        </Link>

        <Link to="/registers">
          <div className=" bg-[white] rounded-full  hover:bg-[green]  text-black hover:text-white cursor-pointer transition-all gap-5 flex-col shadow-2xl w-[230px] h-[230px]  flex items-center justify-center   border-[2px] hover:border-[white] ">
            <div className="flex justify-center items-center flex-col">
              <i className="fa fa-user-plus text-5xl"></i>
            </div>
            <div className="">
              <h3 className=" font-medium text-xl">Register</h3>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Home;
