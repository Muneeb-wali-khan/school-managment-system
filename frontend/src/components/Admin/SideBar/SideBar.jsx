import React from "react";
import MobileSideBar from "./MobileSideBar/MobileSideBar"
import { Link } from "react-router-dom";

const SideBar = () => {
  return (

    <>
      {/* <!-- Left Sidebar --> */}
      <div className="w-[16%] h-[128vh] p-[10px] sidebar rounded-[32px] m-[20px] bg-[darkmagenta] text-white">
        {/* <!-- logo div  --> */}
        <div className="w-100 flex items-center justify-center pt-3 h-32">
          <img src="/Frame 47.png" height="50" width="100" alt="" />
        </div>

        {/* <!-- icons div --> */}
        <div className="w-100 flex mt-14 pb-5 flex-col justify-between h-[93vh] pl-7">
          <div className="flex flex-col gap-10">
            <div className="flex gap-5 items-center">
              <a>
                <i className="fa-brands fa-windows" style={{color: "#ffffff"}}>
                  {" "}
                </i>
              </a>
              <Link to="/admin-portal/admin-dash" className="cursor-pointer font-semibold">
                Dashboard
              </Link>
            </div>

            <div className="flex gap-4 items-center">
              <a>
                <i className="fa fa-credit-card" style={{color: "#ffffff"}}>
                  {" "}
                </i>
              </a>
              <Link
                to="/admin-portal/admin-payments"
                className="cursor-pointer font-semibold text-gray-200 hover:text-white transition-all"
              >
                Payment Info
              </Link>
            </div>

            <div className="flex gap-3 items-center">
              <a>
                <i className="fa fa-user-plus mr-[2px]" style={{color: "#ffffff"}}>
                  {" "}
                </i>
              </a>
              <Link
                to="/admin-portal/admin-registeration"
                className="cursor-pointer font-semibold text-gray-200 hover:text-white transition-all"
              >
                Registeration
              </Link>
            </div>

            <div className="flex gap-4 items-center">
              <a>
                <i className="fa fa-book-open mr-[1px]" style={{color: "#ffffff"}}>
                  {" "}
                </i>
              </a>
              <a
                href="/dashboard"
                className="cursor-pointer font-semibold text-gray-200 hover:text-white transition-all"
              >
                Courses
              </a>
            </div>

            <div className="flex gap-5 items-center">
              <a>
                <i className="fa fa-file-excel mr-[3px]" style={{color: "#ffffff"}}>
                  {" "}
                </i>
              </a>
              <a
                href="/dashboard"
                className="cursor-pointer font-semibold text-gray-200 hover:text-white transition-all"
              >
                Drop Semisters
              </a>
            </div>

            <div className="flex gap-5 items-center">
              <a>
                <i
                  className="fa fa-square-poll-vertical mr-[1px]"
                  style={{color: "#ffffff"}}
                ></i>
              </a>
              <a
                href="/dashboard"
                className="cursor-pointer font-semibold text-gray-200 hover:text-white transition-all"
              >
                Results
              </a>
            </div>

            <div className="flex gap-4 items-center">
              <a>
                <i className="fa fa-message mr-[3px]" style={{color: "#ffffff"}}>
                  {" "}
                </i>
              </a>
              <a
                href="/dashboard"
                className="cursor-pointer font-semibold text-gray-200 hover:text-white transition-all"
              >
                Notice
              </a>
            </div>
          </div>

          {/* <!-- logout div --> */}
          <div className="flex gap-4 items-center">
            <a>
              <i
                className="fa fa-right-from-bracket mr-[3px]"
                style={{color: "#ffffff"}}
              ></i>
            </a>
            <a className="cursor-pointer font-semibold text-gray-200 hover:text-white transition-all">
              Logout
            </a>
          </div>
        </div>
      </div>
      <MobileSideBar/>
    </>
  );
};

export default SideBar;
