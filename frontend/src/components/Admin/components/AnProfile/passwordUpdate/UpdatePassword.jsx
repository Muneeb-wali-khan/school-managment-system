import { useEffect, useState } from "react";
import {
  clearErrorsUserProfile,
  updatePasswordUser,
} from "../../../../../store/features/user.reducer";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

const UpdatePassword = ({ isOpen, onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showOldPass, setShowOldPass] = useState("text");
  const [showNewPass, setShowNewPass] = useState("text");

  const dispatch = useDispatch();
  const { loadingUser, errorUser2, msgUser2, } = useSelector(
    (state) => state?.profile?.userProfile
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePasswordUser({ oldPassword, newPassword }));
  };

  useEffect(() => {
    if (msgUser2) {
      onClose();
      toast.success(msgUser2);
    }
    if (errorUser2) {
      toast.error(errorUser2);
    }
    dispatch(clearErrorsUserProfile());
  }, [msgUser2, errorUser2]);

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "hidden"}`}>
      <div className="flex items-center justify-center h-screen">
        <div
          onClick={() => onClose()}
          className="fixed inset-0 bg-black opacity-50"
        ></div>
        <div className="bg-gradient-to-r from-[#8b008bef] to-[#861686] w-full sm:w-96 p-8 rounded-md shadow-md transform transition-transform duration-300 hover:scale-105 z-50 mx-4 sm:mx-auto">
          <h2 className="text-2xl sm:text-2xl font-bold text-white mb-6 flex items-center justify-center gap-4">
            Update Password
            <i className="fa fa-key"></i>
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <label
                htmlFor="oldPassword"
                className="block text-white font-semibold mb-2"
              >
                Old Password:
              </label>
              <div className="flex items-center">
                <input
                  name="oldPassword"
                  autoComplete="true"
                  type={showOldPass ? "password" : "text"}
                  value={oldPassword}
                  disabled={loadingUser ? true : false}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                  required
                />
                <i
                  className={`far fa-eye${
                    showOldPass ? "-slash" : ""
                  } text-white ml-2 cursor-pointer absolute right-3`}
                  onClick={() => setShowOldPass(!showOldPass)}
                ></i>
              </div>
            </div>

            <div className="mb-6 relative">
              <label
                htmlFor="newPassword"
                className="block text-white font-semibold mb-2"
              >
                New Password:
              </label>
              <div className="flex items-center">
                <input
                  name="newPassword"
                  autoComplete="true"
                  type={showNewPass ? "password" : "text"}
                  value={newPassword}
                  disabled={loadingUser ? true : false}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                  required
                />
                <i
                  className={`far fa-eye${
                    showNewPass ? "-slash" : ""
                  } text-white ml-2 cursor-pointer absolute right-3`}
                  onClick={() => setShowNewPass(!showNewPass)}
                ></i>
              </div>
            </div>

            <button
              disabled={loadingUser ? true : false}
              type="submit"
              className="bg-white hover:bg-gray-300 text-blue-500 py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-300 w-full"
            >
              {loadingUser ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
