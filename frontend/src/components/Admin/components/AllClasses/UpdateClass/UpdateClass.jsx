import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminFetchAllClasses,
  adminFetchSingleClass,
  adminUpdateClass,
  clearErrorClasses,
} from "../../../../../store/features/admin.reducers";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import LoaderAn from "../../../LoaderAn/LoaderAn";

const UpdateClass = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { loadingCls, errUptCls, msgUptCls, singleCls } = useSelector(
    (state) => state?.admin?.classes
  );
  const [data, SetUpdateData] = useState({
    className: "",
    email: "",
    fullName: "",
    subjects: "",
  });

  const handleChange = (e) => {
    SetUpdateData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(adminFetchSingleClass(params?.id));
  }, [dispatch, params?.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    dispatch(adminUpdateClass({ id: params?.id, data: data }));
  };

  useEffect(() => {
    if (msgUptCls) {
      toast.success(msgUptCls);
      dispatch(adminFetchAllClasses());
      handleClose();
    }
    if (errUptCls) {
      toast.error(errUptCls);
    }
    clearErrorClasses();
  }, [dispatch, msgUptCls, errUptCls]);

  useEffect(() => {
    if (singleCls) {
      SetUpdateData({
        // uncontrolled input error come from here
        className: singleCls?.className?.toLowerCase(),
        email: singleCls?.classTeacherID?.email || "",
        fullName: singleCls?.classTeacherID?.fullName || "",
        subjects: singleCls?.subjects?.map((val) => val?.subjectName),
      });
    }
  }, [singleCls]);

  const handleClose = () => {
    navigate("/admin-portal/admin-all-classes");
  };

  return (
    <>
      {loadingCls ? (
        <LoaderAn />
      ) : (
        <div className={`fixed inset-0`}>
          <div className="flex items-center justify-center h-screen">
            <div
              onClick={handleClose}
              className="fixed inset-0 bg-black opacity-50"
            ></div>
            <div
              className="
                custom-scrollbar
                bg-gradient-to-r from-[#8b008bef] to-[#861686] w-full  max-h-[100%] sm:w-96 p-8 rounded-md shadow-md transform transition-transform duration-300 hover:scale-105 z-50 mx-4 sm:mx-auto"
            >
              <h2 className="text-2xl sm:text-2xl font-bold text-white mb-6 flex items-center justify-center gap-4">
                Update Class
                <i className="fa fa-pen"></i>
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
                  {loadingCls ? "Submitting..." : "Update Class"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateClass;
