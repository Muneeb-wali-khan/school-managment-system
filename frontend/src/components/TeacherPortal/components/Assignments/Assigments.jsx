import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorsTeacher,
  allAssignmentsOfClass,
  removeAssignmentOfClass,
} from "../../../../store/features/teacher.reducers";
import toast from "react-hot-toast";
import LoaderTr from "../../LoaderTr/LoaderTr";
import TrNav from "../../Navbar/TrNav";
import CreateAssigments from "./createAssigments/CreateAssigments";
import UpdateAssigment from "./updateAssigment/UpdateAssigment";
import DeleteModal from "./DeleteModal/DeleteModal";

const Assigments = () => {
  const dispatch = useDispatch();
  const {
    loadingTeacher,
    errorTeacher,
    errorAssigment,
    msgAssigment,
    assigments,
  } = useSelector((state) => state.teacher?.teacherD);

  const [isOpenUpdateAssignment, setIsOpenUpdateAssignment] = useState(false);
  const [isAssignmentUptId, setIsAssignmentUptId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [delUptId, setDelUptId] = useState(null);

  useEffect(() => {
    dispatch(allAssignmentsOfClass());
  }, [dispatch]);


  // update assigment
  const handleUpdateAssigment = (id)=>{
    if(id){
      setIsAssignmentUptId(id)
      setIsOpenUpdateAssignment(true)
    }
  }

  const onCloseUpdateAssignment = ()=>{
    setIsAssignmentUptId(null)
    setIsOpenUpdateAssignment(false)
  }

  // delete assigment
  const handleDelete = (id)=>{
    if(id){
      setIsOpen(true)
      setDelUptId(id)
    }
  }

  const onRequestClose = ()=>{
    setIsOpen(false)
    setDelUptId(null)
  }

  const handleConfirmDelete = ()=>{
    dispatch(removeAssignmentOfClass(delUptId))
    onRequestClose()
  }

  useEffect(() => {
    if (msgAssigment) {
      toast.success(msgAssigment);
      dispatch(allAssignmentsOfClass());
    }
    if (errorAssigment) {
      toast.error(errorAssigment);
    }
    dispatch(clearErrorsTeacher());
  }, [dispatch, errorAssigment, msgAssigment]);


  return (
    <>
      <DeleteModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        handleConfirmDelete={handleConfirmDelete}
      />

      <UpdateAssigment
        isOpenUpdateAssignment={isOpenUpdateAssignment}
        onCloseUpdateAssignment={onCloseUpdateAssignment}
        isAssignmentUptId={isAssignmentUptId}
      />

      <div className="p-[1.25rem] w-4/5 navdashMain">
        <TrNav />
        {loadingTeacher ? (
          <LoaderTr />
        ) : errorTeacher && errorTeacher ? (
          <>
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
          </>
        ) : (
          <>
            {assigments && assigments?.length > 0 && (
              <div className="flex flex-col sm:flex-row justify-between m-2">
                {/* create assigments */}
                <CreateAssigments
                  assigments={assigments}
                  loadingTeacher={loadingTeacher}
                />

                {/*  show assigments */}
                <div className="flex flex-col gap-6 mt-4 bg-white p-6 rounded-lg  border-2 border-[#66339975] w-full sm:w-1/2 h-auto sm:h-[120vh] overflow-y-auto">
                  <h2 className="text-2xl font-semibold mb-4 text-[#663399]">
                    All Assigments :
                  </h2>

                  {assigments && assigments?.length > 0 ? (
                    assigments?.map((assignment, index) => (
                      <div
                        key={index}
                        className="bg-white shadow-md rounded-md p-4 mb-4 relative"
                      >
                        <h3 className="text-xl font-bold mb-2 text-[#663399b6] inline-block">
                          {assignment.subject}
                        </h3>
                        <div className="absolute top-0 right-0 mt-1 mr-3 space-x-4">
                          <i
                            className="fas fa-edit text-gray-500 mr-2 cursor-pointer"
                            onClick={() => handleUpdateAssigment(assignment && assignment?._id)}
                          ></i>
                          <i
                            className="fas fa-trash text-red-500 cursor-pointer"
                            onClick={() => handleDelete(assignment && assignment?._id)}
                          ></i>
                        </div>
                        <p className="text-gray-600 mb-2">
                          Due Date:{" "}
                          {new Date(assignment.dueDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600 mb-2">
                          Class: {assignment.forClass}
                        </p>
                        <p className="text-gray-600 mb-2">
                          Created By: {assignment.createdBy}
                        </p>
                        <a
                          href={assignment.docLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 font-semibold mb-2 hover:underline block"
                        >
                          View Document
                        </a>
                        <p className="text-gray-600">
                          Created At:{" "}
                          {new Date(assignment.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No Assignments Found !</p>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Assigments;
