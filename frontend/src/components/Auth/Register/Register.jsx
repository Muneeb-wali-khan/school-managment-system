import React, { useEffect, useState } from "react";
import NavHome from "../../Home/NavHome/NavHome";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrorsAuth } from "../../../store/features/regLogin";
import { toast } from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const { loadingAuth, msgAuth, errorAuth } = useSelector(
    (state) => state?.user?.userAuth
  );

  const navigate = useNavigate();
  const logerNamed = sessionStorage.getItem("logerName");
  const [avatar, setAvatar] = useState("");
  const [avatarView, setAvatarView] = useState(null);

  const [user, setUser] = useState({
    username: "",
    firstname: "",
    fullname: "",
    email: "",
    role: logerNamed && logerNamed?.toLocaleLowerCase(),
    uniqueCode: "",
    password: "",
    avatar: "",
  });

  const handleInputChnage = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", user.username);
    data.append("firstName", user.firstname);
    data.append("fullName", user.fullname);
    data.append("email", user.email);
    data.append("role", user.role);
    data.append("uniqueCode", user.uniqueCode);
    data.append("password", user.password);
    data.append("avatar", user?.avatar);
    dispatch(register(data));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    const seeImage = URL.createObjectURL(file);
    setAvatarView(seeImage);

    setUser({ ...user, avatar: file });
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
    navigate("/registers");
  };
  return (
    <>
      <NavHome />
      <div>
        <button
          onClick={handlePrev}
          className="py-[7px] px-[15px] regbtn ml-[34px] mt-[20px] rounded-lg bg-green-700 text-white"
        >
          {/* <i  className='fa fa-arrow-left'></i> */}
          <i className="fa fa-arrow-left "> </i> Back
        </button>
      </div>
      <div className="flex justify-center  h-full p-3 m-4 regform">
        <form
          onSubmit={handleSubmit}
          action=""
          encType="multipart/form-data"
          className=" sm:max-wi-[320px] shadow-2xl  border-gray-500  rounded-xl  border max-w-[100%] w-[800px] py-9 pb-12 px-9 gap-4 flex flex-col   bg-gradient-to-r text-gray-500"
        >
          <h3 className="font-bold text-2xl text-center m-0 p-0">
            Register {logerNamed && logerNamed ? logerNamed : "Form"}
          </h3>
          <div className="w-[8.5rem] h-1 bg-white relative bottom-4 left-[70px] my-2"></div>
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-bold text-md">
              Username
            </label>
            <input
              onChange={handleInputChnage}
              type="text"
              name="username"
              className="bg-gray-200 p-2 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-bold text-md">
              Firstname
            </label>
            <input
              onChange={handleInputChnage}
              type="text"
              name="firstname"
              className="bg-gray-200 p-2 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-bold text-md">
              Fullname
            </label>
            <input
              onChange={handleInputChnage}
              type="text"
              name="fullname"
              className="bg-gray-200 p-2 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-bold text-md">
              Email
            </label>
            <input
              onChange={handleInputChnage}
              type="email"
              name="email"
              className="bg-gray-200 p-2 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-bold text-md">
              Role
            </label>
            <input
              onChange={handleInputChnage}
              type="text"
              disabled
              value={
                logerNamed && logerNamed
                  ? logerNamed?.toLocaleLowerCase()
                  : "no role provided"
              }
              name="role"
              className="bg-gray-200 p-2 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-bold text-md">
              Unique code for{" "}
              {logerNamed && logerNamed
                ? logerNamed.toLocaleLowerCase()
                : "no role provided"}
            </label>
            <input
              onChange={handleInputChnage}
              type="text"
              name="uniqueCode"
              className="bg-gray-200 p-2 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-bold text-md">
              Password
            </label>
            <input
              autoComplete="true"
              onChange={handleInputChnage}
              type="password"
              name="password"
              className="bg-gray-200 p-2 rounded-lg"
            />
          </div>

          <div className="flex items-center gap-8 registerAvatar">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-bold text-md">
                Avatar
              </label>
              <input
                onChange={handleImage}
                type="file"
                name="avatar"
                className="bg-gray-200 p-2 rounded-lg"
              />
            </div>

            {avatarView ? (
              <img
                src={avatarView}
                alt={avatar}
                width={50}
                height={50}
                className=" rounded-full"
              />
            ) : (
              <img
                src="/5. College Student.png"
                alt=""
                width={50}
                height={50}
                className=" rounded-full"
              />
            )}
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

export default Register;
