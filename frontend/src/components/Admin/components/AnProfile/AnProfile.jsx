import React, { useEffect, useState } from 'react'
import {
    clearErrorsUserProfile,
    profileUser,
    updateAvatarUser,
  } from "../../../../store/features/user.reducer";
  import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import AnNav from '../../Navbar/AnNav';
import UpdatePassword from '../AnProfile/passwordUpdate/UpdatePassword'
import UpdateProfile from '../AnProfile/ProfileUpdate/UpdateProfile'
import LoaderAn from '../../LoaderAn/LoaderAn';
  

const AnProfile = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [avatar, setAvatar] = useState("");
    const [avatarView, setAvatarView] = useState(null);
    const [isModalOpenProfile, setIsModalOpenProfile] = useState(false);
    const [isModalOpenAvatar, setIsModalOpenAvatar] = useState(false);
    const dispatch = useDispatch();
    const { userProfile, loadingUser, errorUser4, msgUser4 } = useSelector(
      (state) => state?.profile?.userProfile
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
        dispatch(profileUser());
        setAvatarView(null);
      }
      if (errorUser4) {
        toast.error(errorUser4);
      }
      dispatch(clearErrorsUserProfile());
    }, [msgUser4, errorUser4]);
  
    const handleModalShow = () => {
      setIsModalOpenAvatar(true);
    };
  
    const handleModalClose = () => {
      setIsModalOpenAvatar(false);
    };


  return (
    <>
    {/* Modal */}
    {isModalOpenAvatar && (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex z-50 items-center justify-center transition-all">
        <div className="bg-white p-4 rounded-md">
          <img
            className="object-contain h-[30rem] w-[30rem]"
            src={userProfile?.avatar || ""}
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
      {loadingUser ? (
        <LoaderAn />
      ) : (
        <>
          <div className="flex w-full h-auto mt-8  gap-12 flex-wrap trprofile">

            {/* user info */}
            <div className=" w-[100%]  h-[100%] border-2 border-[#8b008b94] shadow-lg shadow-[#8b008bbd] px-1 py-5 TeacherprofileDiv rounded-lg text-gray-700">
              <h2 className="font-bold text-gray-600 mb-4  mx-5 mt-4">
                Profile Information :{" "}
              </h2>

              {/* user avatar */}
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
                    onClick={handleModalShow}
                    src={avatarView ? avatarView : userProfile && userProfile?.avatar}
                    className="w-[110px] h-[110px] rounded-full mb-2 cursor-pointer"
                    alt={userProfile && userProfile?.avatar}
                  />
                  {/* Pen icon */}
                  <div className="absolute bg-[#00000044] top-0 right-0 group-hover:opacity-100 p-2 opacity-50 transition-opacity duration-300">
                    {/* Font Awesome pen icon */}
                    <label htmlFor="avatarInput">
                      <i className="fas fa-pen text-white cursor-pointer"></i>
                    </label>
                  </div>
                </div>
                {avatarView && avatarView !== null ? (
                  <div className="flex justify-center items-center mt-1 text-sm">
                    <button
                      onClick={handleAvatarSubmit}
                      className="bg-gradient-to-r from-[#8B008B] to-[#8B008B] text-white hover:bg-slate-100 border-2 hover:border-2  py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-300"
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <>
                  <p className='mt-1 text-[15px]'>{userProfile?.fullName.toUpperCase()}</p>
                  <p className='mt-[4px]'>{userProfile?.role}</p>
                  </>
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
                      className="bg-gradient-to-r from-[#8b008bef] to-[#861686] border-2 hover:border-2 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-300"
                    >
                      Update Password
                    </button>
                    <button
                      onClick={openModalProfile}
                      className="bg-gradient-to-r from-[#8b008bef] to-[#861686] border-2 hover:border-2 text-white  py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-green-300"
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
  )
}

export default AnProfile
