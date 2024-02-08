import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TrNav from "../../../Navbar/TrNav";
import Loader from "../../../../loader/Loader";
import { curriculumOfSubjectsClass } from "../../../../../store/features/teacher.reducers";
import { useParams } from "react-router-dom";

const CurriculumSub = () => {
  const {
    loadingTeacher,
    errorTeacher,
    profileTeacher,
    allSubjectsCl,
    subjectCurriculum,
  } = useSelector((state) => state?.teacher?.teacherD);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(curriculumOfSubjectsClass(params?.id));
  }, [params?.id]);

console.log(subjectCurriculum && subjectCurriculum?.map((val)=> val))
  return (
    <div className="p-[1.25rem] w-4/5 navdashMain">
      <TrNav />
      {loadingTeacher && <Loader />}
      <div className="mt-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-[#663399da]">
          Subjects Curriculums :
        </h2>

        {errorTeacher && (
          <p className="text-red-500 text-lg font-semibold mb-4">
            {errorTeacher}
          </p>
        )}

        {subjectCurriculum && subjectCurriculum.length === 0 && (
          <p className="text-gray-600 text-lg font-semibold">
            No curriculum found for this subject.
          </p>
        )}

        {subjectCurriculum && subjectCurriculum.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjectCurriculum.map((curriculumArray, index) => (
              <div key={index}>
                {curriculumArray.map((curriculum) => (
                  <div
                    key={curriculum._id}
                    className="bg-white border rounded-md overflow-hidden shadow-md p-6 mb-4"
                  >
                    <h3 className="text-xl font-bold mb-2">
                      {curriculum.curriculumClass}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Year: {curriculum.year}
                    </p>
                    <p className="text-gray-600 mb-4">{curriculum.description}</p>
                    <a
                      href={curriculum.documentationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline mb-2 inline-block"
                    >
                      Documentation Link
                    </a>
                    <p className="text-gray-600 text-sm mb-2">
                      Key Topics: {curriculum.keyTopics}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default CurriculumSub;
