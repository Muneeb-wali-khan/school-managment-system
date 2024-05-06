import React, { useEffect, useState } from "react";
import LoaderAn from "../../LoaderAn/LoaderAn";
import AnNav from "../../Navbar/AnNav";
import { useDispatch, useSelector } from "react-redux";
import {
  adminAllNotifications,
  adminRemoveNotification,
  clearErrorTeachers,
} from "../../../../store/features/admin.reducers";
import NotifyAll from "./NotifyAll/NotifyAll";
import NotifySingle from "./NotifySingle/NotifySingle";
import toast from "react-hot-toast";
import UpdateNotification from "./UpdateNotify/UpdateNotification";
import DeleteModal from "./DeleteModal/DeleteModal";

const AllNotifications = () => {
  const dispatch = useDispatch();
  const { loadingTr, errTr, notifications, errNotify, msgNotify } = useSelector(
    (state) => state.admin?.teachers
  );

  const [isOpenUpdateNotification, setIsOpenUpdateNotification] =
    useState(false);
  const [isNotificationUptId, setIsNotificationUptId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [delUptId, setDelUptId] = useState(null);
  const [openForm, setopenForm] = useState("notifyAll");

  useEffect(() => {
    dispatch(adminAllNotifications());
  }, [dispatch]);

  // update assigment
  const handleUpdateNotification = (id) => {
    if (id) {
      setIsNotificationUptId(id);
      setIsOpenUpdateNotification(true);
    }
  };

  const onCloseUpdateNotification = () => {
    setIsNotificationUptId(null);
    setIsOpenUpdateNotification(false);
  };

  // delete assigment
  const handleDeleteNotification = (id)=>{
    if(id){
      setIsOpen(true)
      setDelUptId(id)
    }
  }

  const onRequestClose = ()=>{
    setIsOpen(false)
    setDelUptId(null)
  }

  const handleConfirmDelete = ()=>{
    dispatch(adminRemoveNotification(delUptId))
    onRequestClose()
  }

  useEffect(() => {
    if (msgNotify) {
      toast.success(msgNotify);
      dispatch(adminAllNotifications());
    }
    if (errNotify) {
      toast.error(errNotify);
    }
    dispatch(clearErrorTeachers());
  }, [dispatch, msgNotify, errNotify]);

  const handleNotify = (e) => {
    const val = e.target.value;
    setopenForm(val);
  };

  return (
    <>
      <DeleteModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        handleConfirmDelete={handleConfirmDelete}
      />

      <UpdateNotification
        isOpenUpdateNotification={isOpenUpdateNotification}
        onCloseUpdateNotification={onCloseUpdateNotification}
        isNotificationUptId={isNotificationUptId}
      />

      <div className="p-[1.25rem] w-4/5 navdashMain">
        <AnNav />
        {loadingTr ? (
          <LoaderAn />
        ) : errTr && errTr ? (
          <>
            <p className="text-red-500 text-lg font-semibold mb-4">
              <div className="flex flex-col items-center justify-center h-[50vh] mt-10 w-full border border-gray-300 rounded-lg shadow-lg">
                <h1 className="text-4xl font-extrabold text-red-500 mb-2">
                  {errTr}
                </h1>
                <p className="text-lg text-gray-600 leading-6">
                  It seems like you haven't been assigned as the Class Teacher
                  for any class yet.
                </p>
                <p className="text-lg text-gray-600 leading-6 mt-4">
                  Contact your administrator for further assistance.
                </p>
                <button className="mt-6 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-700">
                  Request Administrator
                </button>
              </div>
            </p>
          </>
        ) : (
          <>
              <>
                <div className="mt-8 ml-1 sm:mt-2 sm:m-1 sm:justify-center justify-start flex">
                  <select
                    onChange={handleNotify}
                    className="bg-white border border-gray-300  rounded-md py-1 px-4 text-gray-700  focus:outline-none focus:border-[#8b008bad]"
                  >
                    <option value="notifyAll">Notify All</option>
                    <option value="notifySingle">Notify Single</option>
                  </select>
                </div>

                <div className="flex flex-col sm:flex-row justify-between">
                  {/* create notifications */}
                  {openForm && openForm === "notifyAll" ? (
                    <NotifyAll loadingTr={loadingTr} />
                  ) : (
                    <NotifySingle loadingTr={loadingTr} />
                  )}

                  {/*  show assigments */}
                  <div className="flex flex-col gap-6 mt-4 bg-white p-6 rounded-lg  border-2 border-[#b444b4] w-full sm:w-1/2 h-auto sm:h-[120vh] overflow-y-auto">
                    <h2 className="text-2xl font-semibold mb-4 text-[#b444b4]">
                      All Notifications :
                    </h2>

                    {notifications && notifications?.length > 0 ? (
                      notifications?.map((noti, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 rounded-lg shadow-md p-4 mb-4 relative"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold text-[#B444B4]">
                              {noti?.title && noti?.title?.length > 39
                                ? noti?.title.slice(0, 39) + "..."
                                : noti?.title}
                            </h3>
                            <div className="space-x-2 ml-3 flex flex-col items-end gap-2 md:flex md:flex-row">
                              <button
                                className="text-gray-600 hover:text-purple-600 focus:outline-none"
                                onClick={() =>
                                  handleUpdateNotification(noti?._id)
                                }
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                className="text-gray-600 hover:text-red-600 focus:outline-none"
                                onClick={() =>
                                  handleDeleteNotification(noti?._id)
                                }
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {noti.desc}
                          </p>
                          <div className="flex flex-col items-start">
                            {noti.fileLink && (
                              <a
                                href={noti?.fileLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline text-sm mb-1"
                              >
                                View Document
                              </a>
                            )}
                            <p className="text-sm text-gray-600">
                              {noti.teacherFullName ? (
                                <span className=" font-medium text-gray-500">
                                  sent to :{" "}
                                </span>
                              ) : null}{" "}
                              {noti.teacherFullName}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className=" font-medium text-gray-500">
                                Date :{" "}
                              </span>{" "}
                              {new Date(noti.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No Notifications Found!</p>
                    )}
                  </div>
                </div>
              </>
          </>
        )}
      </div>
    </>
  );
};

export default AllNotifications;
