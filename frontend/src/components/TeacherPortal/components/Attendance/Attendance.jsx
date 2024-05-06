import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorsTeacher,
  notifyAbsentStudents,
} from "../../../../store/features/teacher.reducers";
import toast from "react-hot-toast";
import TrNav from "../../Navbar/TrNav";
import TakeAttendance from "./takeAttendance/TakeAttendance";

const Attendance = () => {
  const dispatch = useDispatch();
  const {
    allStudentsClass,
    loadingAttendance,
    loadingTeachers,
    errorNotify,
    msgNotify,
    errAttSt,
    msgAttSt,
    attendanceToday,
  } = useSelector((state) => state.teacher?.teacherD);

  
  const notifyAbsenties = () => {
    dispatch(notifyAbsentStudents());
  };

  useEffect(() => {
    if (msgNotify) {
      toast.success(msgNotify);
    }
    if (errorNotify) {
      toast.error(errorNotify);
    }
    dispatch(clearErrorsTeacher());
  }, [dispatch, msgNotify, errorNotify]);


  useEffect(() => {
    if (msgAttSt) {
      toast.success(msgAttSt);
    }
    if (errAttSt) {
      toast.error(errAttSt);
    }
    dispatch(clearErrorsTeacher());
  }, [dispatch, errAttSt, msgAttSt]);


  const absenties =
    attendanceToday &&
    attendanceToday.filter((val) => val.status === "absent").length;

  return (
    <div className="p-[1.25rem] w-4/5 navdashMain">
      <TrNav />

        <>
          {allStudentsClass &&  (
            <div className="flex flex-col sm:flex-row justify-between m-2">
              {/* take attendance */}
              <TakeAttendance allStudentsClass={allStudentsClass} loadingAttendance={loadingAttendance}/>

              {/*  show today attendance */}
              <div className="flex flex-col gap-6 mt-4 bg-white p-6 rounded-lg  border-2 border-[#66339975] w-full sm:w-1/2 h-auto sm:h-[120vh] overflow-y-auto">
                <div className="flex justify-between">
                  <h2 className="text-2xl font-semibold mb-4 text-[#663399]">
                    Today's Attendance
                  </h2>
                  <div>
                    {absenties && absenties > 0 ? (
                      <button
                        onClick={notifyAbsenties}
                        className="px-3 py-[0.5rem] flex  gap-2 !important bg-gradient-to-r from-[#8D5ADD] to-[#794ACA] text-white rounded-md text-sm items-center shadow-xl"
                      >
                        {loadingTeachers ? 'Sending Emails...': 'Notify Absents'}{" "}
                        <span className=" fa fa-bell text-md inline-block"></span>
                      </button>
                    ) : null}
                  </div>
                </div>
                {attendanceToday && attendanceToday?.length > 0 ? (
                  attendanceToday?.map((att, index) => (
                    <div
                      key={att?.studentID}
                      className="flex items-center justify-between bg-gray-100 p-3 rounded-md"
                    >
                      <span className="text-gray-700">
                        <span className=" font-extrabold">{index + 1}</span> :{" "}
                        {att?.studentName?.[0]?.toUpperCase() +
                          att?.studentName?.substr(1, att?.studentName?.length)}
                      </span>
                      <span
                        className={`${
                          att?.status === "present"
                            ? "text-[#41bb41]"
                            : "text-red-500"
                        } font-semibold`}
                      >
                        {att?.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No Attendance Taken Today !</p>
                )}
              </div>
            </div>
          )}
        </>
    </div>
  );
};

export default Attendance;
