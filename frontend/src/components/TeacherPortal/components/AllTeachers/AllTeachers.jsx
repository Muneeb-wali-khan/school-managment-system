import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import TrNav from "../../Navbar/TrNav";
import { allTeachersOfClass } from "../../../../store/features/teacher.reducers";

const AllTeachers = () => {
  const {
    allTeachersCl,
    loadingTeachers,
    profileTeacher,
  } = useSelector((state) => state?.teacher?.teacherD);

  return (
    <div className="p-[1.25rem] w-4/5 navdashMain">
      <TrNav />
        <>
          {allTeachersCl && allTeachersCl?.length > 0 ? (
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

                <div className="overflow-x-auto rounded">
                  <table className="min-w-full bg-white border-2 border-[#663399da]">
                    <thead>
                      <tr className="text-gray-600">
                        <th className="py-2 text-start px-4 border-b">
                          Full Name
                        </th>
                        <th className="py-2 text-start px-4 border-b">
                          Subject
                        </th>
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
              </div>
            </>
          ):(
            <>
              <p className=" text-gray-500">No Teachers Found !</p>
            </>
          )
        }
        </>
    </div>
  );
};

export default AllTeachers;
