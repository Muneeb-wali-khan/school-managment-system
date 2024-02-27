import React from "react";
import { useSelector } from "react-redux";
import TrNav from "../../Navbar/TrNav";
import Loader from "../../../loader/Loader";
import { Link, useNavigate } from "react-router-dom";

const AllSubjects = () => {
  const { loadingTeacher, errorTeacher, profileTeacher, allSubjectsCl } =
    useSelector((state) => state?.teacher?.teacherD);
  const curriculumAddedNew = true;
  const navigate = useNavigate();

  const handleCurriculumShow = () => {
    return navigate(`/teacher-portal/curriculum-subject`);
  };

  return (
    <div className="p-[1.25rem] w-4/5 navdashMain">
      <TrNav />
      {loadingTeacher && <Loader />}

      <div className="mt-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-[#663399da]">
          {profileTeacher &&
            profileTeacher[1] &&
            profileTeacher[1]?.[0] +
              profileTeacher[1]
                ?.substring(1, profileTeacher[1].length)
                .toLowerCase()}{" "}
          Subjects :
        </h2>

        {
          errorTeacher === null && (
            <div className="py-3 px-1 pr-5 border-b relative flex justify-end">
            <button
              onClick={handleCurriculumShow}
              className="py-2 bg-gradient-to-r from-[#8D5ADD] to-[#794ACA] text-white px-4 rounded-md font-medium"
            >
              Subjects Curriculums
            </button>
            {curriculumAddedNew && (
              <div className=" absolute top-0 right-[-0px]  py-[0.2rem] px-2 bg-red-500 text-white rounded-full text-[0.8rem]">
                New
              </div>
            )}
          </div>
          ) 
        }

        {errorTeacher && (
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
        )}

        {allSubjectsCl && allSubjectsCl.length === 0 && (
          <p className="text-gray-600 text-lg font-semibold">
            No class subjects found.
          </p>
        )}

        {allSubjectsCl && allSubjectsCl?.subjects && (
          <div className="overflow-x-auto rounded flex justify-between border-[#663399da] ">
            <table className="w-[100%]  bg-white border-2 border-[#7626c7bb]">
              <thead>
                <tr className="text-gray-600">
                  <th className="py-2 text-start px-4 border-b">
                    Subject Name
                  </th>
                  {/* Add more headers if needed */}
                </tr>
              </thead>
              <tbody>
                {allSubjectsCl.subjects.map((val) => (
                  <tr key={val?._id} className="hover:bg-gray-100">
                    <td className="py-3 px-4 border-b font-bold text-[#663399da]">
                      {val?.subjectName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSubjects;
