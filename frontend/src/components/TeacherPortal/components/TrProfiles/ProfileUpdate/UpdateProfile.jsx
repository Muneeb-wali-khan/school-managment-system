import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorsUserProfile,
  updateProfileUser,
} from "../../../../../store/features/user.reducer";

const UpdateProfile = ({ isOpenProfile, onCloseProfile }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");

  const dispatch = useDispatch();
  const { userProfile, loadingUser, errorUser3, msgUser3 } = useSelector(
    (state) => state?.profile?.userProfile
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileUser({ email, fullName }));
  };

  useEffect(() => {
    if (msgUser3 ) {
      toast.success(msgUser3);
      onCloseProfile();
    }
    if (errorUser3) {
      toast.error(errorUser3);
    }
    dispatch(clearErrorsUserProfile());
  }, [msgUser3, errorUser3]);

  useEffect(() => {
    if (userProfile) {
      setEmail(userProfile?.email || "");
      setFullName(userProfile?.fullName || "");
    }
  }, [userProfile?.email, userProfile?.fullName]);

  return (
    <div className={`fixed inset-0 z-50 ${isOpenProfile ? "" : "hidden"}`}>
      <div className="flex items-center justify-center h-screen">
        <div
          onClick={() => onCloseProfile()}
          className="fixed inset-0 bg-black opacity-50"
        ></div>
        <div className="bg-gradient-to-r from-[#8D5ADD] to-[#794ACA] w-full sm:w-96 p-8 rounded-md shadow-md transform transition-transform duration-300 hover:scale-105 z-50 mx-4 sm:mx-auto">
          <h2 className="text-2xl sm:text-2xl font-bold text-white mb-6 flex items-center justify-center gap-4">
            Update Profile
            <i className="fa fa-user"></i>
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <label
                htmlFor="new email"
                className="block text-white font-semibold mb-2"
              >
                New Email:
              </label>
              <div className="flex items-center">
                <input
                  disabled={loadingUser ? true : false}
                  name="email"
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                  required
                />
              </div>
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="new full Name"
                className="block text-white font-semibold mb-2"
              >
                New Full Name:
              </label>
              <div className="flex items-center">
                <input
                  disabled={loadingUser ? true : false}
                  name="fullName"
                  value={fullName}
                  type="text"
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                  required
                />
              </div>
            </div>

            <button
              disabled={loadingUser ? true : false}
              type="submit"
              className="bg-white hover:bg-gray-300 text-blue-500 py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-300 w-full"
            >
              {loadingUser ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
