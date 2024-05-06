import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetSingleNotification, adminUpdateNotification } from "../../../../../store/features/admin.reducers";

const UpdateNotification = ({
    isOpenUpdateNotification,
    onCloseUpdateNotification,
    isNotificationUptId
}) => {
  const dispatch = useDispatch();
  const {
    loadingTr,
    singleNotification,
  } = useSelector((state) => state.admin?.teachers);

  const [updatedNotification, setUpdatedNotification] = useState({
    title: "", 
    desc: "",
    fileLink: "",
    teacherFullName: "",
    teacherEmail: ""
  });

  useEffect(()=>{
   if(isNotificationUptId){
    dispatch(adminGetSingleNotification(isNotificationUptId))
   }
  },[dispatch, isNotificationUptId])

  const handleChange = (e) => {
    const {name, value} = e.target
    setUpdatedNotification({...updatedNotification, [name]: value})
  }

  const handleUpdateAssigment = (e) => {
    e.preventDefault();
    dispatch(adminUpdateNotification({id: isNotificationUptId, data: updatedNotification}))
    onCloseUpdateNotification()
  };

  useEffect(()=>{
    if(singleNotification){
      setUpdatedNotification({
        title: singleNotification && singleNotification.title,
        desc: singleNotification && singleNotification.desc,
        fileLink: singleNotification && singleNotification.fileLink || "",
        teacherFullName: singleNotification && singleNotification.teacherFullName || "",
        teacherEmail: singleNotification && singleNotification.teacherEmail || "",
      })
    }
  },[singleNotification])

  return (
    <>
      <div
        className={`fixed inset-0 z-50 ${
          isOpenUpdateNotification ? "" : "hidden"
        }`}
      >
        <div className="flex items-center justify-center h-screen">
          <div
            onClick={onCloseUpdateNotification}
            className="fixed inset-0 bg-black opacity-50"
          ></div>
          <div  className="
        custom-scrollbar
        bg-gradient-to-r from-[#8b008bef] to-[#861686] w-full  max-h-[70vh] overflow-y-scroll sm:w-96 p-8 rounded-md shadow-md transform transition-transform duration-300 hover:scale-105 z-50 mx-4 sm:mx-auto">
            <h2 className="text-2xl sm:text-2xl font-bold text-white mb-6 flex items-center justify-center gap-4">
              Update Notification
              <i className="fas fa-edit"></i>
            </h2>
            <form onSubmit={handleUpdateAssigment}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-white font-semibold mb-2"
                >
                  Title: <span className="text-yellow-400">*</span>
                </label>
                <input
                  name="title"
                  type="text"
                  value={updatedNotification.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="desc"
                  className="block text-white font-semibold mb-2"
                >
                  Description: <span className="text-yellow-400">*</span>
                </label>
                <textarea
                  name="desc"
                  type="text"
                  cols={10}
                  rows={3}
                  value={updatedNotification?.desc}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="fileLink"
                  className="block text-white font-semibold mb-2"
                >
                File Link:
                </label>
                <input
                  name="fileLink"
                  type="url"
                  value={updatedNotification.fileLink}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                />
              </div>
              {
                updatedNotification?.teacherFullName && updatedNotification?.teacherEmail ? (
                    <>
                    <div className="mb-4">
                    <label
                      htmlFor="teacherFullName"
                      className="block text-white font-semibold mb-2"
                    >
                    Teacher Full Name:
                    </label>
                    <input
                      name="teacherFullName"
                      type="text"
                      value={updatedNotification.teacherFullName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                    />
                  </div>

                    <div className="mb-4">
                    <label
                      htmlFor="teacherEmail"
                      className="block text-white font-semibold mb-2"
                    >
                    Teacher Email:
                    </label>
                    <input
                      name="teacherEmail"
                      type="email"
                      value={updatedNotification.teacherEmail}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                    />
                  </div>
                  </>
                ):(
                    null
                )
              }

              <button
                disabled={loadingTr}
                type="submit"
                className="bg-white hover:bg-gray-300 text-blue-500 py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-300 w-full"
              >
                {loadingTr ? "Updating..." : "Update Notification"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateNotification;
