import { useDispatch } from 'react-redux';
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import TrNav from "../../Navbar/TrNav";
import LoaderTr from "../../LoaderTr/LoaderTr";
import { allTeachersOfClass } from "../../../../store/features/teacher.reducers";

const AllTeachers = () => {
  const {
    allTeachersCl,
    loadingTeacher,
    errorTeacher,
    profileTeacher,
    allSubjectsCl,
  } = useSelector((state) => state?.teacher?.teacherD);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(allTeachersOfClass());
  },[dispatch])

  return (
    <div className="p-[1.25rem] w-4/5 navdashMain">
      <TrNav />
      {loadingTeacher && loadingTeacher ? (
        <LoaderTr />
      ) : (
        <>
          <div className="mt-8 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-[#663399da]">
              {profileTeacher &&
                profileTeacher[1] &&
                profileTeacher[1]?.[0] +
                  profileTeacher[1]
                    ?.substring(1, profileTeacher[1].length)
                    .toLowerCase()}{" "}
              Teachers :
            </h2>

            {errorTeacher && (
              <p className="text-red-500 text-lg font-semibold mb-4">
                <div className="flex flex-col items-center justify-center h-[50vh] mt-10 w-full border border-gray-300 rounded-lg shadow-lg">
                  <h1 className="text-4xl font-extrabold text-red-500 mb-2">
                    {errorTeacher}
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
            )}

            {allTeachersCl && allTeachersCl.length === 0 && (
              <p className="text-gray-600 text-lg font-semibold">
                No class teachers found.
              </p>
            )}

            {allTeachersCl && allTeachersCl.length > 0 && (
              <div className="overflow-x-auto rounded">
                <table className="min-w-full bg-white border-2 border-[#663399da]">
                  <thead>
                    <tr className="text-gray-600">
                      <th className="py-2 text-start px-4 border-b">
                        Full Name
                      </th>
                      <th className="py-2 text-start px-4 border-b">Subject</th>
                      {/* Add more headers if needed */}
                    </tr>
                  </thead>
                  <tbody>
                    {allTeachersCl.map((teacher) => (
                      <tr key={teacher._id} className="hover:bg-gray-100">
                        <td className="py-3 px-4 border-b">
                          {teacher.fullName}
                        </td>
                        <td className="py-3 px-4 border-b">
                          {teacher.subject}
                        </td>
                        {/* Add more cells if needed */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AllTeachers;
