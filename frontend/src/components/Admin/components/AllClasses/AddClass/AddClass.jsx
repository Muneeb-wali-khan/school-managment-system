import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminAddClass,
  adminFetchAllClasses,
  clearErrorClasses,
} from "../../../../../store/features/admin.reducers";
import toast from "react-hot-toast";

const AddClass = ({ isOpenClassAdd, onCloseClassAdd }) => {
  const dispatch = useDispatch();
  const { loadingCls, msgCls, errCls } = useSelector(
    (state) => state?.admin?.classes
  );
  const [data, SetAddData] = useState({
    className: "",
    email: "",
    fullName: "",
    subjects: "",
  });

  const handleChange = (e) => {
    SetAddData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminAddClass(data));
  };

  useEffect(() => {
    if (msgCls) {
      toast.success(msgCls);
      dispatch(adminFetchAllClasses());
      onCloseClassAdd();
    }
    if (errCls) {
      toast.error(errCls);
    }
    dispatch(clearErrorClasses());
  }, [dispatch, msgCls, errCls]);

  return (
    <>
      <div className={`fixed inset-0 z-50 ${isOpenClassAdd ? "" : "hidden"}`}>
        <div className="flex items-center justify-center h-screen">
          <div
            onClick={() => onCloseClassAdd()}
            className="fixed inset-0 bg-black opacity-50"
          ></div>
          <div
            className="
        custom-scrollbar
        bg-gradient-to-r from-[#8b008bef] to-[#861686] w-full  max-h-[100%] sm:w-96 p-8 rounded-md shadow-md transform transition-transform duration-300 hover:scale-105 z-50 mx-4 sm:mx-auto"
          >
            <h2 className="text-2xl sm:text-2xl font-bold text-white mb-6 flex items-center justify-center gap-4">
              Add New Subject
              <i className="fa fa-plus"></i>
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4 relative">
                <label
                  htmlFor="className"
                  className="block text-white font-semibold mb-2"
                >
                  Class Name: <span className=" text-yellow-400">*</span>
                </label>
                <div className="flex items-center">
                  <input
                    disabled={loadingCls ? true : false}
                    name="className"
                    type="text"
                    value={data?.className}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                  />
                </div>
              </div>

              <div className="mb-4 relative">
                <label
                  htmlFor="Teacher email"
                  className="block text-white font-semibold mb-2"
                >
                  Class Teacher Email:
                </label>
                <div className="flex items-center">
                  <input
                    disabled={loadingCls ? true : false}
                    name="email"
                    type="email"
                    value={data?.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                  />
                </div>
              </div>

              <div className="mb-4 relative">
                <label
                  htmlFor="Teacher fullName"
                  className="block text-white font-semibold mb-2"
                >
                  Class Teacher fullName:
                </label>
                <div className="flex items-center">
                  <input
                    disabled={loadingCls ? true : false}
                    name="fullName"
                    type="text"
                    value={data?.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                  />
                </div>
              </div>

              <div className="mb-4 relative">
                <label
                  htmlFor="Class Subjects"
                  className="block text-white font-semibold mb-2"
                >
                  Subjects{" "}
                  <span className=" text-xs">
                    ex: subject 1, subject 2, etc
                  </span>{" "}
                  : <span className=" text-yellow-400">*</span>
                </label>
                <div className="flex items-center">
                  <input
                    disabled={loadingCls ? true : false}
                    type="text"
                    value={data?.subjects}
                    onChange={handleChange}
                    name="subjects"
                    className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                  />
                </div>
              </div>

              <button
                disabled={loadingCls ? true : false}
                type="submit"
                className="bg-white hover:bg-gray-300 text-blue-500 py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-300 w-full"
              >
                {loadingCls ? "Submitting..." : "Add Class"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddClass;
