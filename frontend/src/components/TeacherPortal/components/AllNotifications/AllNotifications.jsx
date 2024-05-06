import React, { useEffect, useState } from "react";
import TrNav from "../../Navbar/TrNav";
import { useDispatch, useSelector } from "react-redux";
import NotifyAll from "./NotifyAll/NotifyAll";
import NotifySingle from "./NotifySingle/NotifySingle";
import toast from "react-hot-toast";
import UpdateNotification from "./UpdateNotify/UpdateNotification";
import DeleteModal from "./DeleteModal/DeleteModal";
import { allNotificationsClass, clearErrorsTeacher, removeNotificationClass } from "../../../../store/features/teacher.reducers";

const AllNotifications = () => {
  const dispatch = useDispatch();
  const { loadingNotifications, clsNotifications, errorTeacher, msgTeacher } = useSelector(
    (state) => state.teacher?.teacherD
  );

  const [isOpenUpdateNotification, setIsOpenUpdateNotification] =
    useState(false);
  const [isNotificationUptId, setIsNotificationUptId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [delUptId, setDelUptId] = useState(null);
  const [openForm, setopenForm] = useState("notifyAll");


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
    dispatch(removeNotificationClass(delUptId))
  }

  useEffect(() => {
    if (msgTeacher) {
      toast.success(msgTeacher);
      onCloseUpdateNotification()
      if(delUptId){
        onRequestClose()
      }
    }
    if (errorTeacher) {
      toast.error(errorTeacher);
    }
    dispatch(clearErrorsTeacher());
  }, [dispatch, msgTeacher, errorTeacher]);

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
        loadingNotifications={loadingNotifications}
      />

      <UpdateNotification
        isOpenUpdateNotification={isOpenUpdateNotification}
        onCloseUpdateNotification={onCloseUpdateNotification}
        isNotificationUptId={isNotificationUptId}
      />

      <div className="p-[1.25rem] w-4/5 navdashMain">
        <TrNav />
          <>
              <>
                <div className="mt-8 ml-1 sm:mt-2 sm:m-1 sm:justify-center justify-start flex">
                  <select
                    onChange={handleNotify}
                    className="bg-white border border-gray-300  rounded-md py-1 px-4 text-gray-700  focus:outline-none focus:border-[#663399]"
                  >
                    <option value="notifyAll">Notify All</option>
                    <option value="notifySingle">Notify Single</option>
                  </select>
                </div>

                <div className="flex flex-col sm:flex-row justify-between">
                  {/* create clsNotifications */}
                  {openForm && openForm === "notifyAll" ? (
                    <NotifyAll loadingNotifications={loadingNotifications} />
                  ) : (
                    <NotifySingle loadingNotifications={loadingNotifications} />
                  )}

                  {/*  show assigments */}
                  <div className="flex flex-col gap-6 mt-4 bg-white p-6 rounded-lg  border-2 border-[#66339975] w-full sm:w-1/2 h-auto sm:h-[120vh] overflow-y-auto">
                    <h2 className="text-2xl font-semibold mb-4 text-[#663399]">
                      All Notifications :
                    </h2>

                    {clsNotifications && clsNotifications?.length > 0 ? (
                      clsNotifications?.map((noti, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 rounded-lg shadow-md p-4 mb-4 relative"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold text-[#663399]">
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
                              {noti.studentFullName ? (
                                <span className=" font-medium text-gray-500">
                                  sent to :{" "}
                                </span>
                              ) : null}{" "}
                              {noti.studentFullName}
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
      </div>
    </>
  );
};

export default AllNotifications;
