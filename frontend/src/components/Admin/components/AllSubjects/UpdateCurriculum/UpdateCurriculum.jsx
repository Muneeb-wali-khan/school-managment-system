import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
    adminAllCurriculumsSubject,
  adminSingleCurriculumSubject, adminUpdateCurriculumSubject, clearErrorSubjects,
} from "../../../../../store/features/admin.reducers";
import { useParams } from "react-router-dom";
import LoaderAn from "../../../LoaderAn/LoaderAn";


const UpdateCurriculum = ({
  isOpenCurriculumUpdate,
  onCloseCurriculumUpdate,
  uptId,
}) => {
  const [UpdateCurriculum, setUpdateCurriculum] = useState({
    curriculumClass: "",
    year: 0,
    description: "",
    documentationLink: "",
    keyTopics: "",
  });
  const params = useParams();

  const dispatch = useDispatch();
  const { loadingSb, msgUptSbCur, errUptSbCur, singleSbCurriculum } = useSelector(
    (state) => state?.admin?.subjects
  );

  const handleChange = (e) => {
    setUpdateCurriculum({ ...UpdateCurriculum, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminUpdateCurriculumSubject({ id: uptId, data: UpdateCurriculum }));
  };

  useEffect(() => {
    if (msgUptSbCur) {
      toast.success(msgUptSbCur);
      dispatch(adminAllCurriculumsSubject(params?.id));
      onCloseCurriculumUpdate();
    }
    if (errUptSbCur) {
      toast.error(errUptSbCur);
    }
    dispatch(adminAllCurriculumsSubject(params?.id));
    dispatch(clearErrorSubjects());
  }, [msgUptSbCur, errUptSbCur, uptId, dispatch]);

  useEffect(() => {
    dispatch(adminSingleCurriculumSubject(uptId));
  }, [dispatch, uptId]);

  useEffect(() => {
    if (singleSbCurriculum) {
      setUpdateCurriculum({
        year: singleSbCurriculum && singleSbCurriculum?.[0]?.year,
        description: singleSbCurriculum && singleSbCurriculum?.[0]?.description,
        documentationLink: singleSbCurriculum && singleSbCurriculum?.[0]?.documentationLink,
        keyTopics: singleSbCurriculum && singleSbCurriculum?.[0]?.keyTopics,
        curriculumClass: singleSbCurriculum && singleSbCurriculum?.[0]?.curriculumClass,
      });
    }
  }, [singleSbCurriculum?.[0]]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 ${isOpenCurriculumUpdate ? "" : "hidden"}`}
      >
        {loadingSb && <LoaderAn />}
        <div className="flex items-center justify-center h-screen">
          <div
            onClick={() => onCloseCurriculumUpdate()}
            className="fixed inset-0 bg-black opacity-50"
          ></div>
          <div
            className="
        custom-scrollbar
        bg-gradient-to-r from-[#8b008bef] to-[#861686] w-full  max-h-[70vh] overflow-y-scroll sm:w-96 p-8 rounded-md shadow-md transform transition-transform duration-300 hover:scale-105 z-50 mx-4 sm:mx-auto"
          >
            <h2 className="text-2xl sm:text-2xl font-bold text-white mb-6 flex items-center justify-center gap-4">
              Update Record
              <i className="fa fa-plus"></i>
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 relative">
                <label
                  htmlFor="year"
                  className="block text-white font-semibold mb-2"
                >
                  Year:
                </label>
                <div className="flex items-center">
                  <input
                    disabled={loadingSb ? true : false}
                    name="year"
                    value={UpdateCurriculum?.year}
                    type="text"
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                  />
                </div>
              </div>

              <div className="mb-4 relative">
                <label
                  htmlFor="ClassName"
                  className="block text-white font-semibold mb-2"
                >
                  ClassName:
                </label>
                <div className="flex items-center">
                  <input
                    disabled={loadingSb ? true : false}
                    name="curriculumClass"
                    value={UpdateCurriculum?.curriculumClass}
                    type="text"
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                  />
                </div>
              </div>

              <div className="mb-4 relative">
                <label
                  htmlFor="description"
                  className="block text-white font-semibold mb-2"
                >
                  Description:
                </label>
                <div className="flex items-center">
                  <input
                    disabled={loadingSb ? true : false}
                    name="description"
                    value={UpdateCurriculum?.description}
                    type="text"
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                  />
                </div>
              </div>

              <div className="mb-4 relative">
                <label
                  htmlFor="documentationLink"
                  className="block text-white font-semibold mb-2"
                >
                  documentationLink:
                </label>
                <div className="flex items-center">
                  <input
                    disabled={loadingSb ? true : false}
                    name="documentationLink"
                    value={UpdateCurriculum?.documentationLink}
                    type="url"
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                  />
                </div>
              </div>

              <div className="mb-4 relative">
                <label
                  htmlFor="keyTopics"
                  className="block text-white font-semibold mb-2"
                >
                  keyTopics:
                </label>
                <div className="flex items-center">
                  <input
                    disabled={loadingSb ? true : false}
                    name="keyTopics"
                    value={UpdateCurriculum?.keyTopics}
                    type="text"
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                  />
                </div>
              </div>

              <button
                disabled={loadingSb ? true : false}
                type="submit"
                className="bg-white hover:bg-gray-300 text-blue-500 py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-300 w-full"
              >
                {loadingSb ? "Submitting..." : "Add Record"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCurriculum;
