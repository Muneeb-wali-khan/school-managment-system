import React, { useEffect, useState } from "react";
import NavHome from "../../Home/NavHome/NavHome";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { clearErrorsAuth, login } from "../../../store/features/regLogin";

const Login = () => {
  const logerNamed = sessionStorage.getItem("logerName");

  const dispatch = useDispatch();
  const { loadingAuth, msgAuth, errorAuth } = useSelector(
    (state) => state?.user?.userAuth
  );

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target?.name]: e.target?.value });
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    dispatch(login(user));
  };

  useEffect(() => {
    if (msgAuth) {
      toast.success(msgAuth);
    }
    if (errorAuth) {
      toast.error(errorAuth);
    }
    dispatch(clearErrorsAuth());
  }, [msgAuth, errorAuth]);


  const handlePrev = () => {
    navigate("/logins");
  };

  return (
    <>
      <NavHome />
      <div>
        <button
          onClick={handlePrev}
          className="py-[7px] loginbtn px-[15px] ml-[34px] mt-[20px] rounded-lg bg-green-700 text-white"
        >
          {/* <i  className='fa fa-arrow-left'></i> */}
          <i className="fa fa-arrow-left "> </i> Back
        </button>
      </div>
      <div className="flex justify-center loginform  h-full p-3 m-4">
        <form
          onSubmit={handleSubmitLogin}
          action=""
          className=" sm:max-wi-[320px] shadow-2xl  border-gray-500  rounded-xl  border max-w-[380px] w-[800px] py-9 pb-12 px-9 gap-4 flex flex-col   bg-gradient-to-r text-gray-500"
        >
          <h3 className="font-bold text-2xl text-center m-0 p-0">
            Login {logerNamed && logerNamed ? logerNamed : "Form"}
          </h3>
          <div className="w-[8.5rem] h-1 bg-white relative bottom-4 left-[70px] my-2"></div>
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-bold text-md">
              Username
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="username"
              className="bg-gray-200 p-2 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-bold text-md">
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              className="bg-gray-200 p-2 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-bold text-md">
              Password
            </label>
            <input
              onChange={handleChange}
              autoComplete="true"
              type="password"
              name="password"
              className="bg-gray-200 p-2 rounded-lg"
            />
          </div>
          <div>
            <button className="font-bold px-2 py-2 mt-3 rounded-lg w-full bg-gray-300 hover:bg-gray-400 hover:text-white transition-all text-gray-600">
            {loadingAuth && loadingAuth ? "Submiting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
