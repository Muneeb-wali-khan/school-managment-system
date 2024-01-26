import React from "react";
import { Link } from "react-router-dom";
import NavHome from "./NavHome/NavHome";
import { useSelector } from "react-redux";

const Home = () => {
  const { userD } = useSelector((state) => state?.user?.userAuth);
  
  return (
    <>
      <NavHome />

      <div className="flex bg-[url('/banner2.jpg')] bg-no-repeat bg-cover bg-bottom max-w-[100%] min-h-[100vh] h-[100vh] justify-center gap-12 flex-wrap  pt-20">
        {userD !== null ? (
          <></>
        ) : (
          <>
            <Link to="/logins">
              <div className=" bg-green-800 rounded-full  hover:bg-green-900 text-white cursor-pointer transition-all gap-5 flex-col shadow-2xl w-[230px] h-[230px]  flex items-center justify-center   border-[2px] ">
                <div className="flex justify-center items-center flex-col">
                  <i className="fa fa-user text-5xl"></i>
                </div>
                <div className="">
                  <h3 className=" font-medium text-xl">Login</h3>
                </div>
              </div>
            </Link>

            <Link to="/registers">
              <div className=" bg-green-800 rounded-full  hover:bg-green-900 text-white cursor-pointer transition-all gap-5 flex-col shadow-2xl w-[230px] h-[230px]  flex items-center justify-center   border-[2px] ">
                <div className="flex justify-center items-center flex-col">
                  <i className="fa fa-user-plus text-5xl"></i>
                </div>
                <div className="">
                  <h3 className=" font-medium text-xl">Register</h3>
                </div>
              </div>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
