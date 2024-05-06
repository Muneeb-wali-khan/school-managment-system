import React, { useEffect, useState } from "react";
import {
  takeAttendance,
} from "../../../../../store/features/teacher.reducers";
import { useDispatch } from "react-redux";

const TakeAttendance = ({
  allStudentsClass,
  loadingAttendance,
}) => {
  const dispatch = useDispatch();

  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    if (allStudentsClass && allStudentsClass[0]) {
      const initialAttendance = allStudentsClass[0].map((student) => ({
        studentID: student._id,
        status: "present", // defaulting to "present" for all students
        studentName: student.fullName,
        studentEmail: student.email,
      }));
      setAttendance(initialAttendance);
    }
  }, [allStudentsClass?.[0]]);

  const handleAttendanceChange = (
    studentID,
    status,
    studentName,
    studentEmail
  ) => {
    setAttendance(
      (
        prevAttendance // prev means we have set the values in useeffect already onload
      ) =>
        prevAttendance.map((student) =>
          student.studentID === studentID
            ? { ...student, status, studentName, studentEmail }
            : student
        )
    );
  };

  const handleTakeAttendance = () => {
    dispatch(takeAttendance(attendance));
    setAttendance([]);
  };


  return (
    <>
      {/* take attendance */}
      <form className="bg-white p-6 rounded-lg mb-4 mt-4  border-2 border-[#66339975] sm:w-1/2 sm:h-[120vh] overflow-y-auto w-full h-auto">
        <div className="flex flex-col gap-6">
          {allStudentsClass &&
          Array.isArray(allStudentsClass[0]) &&
          allStudentsClass[0].length > 0 ? (
            allStudentsClass[0].map((student) => (
              <div key={student._id} className="flex items-center">
                <label className="flex items-center space-x-3">
                  <span className=" font-medium text-[#663399af] mr-5">
                    Roll No :{" "}
                    <span className=" font-bold">{student?.rollNo}</span>
                  </span>

                  <input
                    className="form-checkbox h-5 w-5 bg-[#663399] rounded-md focus:ring-2 focus:ring-[#663399da]"
                    checked={
                      attendance?.find((att) => att?.studentID === student?._id)
                        ?.status === "present"
                    }
                    type="checkbox"
                    onChange={(e) =>
                      handleAttendanceChange(
                        student._id,
                        e.target.checked ? "present" : "absent",
                        student.fullName,
                        student.email
                      )
                    }
                  />

                  <span className="font-medium text-[#663399]">
                    {student.fullName?.[0]?.toUpperCase() +
                      student?.fullName?.substr(1, student?.fullName?.length)}
                  </span>
                </label>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No Students Found ?</p>
          )}

          <div>
            <button
              className="bg-gradient-to-r from-[#8D5ADD] to-[#794ACA] text-white px-4 py-2 mt-5 rounded-md font-semibold transition duration-300 hover:bg-[#663399d7] focus:outline-none focus:ring focus:border-blue-300"
              type="button"
              onClick={handleTakeAttendance}
            >
              {loadingAttendance ? "Submitting...." : "Submit Attendance"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default TakeAttendance;
