import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import StNav from "../../Navbar/StNav";
import { studentAttendanceRecords } from "../../../../store/features/student.reducers";
import { DoughNutChart } from "./chartJs/Chart";
import LoaderSt from "../../LoaderSt/LoaderSt";

const StAttendanceRecord = () => {
  const dispatch = useDispatch();
  const { attendanceRecords, loadingStAttendances, errorStudent } =
    useSelector((state) => state.student?.studentD);

  useEffect(() => {
    dispatch(studentAttendanceRecords());
  }, [dispatch]);

  const calculateAbsences = () => {
    const absences = { absent: 0, present: 0 };
    attendanceRecords &&
      attendanceRecords?.forEach((record) => {
        if (record?.status === "absent") {
          absences[record?.status]++;
        } else if (record?.status === "present") {
          absences[record?.status]++;
        }
      });
    return absences;
  };

  const [absenceData, setAbsenceData] = useState({});

  useEffect(() => {
    if (attendanceRecords) {
      const absences = calculateAbsences();
      setAbsenceData(absences);
    }
  }, [attendanceRecords]);


  return (
    <>
      <div className="p-[1.25rem] w-4/5 navdashMain">
        <StNav />
        {loadingStAttendances ? (
          <LoaderSt />
        ) : errorStudent ? (
          <>
            <p className="text-red-500">Error: {errorStudent}</p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4 text-[#2F4F4F] mt-6">
              Attendance Record :{" "}
            </h1>

            {attendanceRecords && attendanceRecords.length > 0 ? (
              <>
                <div className="overflow-x-auto h-[105vh]">
                  <table className="table-auto w-full border-collapse border border-gray-400">
                    <thead>
                      <tr className="bg-[#2F4F4F] text-white">
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Marked By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceRecords &&
                        attendanceRecords?.map((record, index) => (
                          <tr
                            key={index}
                            className={index % 2 === 0 ? "bg-gray-100" : ""}
                          >
                            <td className="border border-gray-400 px-4 py-2">
                              {new Date(record.date).toLocaleDateString()}
                            </td>
                            <td
                              className={`border border-gray-400 px-4 py-2 ${
                                record.status === "present"
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {record.status}
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                              {record.markedBy}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="flex flex-col md:flex-row md:gap-5 items-center  justify-center">
                    <div className="mt-12 h-[60vh]">
                      <DoughNutChart data={absenceData} />
                    </div>
                    <div className="text-sm space-y-1">
                        <p className="text-gray-700 font-medium">
                          Total Absences:{" "}
                          <span className=" font-normal">
                            {absenceData.absent}
                          </span>
                        </p>
                        <p className="text-gray-700 font-medium">
                          Total Present:{" "}
                          <span className=" font-normal">
                            {absenceData.present}
                          </span>
                        </p>
                        <p className="text-gray-700 font-medium">
                          Total Days:{" "}
                          <span className=" font-normal">
                            {" "}
                            {attendanceRecords.length}
                          </span>
                        </p>
                      </div>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-gray-700">No attendance records found.</p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default StAttendanceRecord;
