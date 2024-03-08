import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminFetchAllUsersWebApp,
  adminFetchSingleUserWebApp,
  adminUpdateUserWebApp,
  clearErrorUsersWeb,
} from "../../../../../store/features/admin.reducers";
import toast from "react-hot-toast";

const UpdateUserRole = ({
  isOpenUpdateUserWeb,
  onCloseUpdateUserWeb,
  isUserUptId,
}) => {
  const dispatch = useDispatch();
  const { loadingUsersWeb, singleUserWeb, msgUptUsersWeb, errUptUsersWeb } =
    useSelector((state) => state?.admin?.users);
  const [role, setRole] = useState("");

  useEffect(() => {
    if (isUserUptId) {
      dispatch(adminFetchSingleUserWebApp(isUserUptId));
    }
  }, [dispatch, isUserUptId]);

  useEffect(() => {
    if (singleUserWeb) {
      setRole(singleUserWeb?.role);
    }
  }, [singleUserWeb]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminUpdateUserWebApp({ id: isUserUptId, role}));
  };

  useEffect(() => {
    if (msgUptUsersWeb) {
      toast.success(msgUptUsersWeb);
      dispatch(adminFetchAllUsersWebApp());
      onCloseUpdateUserWeb();
    }
    if (errUptUsersWeb) {
      toast.error(errUptUsersWeb);
    }
    dispatch(clearErrorUsersWeb());
  }, [dispatch, msgUptUsersWeb, errUptUsersWeb]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 ${isOpenUpdateUserWeb ? "" : "hidden"}`}
      >
        <div className="flex items-center justify-center h-screen">
          <div
            onClick={onCloseUpdateUserWeb}
            className="fixed inset-0 bg-black opacity-50"
          ></div>
          <div
            className="
        custom-scrollbar
        bg-gradient-to-r from-[#8b008bef] to-[#861686] w-full  max-h-[100%] sm:w-96 p-8 rounded-md shadow-md transform transition-transform duration-300 hover:scale-105 z-50 mx-4 sm:mx-auto"
          >
            <h2 className="text-2xl sm:text-2xl font-bold text-white mb-6 flex items-center justify-center gap-4">
              Update User Role
              <i className="fa fa-user"></i>
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4 relative">
                <label
                  htmlFor="role"
                  className="block text-white font-semibold mb-2"
                >
                  Role : <span className=" text-yellow-400">*</span>
                </label>
                <div className="flex items-center">
                  <input
                    disabled={loadingUsersWeb ? true : false}
                    name="role"
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                  />
                </div>
              </div>

              <button
                disabled={loadingUsersWeb ? true : false}
                type="submit"
                className="bg-white hover:bg-gray-300 text-blue-500 py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-300 w-full"
              >
                {loadingUsersWeb ? "Submitting..." : "Update Role"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUserRole;
