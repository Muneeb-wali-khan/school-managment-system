import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singleAssignmentOfClass, updateAssignmentOfClass } from "../../../../../store/features/teacher.reducers";

const UpdateAssigment = ({
  isOpenUpdateAssignment,
  onCloseUpdateAssignment,
  isAssignmentUptId,
}) => {
  const dispatch = useDispatch();
  const {
    loadingAssigments,
    singleAssigment,
  } = useSelector((state) => state.teacher?.teacherD);

  const [updatedAssignment, setUpdatedAssignment] = useState({
    subject: "", 
    dueDate: "",
    docLink: ""
  });

  useEffect(()=>{
   if(isAssignmentUptId){
    dispatch(singleAssignmentOfClass(isAssignmentUptId))
   }
  },[dispatch, isAssignmentUptId])

  const handleChange = (e) => {
    const {name, value} = e.target
    setUpdatedAssignment({...updatedAssignment, [name]: value})
  }

  const handleUpdateAssigment = (e) => {
    e.preventDefault();
    dispatch(updateAssignmentOfClass({id: isAssignmentUptId, data: updatedAssignment}))
  };

  useEffect(()=>{
    if(singleAssigment){
      const formattedDate = singleAssigment.dueDate ? new Date(singleAssigment?.dueDate).toISOString().split('T')[0] : '';
      setUpdatedAssignment({
        subject: singleAssigment && singleAssigment.subject,
        dueDate: formattedDate,
        docLink: singleAssigment && singleAssigment.docLink,
      })
    }
  },[singleAssigment])

  return (
    <>
      <div
        className={`fixed inset-0 z-50 ${
          isOpenUpdateAssignment ? "" : "hidden"
        }`}
      >
        <div className="flex items-center justify-center h-screen">
          <div
            onClick={onCloseUpdateAssignment}
            className="fixed inset-0 bg-black opacity-50"
          ></div>
          <div className="custom-scrollbar bg-gradient-to-r from-[#7143bb] to-[#5d1cce] w-full max-h-[100%] sm:w-96 p-8 rounded-md shadow-md transform transition-transform duration-300 hover:scale-105 z-50 mx-4 sm:mx-auto">
            <h2 className="text-2xl sm:text-2xl font-bold text-white mb-6 flex items-center justify-center gap-4">
              Update Assignment
              <i className="fas fa-edit"></i>
            </h2>
            <form onSubmit={handleUpdateAssigment}>
              <div className="mb-4">
                <label
                  htmlFor="subject"
                  className="block text-white font-semibold mb-2"
                >
                  Subject: <span className="text-yellow-400">*</span>
                </label>
                <input
                  name="subject"
                  type="text"
                  value={updatedAssignment.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="dueDate"
                  className="block text-white font-semibold mb-2"
                >
                  Due Date: <span className="text-yellow-400">*</span>
                </label>
                <input
                  name="dueDate"
                  type="date"
                  value={updatedAssignment?.dueDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="docLink"
                  className="block text-white font-semibold mb-2"
                >
                  Document Link:
                </label>
                <input
                  name="docLink"
                  type="url"
                  value={updatedAssignment.docLink}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                />
              </div>
              <button
                disabled={loadingAssigments}
                type="submit"
                className="bg-white hover:bg-gray-300 text-blue-500 py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-300 w-full"
              >
                {loadingAssigments ? "Updating..." : "Update Assignment"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateAssigment;
