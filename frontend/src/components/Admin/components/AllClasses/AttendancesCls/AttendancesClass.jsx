import React, { useEffect, useState } from "react";
import AnNav from "../../../Navbar/AnNav";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { adminAllAttendancesClass, clearErrorClasses } from "../../../../../store/features/admin.reducers";
import LoaderAn from "../../../LoaderAn/LoaderAn";

const AttendancesClass = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [activeIndex, setActiveIndex] = useState(null);
  const [dateFilter, setDateFilter] = useState("");

  const { loadingCls, errCls, attendances } = useSelector(
    (state) => state?.admin?.classes
  );

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    dispatch(adminAllAttendancesClass(params?.className));
  }, [dispatch, params.className]);

  // Filter the attendances based on the filters
  const filteredAttendances = attendances?.filter((attendance) => {
    const dateMatch = dateFilter
      ? new Date(attendance?.date).toISOString().split("T")[0] === dateFilter
      : true;
    return dateMatch;
  });

  // Group the attendances by date
  const groupedAttendances =
    filteredAttendances && filteredAttendances
      ? filteredAttendances?.reduce((acc, attendance) => {
          const date = new Date(attendance?.date).toLocaleString();
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(attendance);
          return acc;
        }, {})
      : {};


      

  return (
    <>
      <div className="p-[1.25rem] w-4/5 navdashMain">
        <AnNav />
         {/* heading */}
        <div className="mt-8 max-w-7xl mx-auto mb-4 ml-1">
          <h2 className="text-xl font-bold mb-2 text-[#663399da]">
            Attendances for {params?.className} :
          </h2>
        </div>

        {/* select date */}
        <div className="mt-3 max-w-7xl mx-auto mb-4 ml-1">
          <label htmlFor="date"> Select Date</label>
          <div className="flex mb-4 mt-1">
            <input
              type="date"
              placeholder="Filter by date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mt-5 max-h-[100%] h-[105vh] overflow-y-auto ">
          {loadingCls && loadingCls ? (
            <LoaderAn />
          ) : (
            <>
              {Object.entries(groupedAttendances).map(
                ([date, attendances], index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-md mb-4 overflow-x-auto"
                  >
                    <div
                      className="flex justify-between items-center p-6 cursor-pointer bg-gray-100"
                      onClick={() => toggleAccordion(index)}
                    >
                      <p className="font-semibold">{date}</p>
                      <i
                        className={`fas ${
                          activeIndex === index
                            ? "fa-chevron-up"
                            : "fa-chevron-down"
                        } text-gray-400`}
                      ></i>
                    </div>
                    {/* table */}
                    {activeIndex === index && (
                      <div className="p-6 bg-gray-50 overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Student Name
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Student Email
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Marked By
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white  divide-y divide-gray-200">
                            {attendances?.map((attendance, idx) => (
                              <tr key={idx}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {attendance.studentName}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {attendance.studentEmail}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      attendance.status === "present"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {attendance.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {new Date(
                                      attendance.date
                                    ).toLocaleDateString()}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {attendance.markedBy}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )
              )}
            </>
          )}
          {errCls && <p>Error: {errCls}</p>}
        </div>
      </div>
    </>
  );
};

export default AttendancesClass;
