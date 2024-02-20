import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { adminAddAcademicRecord, adminAllStudentAcademicRecord, adminFetchAllStudents, adminFetchSingleStudent, clearErrorStudents } from "../../../../../store/features/admin.reducers";
import { useParams } from "react-router-dom";

const AddAcademicRecord = ({ isOpenAcademicAdd, onCloseAcademicAdd }) => {
  const [AddAcademic, setAddAcademic] = useState({
    year: "",
    pClass: "",
    exam: "",
    grade: "",
    percentage: 0,
    positionInClass: "",
    marksObtained: 0,
    totalMarks: 0,
  });
  const params = useParams()

  const dispatch = useDispatch();
  const { loadingSt, msgSt, errSt } = useSelector((state) => state?.admin?.students);

  const handleChange = (e)=>{
    setAddAcademic({...AddAcademic, [e.target.name]: e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminAddAcademicRecord({id: params?.id, data: AddAcademic}));
  };

    useEffect(() => {
      if (msgSt ) {
        toast.success(msgSt);
        dispatch(adminAllStudentAcademicRecord(params?.id))
        onCloseAcademicAdd();
    }
    if (errSt) {
        toast.error(errSt);
    }
    dispatch(adminAllStudentAcademicRecord(params?.id))
      dispatch(clearErrorStudents());
    }, [msgSt, errSt,params?.id, dispatch]);


  return (
    <div className={`fixed inset-0 z-50 ${isOpenAcademicAdd ? "" : "hidden"}`}>
      <div className="flex items-center justify-center h-screen">
        <div
          onClick={() => onCloseAcademicAdd()}
          className="fixed inset-0 bg-black opacity-50"
        ></div>
        <div
          className="
        custom-scrollbar
        bg-gradient-to-r from-[#8b008bef] to-[#861686] w-full  max-h-[70vh] overflow-y-scroll sm:w-96 p-8 rounded-md shadow-md transform transition-transform duration-300 hover:scale-105 z-50 mx-4 sm:mx-auto"
        >
          <h2 className="text-2xl sm:text-2xl font-bold text-white mb-6 flex items-center justify-center gap-4">
            Add New Record
            <i className="fa fa-plus"></i>
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <label
                htmlFor="new email"
                className="block text-white font-semibold mb-2"
              >
                Year:
              </label>
              <div className="flex items-center">
                <input
                  disabled={loadingSt ? true : false}
                  name="year"
                  value={AddAcademic?.year}
                  type="text"
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                />
              </div>
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="new full Name"
                className="block text-white font-semibold mb-2"
              >
                ClassName:
              </label>
              <div className="flex items-center">
                <input
                  disabled={loadingSt ? true : false}
                  name="pClass"
                  value={AddAcademic?.pClass}
                  type="text"
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                />
              </div>
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="new full Name"
                className="block text-white font-semibold mb-2"
              >
                Grade:
              </label>
              <div className="flex items-center">
                <input
                  disabled={loadingSt ? true : false}
                  name="grade"
                  value={AddAcademic?.grade}
                  type="text"
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                />
              </div>
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="new full Name"
                className="block text-white font-semibold mb-2"
              >
                Percentage:
              </label>
              <div className="flex items-center">
                <input
                  disabled={loadingSt ? true : false}
                  name="percentage"
                  value={AddAcademic?.percentage}
                  type="number"
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                />
              </div>
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="new full Name"
                className="block text-white font-semibold mb-2"
              >
                Exam:
              </label>
              <div className="flex items-center">
                <input
                  disabled={loadingSt ? true : false}
                  name="exam"
                  value={AddAcademic?.exam}
                  type="text"
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                />
              </div>
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="new full Name"
                className="block text-white font-semibold mb-2"
              >
                position In Class:
              </label>
              <div className="flex items-center">
                <input
                  disabled={loadingSt ? true : false}
                  name="positionInClass"
                  value={AddAcademic?.positionInClass}
                  type="text"
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                />
              </div>
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="new full Name"
                className="block text-white font-semibold mb-2"
              >
                marks Obtained:
              </label>
              <div className="flex items-center">
                <input
                  disabled={loadingSt ? true : false}
                  name="marksObtained"
                  value={AddAcademic?.marksObtained}
                  type="number"
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                />
              </div>
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="new full Name"
                className="block text-white font-semibold mb-2"
              >
                Totall Marks:
              </label>
              <div className="flex items-center">
                <input
                  disabled={loadingSt ? true : false}
                  name="totalMarks"
                  value={AddAcademic?.totalMarks}
                  type="number"
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                />
              </div>
            </div>

            <button
              disabled={loadingSt ? true : false}
              type="submit"
              className="bg-white hover:bg-gray-300 text-blue-500 py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-300 w-full"
            >
              {loadingSt ? "Submitting..." : "Add Record"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAcademicRecord;
