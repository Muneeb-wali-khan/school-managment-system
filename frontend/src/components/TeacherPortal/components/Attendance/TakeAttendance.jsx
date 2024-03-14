import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  takeAttendance,
  allStudentsClass as allStudentsOfClass,
  clearErrorsTeacher,
  showAttendanceToday,
} from "../../../../store/features/teacher.reducers";
import toast from "react-hot-toast";
import LoaderTr from "../../LoaderTr/LoaderTr";
import TrNav from "../../Navbar/TrNav";

const TakeAttendance = () => {
  const dispatch = useDispatch();
  const {
    allStudentsClass,
    loadingTeacher,
    errorTeacher,
    errAttSt,
    msgAttSt,
    attendanceToday,
  } = useSelector((state) => state.teacher?.teacherD);

  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    dispatch(allStudentsOfClass());
  }, [dispatch]);

  useEffect(() => {
    dispatch(showAttendanceToday());
  }, [dispatch]);

  useEffect(() => {
    if (allStudentsClass && allStudentsClass[0]) {
      const initialAttendance = allStudentsClass[0].map((student) => ({
        studentID: student._id,
        status: "present", // defaulting to "present" for all students
        studentName: student.fullName,
      }));
      setAttendance(initialAttendance);
    }
  }, [allStudentsClass?.[0]]);

  const handleAttendanceChange = (studentID, status, studentName) => {
    console.log("status from mar", status);
    setAttendance(
      (
        prevAttendance // prev means we have set the values in useeffect already onload
      ) =>
        prevAttendance.map((student) =>
          student.studentID === studentID
            ? { ...student, status, studentName }
            : student
        )
    );
  };

  const handleTakeAttendance = () => {
    dispatch(takeAttendance(attendance));
  };

  useEffect(() => {
    if (msgAttSt) {
      toast.success(msgAttSt);
      dispatch(showAttendanceToday());
    }
    if (errAttSt) {
      toast.error(errAttSt);
    }
    dispatch(clearErrorsTeacher());
  }, [dispatch, msgAttSt, errAttSt,toast]);


  return (
    <div className="p-[1.25rem] w-4/5 navdashMain">
      <TrNav />
      {loadingTeacher ? (
        <LoaderTr />
      ) : errorTeacher && errorTeacher ? (
        <>
          <p className="text-red-500 text-lg font-semibold mb-4">
            <div className="flex flex-col items-center justify-center h-[50vh] mt-10 w-full border border-gray-300 rounded-lg shadow-lg">
              <h1 className="text-4xl font-extrabold text-red-500 mb-2">
                {errorTeacher}
              </h1>
              <p className="text-lg text-gray-600 leading-6">
                It seems like you haven't been assigned as the Class Teacher for
                any class yet.
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
          {allStudentsClass && allStudentsClass?.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between m-2">
              {/* take attendance */}
              <form className="bg-white p-6 rounded-lg mb-4 mt-4  border-2 sm:w-1/2 sm:h-[120vh] overflow-y-auto w-full h-auto">
                <div className="flex flex-col gap-6">
                  {allStudentsClass &&
                  Array.isArray(allStudentsClass[0]) &&
                  allStudentsClass[0].length > 0 ? (
                    allStudentsClass[0].map((student) => (
                      <div key={student._id} className="flex items-center">
                        <label className="flex items-center space-x-3">
                          <span className=" font-medium text-gray-500 mr-5">
                            Roll No :{" "}
                            <span className=" font-bold">
                              {student?.rollNo}
                            </span>
                          </span>

                          <input
                            className="form-checkbox h-5 w-5 text-blue-600 rounded-md focus:ring-2 focus:ring-blue-500"
                            checked={
                              attendance?.find(
                                (att) => att?.studentID === student?._id
                              )?.status === "present"
                            }
                            type="checkbox"
                            onChange={(e) =>
                              handleAttendanceChange(
                                student._id,
                                e.target.checked ? "present" : "absent",
                                student.fullName
                              )
                            }
                          />

                          <span className="text-gray-600 font-medium">
                            {student.fullName?.[0]?.toUpperCase() +
                              student?.fullName?.substr(
                                1,
                                student?.fullName?.length
                              )}
                          </span>
                        </label>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No Students Found ?</p>
                  )}

                  <div>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 mt-5 rounded-md font-semibold transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                      type="button"
                      onClick={handleTakeAttendance}
                    >
                      {loadingTeacher ? "Submitting...." : "Submit Attendance"}
                    </button>
                  </div>
                </div>
              </form>

              {/*  show today attendance */}
              <div className="flex flex-col gap-6 mt-4 bg-white p-6 rounded-lg  border-2 w-full sm:w-1/2 h-auto sm:h-[120vh] overflow-y-auto">
                <h2 className="text-2xl font-semibold mb-4">
                  Today's Attendance
                </h2>
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
                            ? "text-blue-500"
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
      )}
    </div>
  );
};

export default TakeAttendance;
