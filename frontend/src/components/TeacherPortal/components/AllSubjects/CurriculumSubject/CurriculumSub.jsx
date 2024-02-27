import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TrNav from "../../../Navbar/TrNav";
import LoaderTr from "../../../../TeacherPortal/LoaderTr/LoaderTr";
import { curriculumOfSubjectsClass } from "../../../../../store/features/teacher.reducers";
import { useParams } from "react-router-dom";

const CurriculumSub = () => {
  const { loadingTeacher, errorTeacher, subjectCurriculum } = useSelector(
    (state) => state?.teacher?.teacherD
  );
  const params = useParams();
  const dispatch = useDispatch();

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    dispatch(curriculumOfSubjectsClass());
  }, [dispatch]);

  return (
    <div className="p-[1.25rem] w-4/5 navdashMain">
      <TrNav />
      {loadingTeacher && <LoaderTr />}
      <div className="mt-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-[#663399da]">
          Subject Curriculums :
        </h2>

        {errorTeacher && (
          <p className="text-red-500 text-lg font-semibold mb-4">
            {errorTeacher}
          </p>
        )}

        {subjectCurriculum && subjectCurriculum.length === 0 && (
          <p className="text-gray-600 text-lg font-semibold">
            No curriculums found ! will be added soon..
          </p>
        )}

        {subjectCurriculum && subjectCurriculum.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjectCurriculum.map((curriculumArray, index) => (
              <div key={index}>
                    <div>
                      <div
                        className={`bg-white border-2 border-[#66339952] rounded-md shadow-md mb-4 cursor-pointer`}
                      >
                        <div
                          className="flex items-center justify-between p-6"
                          onClick={() => toggleAccordion(index)}
                        >
                          <h3 className="text-xl font-bold mb-2">
                            {curriculumArray.curriculumClass}
                          </h3>
                          <div
                            className={`icon ${
                              openIndex === index ? "open" : ""
                            }`}
                          >
                            {/* Add your open and close icons here */}
                            {openIndex === index ? (
                              <i className="fa fa-arrow-down"></i>
                            ) : (
                              <i className="fa fa-arrow-left"></i>
                            )}
                          </div>
                        </div>
                        <div
                          className={`content transition-all duration-300 ${
                            openIndex === index
                              ? "h-auto p-6"
                              : "h-0 overflow-hidden p-0"
                          }`}
                        >
                          <p className="text-gray-600 text-sm mb-2">
                            Year: {curriculumArray.year}
                          </p>
                          {openIndex === index && (
                            <>
                              <p className="text-gray-600 mb-4">
                                {curriculumArray.description}
                              </p>
                              <a
                                href={curriculumArray.documentationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline mb-2 inline-block"
                              >
                                Documentation Link
                              </a>
                              <p className="text-gray-600 text-sm mb-2">
                                Key Topics: {curriculumArray.keyTopics}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurriculumSub;
