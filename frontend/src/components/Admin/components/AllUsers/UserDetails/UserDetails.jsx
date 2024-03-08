import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import AnNav from "../../../Navbar/AnNav";
import {
  adminFetchSingleUserWebApp,
  adminUpdateUserAvatarWebApp,
  clearErrorUsersWeb,
} from "../../../../../store/features/admin.reducers";
import LoaderAn from "../../../LoaderAn/LoaderAn";

const UserDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const {
    errUsersWeb,
    msgUsersWeb,
    loadingUsersWeb,
    singleUserWeb,
    errUptUsersAvtWeb,
    msgUptUsersAvtWeb,
  } = useSelector((state) => state.admin.users);

  const [Avatar, setAvatar] = useState("");
  const [avatarPreveiw, setAvatarPreveiw] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(adminFetchSingleUserWebApp(params?.id));
  }, [params?.id, dispatch]);

  const handleAvatarSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("avatar", Avatar);
    dispatch(adminUpdateUserAvatarWebApp({ id: params?.id, data: formdata }));
  };

  const handleAcademicRecord = () => {
    toast.error("Comming soon....");
  };

  useEffect(() => {
    if (msgUsersWeb || msgUptUsersAvtWeb) {
      toast.success(msgUsersWeb || msgUptUsersAvtWeb);
      dispatch(adminFetchSingleUserWebApp(params?.id));
      setAvatarPreveiw(null);
    }
    if (errUsersWeb || errUptUsersAvtWeb) {
      toast.error(errUsersWeb || errUptUsersAvtWeb);
    }
    dispatch(clearErrorUsersWeb());
  }, [msgUsersWeb, errUsersWeb,errUptUsersAvtWeb, msgUptUsersAvtWeb, dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    const veiwImg = URL.createObjectURL(file);
    setAvatarPreveiw(veiwImg);
  };

  const handleModalShow = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleMenuClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0  bg-black bg-opacity-75 flex items-center z-50 justify-center transition-all">
          <div className="bg-white p-4 rounded-md">
            <img
              className="object-contain h-[30rem] w-[30rem]"
              src={avatarPreveiw || (singleUserWeb && singleUserWeb?.avatar)}
              alt="Full View"
            />
            <button
              onClick={handleModalClose}
              className="absolute top-5 right-5 text-white py-2 px-3 bg-[#00000052] rounded-full"
            >
              <i className="fa fa-times font-extrabold"></i>
            </button>
          </div>
        </div>
      )}

      <div className="p-[1.25rem] w-4/5 navdashMain">
        <AnNav />
        {loadingUsersWeb ? (
          <LoaderAn />
        ) : (
          <div className=" w-[100%] stprofile relative shadow-lg border-2 border-[#8b008b94] shadow-[#8b008bbd]  rounded-md p-6 overflow-hidden mt-6">
            {/* small menu */}
            <div className=" absolute top-0 right-0 text-black m-4 text-sm z-50">
              <button
                onClick={handleMenuClick}
                className="py-2 px-4 text-[1.125rem] rounded-full shadow-[#8b008bbd] shadow-md focus:outline-none transition duration-300 transform hover:scale-105"
              >
                <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
              </button>
              {isMenuOpen && (
                <div className="origin-top-right z-50 absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <p
                      onClick={handleAcademicRecord}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Academic History
                    </p>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile History
                    </Link>
                    {/* Add more menu items as needed */}
                  </div>
                </div>
              )}
            </div>

            {/* avatar + fullname + rollno */}
            <div className="flex  flex-col gap-1 justify-center items-center ">
              <div className="relative group">
                {/* Hidden input for choosing a new image */}
                <input
                  type="file"
                  id="avatarInput"
                  name="avatar"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <img
                  onClick={handleModalShow}
                  className="object-cover object-center w-[120px] h-[120px] rounded-full cursor-pointer"
                  src={avatarPreveiw ? avatarPreveiw : singleUserWeb?.avatar}
                  alt={`${singleUserWeb && singleUserWeb?.fullName} Avatar`}
                />
                {/* Pen icon */}
                <div className="absolute text-xs bg-[#00000054] top-0 right-0 group-hover:opacity-100 p-2 opacity-50 transition-opacity duration-300">
                  {/* Font Awesome pen icon */}
                  <label htmlFor="avatarInput">
                    <i className="fas fa-pen text-white cursor-pointer"></i>
                  </label>
                </div>
              </div>
              {avatarPreveiw && avatarPreveiw ? (
                <div className="flex justify-center items-center mt-2 mb-3 text-sm">
                  <button
                    onClick={handleAvatarSubmit}
                    className="bg-gradient-to-r from-[#8b008bef] to-[#861686e8]  text-white hover:bg-slate-100 border-2 hover:border-2  py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-300"
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <>
                  <h2 className=" text-xl font-semibold text-gray-800 mb-2">
                    {singleUserWeb && singleUserWeb?.fullName}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Role : {singleUserWeb && singleUserWeb?.role}
                  </p>
                </>
              )}
            </div>

            {/* remaining users details */}
            <div>
              <table className="w-full">
                <tbody className=" text-sm">
                  <tr className="border-2 mb-2">
                    <td className="font-semibold p-2">First Name:</td>
                    <td>{singleUserWeb && singleUserWeb?.firstName}</td>
                  </tr>
                  <tr className="border-2 mb-2">
                    <td className="font-semibold p-2">User Name:</td>
                    <td>{singleUserWeb && singleUserWeb?.username}</td>
                  </tr>
                  <tr className="border-2 mb-2">
                    <td className="font-semibold p-2">Full Name:</td>
                    <td>{singleUserWeb && singleUserWeb?.fullName}</td>
                  </tr>
                  <tr className="border-2 mb-2">
                    <td className="font-semibold p-2">Created At:</td>
                    <td>
                      {singleUserWeb &&
                        new Date(singleUserWeb?.createdAt).toLocaleString(
                          "en-US",
                          {
                            year: "numeric",
                            day: "numeric",
                            month: "short",
                          }
                        )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserDetails;
