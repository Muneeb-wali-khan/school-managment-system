import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { adminAllCurriculumsSubject, adminRemoveCurriculumSubject, clearErrorSubjects } from "../../../../../store/features/admin.reducers";
import AnNav from "../../../Navbar/AnNav";
import LoaderAn from "../../../LoaderAn/LoaderAn";
import AddCurriculum from "../AddCurriculum/AddCurriculum";
import UpdateCurriculum from "../UpdateCurriculum/UpdateCurriculum";
import DeleteCurriculum from "../DeleteCurriculumModal/DeleteCurriculum";
import toast from "react-hot-toast";

const CurriculumsSubject = () => {
  const { loadingSb, errSb, curriculums,errDelSbCur,msgDelSbCur } = useSelector(
    (state) => state?.admin?.subjects
  );
  const [isModalOpenCurriculumAdd, setIsModalOpenCurriculumAdd] =
    useState(false);
  const [isModalOpenCurriculumUpdate, setIsModalOpenCurriculumUpdate] =
    useState(false);
  const [uptId, setUptId] = useState([]);
  const [isStId, setIsStId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminAllCurriculumsSubject(params?.id));
  }, [params?.id]);

  // add modal
  const openModalCurriculumAdd = () => {
    setIsModalOpenCurriculumAdd(true);
  };
  const closeModalCurriculumAdd = () => {
    setIsModalOpenCurriculumAdd(false);
  };

  // update modal
  const handleUpdateCurriculum = (id) => {
    setIsModalOpenCurriculumUpdate(true);
    setUptId(id);
  };
  const closeModalCurriculumUpdate = () => {
    setIsModalOpenCurriculumUpdate(false);
  };

  // delete modal
  const onDelete = (id) => {
    setIsStId(id);
    setIsOpen(true);
  };

  const handleDeleteCurriculum = () => {
    if (isStId) {
      dispatch(adminRemoveCurriculumSubject(isStId));
      setIsStId(null);
      setIsOpen(false);
    }
  };

  useEffect(()=>{
    if(msgDelSbCur){
      toast.success(msgDelSbCur)
    }
    if(errDelSbCur){
      toast.error(errDelSbCur)
    }
    dispatch(adminAllCurriculumsSubject(params?.id));
    dispatch(clearErrorSubjects())
  },[dispatch, msgDelSbCur, errDelSbCur, params?.id])

  const onRequestClose = () => {
    setIsOpen(false);
    setIsStId(null);
  };

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <AddCurriculum
        isOpenCurriculumAdd={isModalOpenCurriculumAdd}
        onCloseCurriculumAdd={closeModalCurriculumAdd}
      />
      <UpdateCurriculum
        isOpenCurriculumUpdate={isModalOpenCurriculumUpdate}
        onCloseCurriculumUpdate={closeModalCurriculumUpdate}
        uptId={uptId}
      />
      <DeleteCurriculum
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        handleDeleteCurriculum={handleDeleteCurriculum}
      />
      <div className="p-[1.25rem] w-4/5 navdashMain">
        <AnNav />
        {loadingSb && <LoaderAn />}
        <div className="mt-8 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mx-4 ml-0">
            <h2 className="text-2xl font-bold mb-6 text-[#663399da]">
              Subject Curriculums :
            </h2>
            <button
              onClick={openModalCurriculumAdd}
              className="py-1 text-white px-3 bg-[#663399da] mb-6 rounded-lg"
            >
              Add Curriculum
            </button>
          </div>
          {errSb && (
            <p className="text-red-500 text-lg font-semibold mb-4">{errSb}</p>
          )}

          {curriculums && curriculums.length === 0 && (
            <p className="text-gray-600 text-lg font-semibold">
              No curriculums found for this subject !
            </p>
          )}

          {curriculums && curriculums.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {curriculums.map((curriculum, index) => (
                <div key={index}>
                  <div
                    className={`bg-white border-2 border-[#66339952] rounded-md shadow-md mb-4 cursor-pointer`}
                  >
                    <div
                      className="flex items-center justify-between p-6"
                      onClick={() => toggleAccordion(index)}
                    >
                      <h3 className="text-xl font-bold mb-2">
                        {curriculum.curriculumClass}
                      </h3>
                      <div
                        className={`icon ${openIndex === index ? "open" : ""}`}
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
                        Year: {curriculum.year}
                      </p>
                      {openIndex === index && (
                        <>
                          <p className="text-gray-600 mb-4">
                            {curriculum.description}
                          </p>
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
                        </>
                      )}
                    </div>
                    {/* update and delete */}

                    <div className=" flex gap-5 items-center justify-end m-2">
                      <i
                        onClick={() => handleUpdateCurriculum(curriculum?._id)}
                        title="UPDATE CURRICULUM"
                        className="fa fa-pen text-yellow-500 text-md cursor-pointer p-2 hover:bg-[#8b008b98] hover:text-white transition-all rounded-md"
                      ></i>
                      <i
                        onClick={() => onDelete(curriculum?._id)}
                        title="DELETE CURRICULUM"
                        className="fa fa-trash text-red-500 text-md cursor-pointer p-2 hover:bg-[#8b008b98] hover:text-white transition-all rounded-md"
                      ></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CurriculumsSubject;
