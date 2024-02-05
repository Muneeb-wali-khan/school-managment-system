import React, { useEffect, useState } from "react";
import TrNav from "../../Navbar/TrNav";
import { useDispatch, useSelector } from "react-redux";
import UpdatePassword from "./passwordUpdate/UpdatePassword";
import UpdateProfile from "./ProfileUpdate/UpdateProfile";
import Loader from "../../../loader/Loader";
import {
  clearErrorsUserProfile,
  updateAvatarUser,
} from "../../../../store/features/user.reducer";
import toast from "react-hot-toast";

const TrProfiles = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [avatarView, setAvatarView] = useState(null);
  const [isModalOpenProfile, setIsModalOpenProfile] = useState(false);

  const dispatch = useDispatch();
  const { userProfile, loadingUser, errorUser4, msgUser4 } = useSelector(
    (state) => state?.profile?.userProfile
  );
  const { profileTeacher, loadingTeacher } = useSelector(
    (state) => state?.teacher?.teacherD
  );

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalProfile = () => {
    setIsModalOpenProfile(true);
  };

  const closeModalProfile = () => {
    setIsModalOpenProfile(false);
  };

  const handleAvatarSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatar);
    dispatch(updateAvatarUser(formData));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    const imageUrl = URL.createObjectURL(file);
    setAvatarView(imageUrl);
  };

  useEffect(() => {
    if (msgUser4) {
      toast.success(msgUser4);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (errorUser4) {
      toast.error(errorUser4);
    }
    dispatch(clearErrorsUserProfile());
  }, [msgUser4, errorUser4]);

  return (
    <>
      <div className="p-[1.25rem] w-4/5 navdashMain">
        <TrNav />
        {loadingTeacher || loadingUser ? (
          <Loader />
        ) : (
          <>
            {/* teacher information */}
            <div className="flex w-full h-auto mt-8  gap-12 flex-wrap trprofile">
              <div className=" w-[50%] shadow-lg border-2 border-[#8d5ade9d] shadow-[#6633996e] h-auto TeacherprofileDiv  p-3 py-5  rounded-lg text-gray-700">
                <h2 className="font-bold text-gray-600 mb-4 mx-5 mt-4">
                  Teacher Information :{" "}
                </h2>

                <div className="flex flex-col items-center justify-center mb-4">
                  <img
                    src={(profileTeacher && profileTeacher[0]?.avatar) || ""}
                    className="w-[110px] h-[110px] rounded-full mb-2"
                    alt=""
                  />
                  <p>
                    {profileTeacher &&
                      profileTeacher[0]?.fullName.toUpperCase()}
                  </p>
                </div>

                <div className="flex flex-col px-4">
                  <div className="flex items-center gap-4 border-2 border-[#80808023] py-1 px-3 ">
                    <p className=" font-medium">First Name : </p>
                    <p>{profileTeacher && profileTeacher[0]?.firstName}</p>
                  </div>

                  <div className="flex items-center gap-4 border-2 border-[#80808023] py-1 px-3 ">
                    <p className=" font-medium">Email : </p>
                    <p>{profileTeacher && profileTeacher[0]?.email}</p>
                  </div>

                  <div className="flex items-center gap-4 border-2 border-[#80808023] py-1 px-3 ">
                    <p className=" font-medium">DOB : </p>
                    <p>
                      {" "}
                      {new Date(
                        profileTeacher && profileTeacher[0]?.DOB
                      ).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 border-2 border-[#80808023] py-1 px-3 ">
                    <p className=" font-medium">Age : </p>
                    <p>{profileTeacher && profileTeacher[0]?.age}</p>
                  </div>

                  <div className="flex items-center gap-4 border-2 border-[#80808023] py-1 px-3 ">
                    <p className=" font-medium">Address : </p>
                    <p>{profileTeacher && profileTeacher[0]?.address}</p>
                  </div>

                  <div className="flex items-center gap-4 border-2 border-[#80808023] py-1 px-3 ">
                    <p className=" font-medium">Phone : </p>
                    <p>{profileTeacher && profileTeacher[0]?.phone}</p>
                  </div>

                  <div className="flex items-center gap-4 border-2 border-[#80808023] py-1 px-3 ">
                    <p className=" font-medium">Sallary : </p>
                    <p>
                      {profileTeacher && profileTeacher[0]?.sallary === 0
                        ? "N/A"
                        : profileTeacher && profileTeacher[0]?.sallary}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 border-2 border-[#80808023] py-1 px-3 ">
                    <p className=" font-medium">Joining Date : </p>
                    <p>
                      {" "}
                      {new Date(
                        profileTeacher && profileTeacher[0]?.joiningDate
                      ).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 border-2 border-[#80808023] py-1 px-3 ">
                    <p className=" font-medium">Status : </p>
                    <p
                      className={`${
                        profileTeacher && profileTeacher[0]?.status === "active"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {profileTeacher && profileTeacher[0]?.status}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 border-2 border-[#80808023] py-1 px-3 ">
                    <p className=" font-medium">Blood Group : </p>
                    <p>{profileTeacher && profileTeacher[0]?.bloodGroup}</p>
                  </div>

                  <div className="flex items-center gap-4 border-2 border-[#80808023] py-1 px-3 ">
                    <p className=" font-medium">Gender : </p>
                    <p>{profileTeacher && profileTeacher[0]?.gender}</p>
                  </div>

                  <div className="flex items-center gap-4 border-2 border-[#80808023] py-1 px-3 ">
                    <p className=" font-medium">Designation : </p>
                    <p>{profileTeacher && profileTeacher[0]?.designation}</p>
                  </div>

                  <div className="flex items-center gap-4 border-2 border-[#80808023] py-1 px-3 ">
                    <p className=" font-medium">Subject : </p>
                    <p>{profileTeacher && profileTeacher[0]?.subject}</p>
                  </div>

                  <div className="flex gap-1 border-2 border-[#80808023] py-1 px-3 ">
                    <p className=" font-medium">Classes Taught : </p>
                    <p className=" lowercase">
                      {profileTeacher &&
                        profileTeacher[0]?.classesTaught?.map((val) => (
                          <span key={val?.className}>{val?.className} </span>
                        ))}
                    </p>
                  </div>
                </div>
              </div>

              {/* user info */}
              <div className=" w-[40%]  h-[100%] border-2 border-[#8d5ade9d] shadow-lg shadow-[#6633996e] p-3 py-5 TeacherprofileDiv rounded-lg text-gray-700">
                <h2 className="font-bold text-gray-600 mb-4  mx-5 mt-4">
                  Profile Information :{" "}
                </h2>

                <div className="flex flex-col items-center justify-center mb-4 relative">
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
                      src={avatarView ? avatarView : userProfile?.avatar}
                      className="w-[110px] h-[110px] rounded-full mb-2"
                      alt={userProfile?.avatar}
                    />
                    {/* Pen icon */}
                    <div className="absolute bg-[#00000044] top-0 right-0 group-hover:opacity-100 p-2 opacity-50 transition-opacity duration-300">
                      {/* Font Awesome pen icon */}
                      <label htmlFor="avatarInput">
                        <i className="fas fa-pen text-white cursor-pointer"></i>
                      </label>
                    </div>
                  </div>
                  {avatarView ? (
                    <div className="flex justify-center items-center mt-1 text-sm">
                      <button
                        onClick={handleAvatarSubmit}
                        className="bg-gradient-to-r from-[#8D5ADD] to-[#794ACA] text-white hover:bg-slate-100 border-2 hover:border-2  py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-300"
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    <p>{userProfile?.fullName.toUpperCase()}</p>
                  )}
                </div>

                <div className="flex flex-col px-2">
                  <div className="flex items-center gap-4 border-2 border-[#80808023] py-1 px-3">
                    <p className="font-medium">UserName : </p>
                    <p>{userProfile?.username}</p>
                  </div>

                  <div className="flex items-center gap-4 border-2 border-[#80808023] py-1 px-3">
                    <p className=" font-medium">First Name : </p>
                    <p>{userProfile?.firstName}</p>
                  </div>

                  <div className="flex items-center gap-4 border-2 border-[#80808023] py-1 px-3">
                    <p className=" font-medium">Full Name : </p>
                    <p>{userProfile?.fullName}</p>
                  </div>

                  <div className="flex items-center gap-4 border-2 border-[#80808023] py-1 px-3">
                    <p className=" font-medium">Email : </p>
                    <p>{userProfile?.email}</p>
                  </div>

                  <div className="flex items-center gap-4 border-2 border-[#80808023] py-1 px-3">
                    <p className=" font-medium">Role : </p>
                    <p>{userProfile?.role}</p>
                  </div>

                  <div className="flex items-center gap-4 border-2 border-[#80808023] py-1 px-3">
                    <p className=" font-medium">Created At : </p>
                    <p>
                      {new Date(userProfile?.createdAt).toLocaleDateString(
                        "en-Us",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>

                <div className="container mx-auto  p-5 flex items-center justify-center">
                  <div className="bg-white w-full   transition-transform transform hover:scale-105">
                    {/* ... (existing code) ... */}

                    <div className="mt-12 flex gap-3 justify-center text-sm">
                      <button
                        onClick={openModal}
                        className="bg-gradient-to-r from-[#8D5ADD] to-[#794ACA] border-2 hover:border-2 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-300"
                      >
                        Update Password
                      </button>
                      <button
                        onClick={openModalProfile}
                        className="bg-gradient-to-r from-[#8D5ADD] to-[#794ACA] border-2 hover:border-2 text-white  py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-green-300"
                      >
                        Update Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <UpdatePassword isOpen={isModalOpen} onClose={closeModal} />
      <UpdateProfile
        isOpenProfile={isModalOpenProfile}
        onCloseProfile={closeModalProfile}
      />
    </>
  );
};

export default TrProfiles;
