import { useSelector } from "react-redux";
import TrNav from "../../Navbar/TrNav";
import { useNavigate } from "react-router-dom";

const AllSubjects = () => {
  const { loadingSubject, profileTeacher, allSubjectsCl ,subjectCurriculum} =
    useSelector((state) => state?.teacher?.teacherD);
  const navigate = useNavigate();

  const handleCurriculumShow = () => {
    return navigate(`/teacher-portal/curriculum-subject`);
  };

  return (
    <div className="p-[1.25rem] w-4/5 navdashMain">
      <TrNav />

        <>
          <div className="mt-8 max-w-7xl mx-auto">
            {allSubjectsCl && allSubjectsCl?.subjects?.length > 0 ? (
              <>
                <h2 className="text-2xl font-bold mb-2 text-[#663399da]">
                  {profileTeacher &&
                    profileTeacher[1] &&
                    profileTeacher[1]?.[0] +
                      profileTeacher[1]
                        ?.substring(1, profileTeacher[1].length)
                        .toLowerCase()}{" "}
                  Subjects :
                </h2>

                <div className="py-3 px-1 pr-5 border-b relative flex justify-end">
                  <button
                    onClick={handleCurriculumShow}
                    className="py-2 bg-gradient-to-r from-[#8D5ADD] to-[#794ACA] text-white px-4 rounded-md font-medium"
                  >
                    Subjects Curriculums
                  </button>
                  {subjectCurriculum && subjectCurriculum?.length > 0 && (
                    <div className=" absolute animate-shake animate-glow top-0 right-[-0px]  py-[0.2rem] px-2 bg-red-500 text-white rounded-full text-[0.8rem]">
                      New
                    </div>
                  )}
                </div>

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
              </>
            ) : (
              <p className="text-gray-500">Subjects Not Found !</p>
            )}
          </div>
        </>
    </div>
  );
};

export default AllSubjects;
