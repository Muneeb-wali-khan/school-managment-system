import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorsTeacher,
  removeAssignmentOfClass,
} from "../../../../store/features/teacher.reducers";
import toast from "react-hot-toast";
import TrNav from "../../Navbar/TrNav";
import CreateAssigments from "./createAssigments/CreateAssigments";
import UpdateAssigment from "./updateAssigment/UpdateAssigment";
import DeleteModal from "./DeleteModal/DeleteModal";

const Assigments = () => {
  const dispatch = useDispatch();
  const {
    loadingAssigments,
    errorAssigment,
    msgAssigment,
    assigments,
  } = useSelector((state) => state.teacher?.teacherD);

  const [isOpenUpdateAssignment, setIsOpenUpdateAssignment] = useState(false);
  const [isAssignmentUptId, setIsAssignmentUptId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [delUptId, setDelUptId] = useState(null);



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
      onCloseUpdateAssignment()
        onRequestClose()
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
        loadingAssigments={loadingAssigments}
      />

      <UpdateAssigment
        isOpenUpdateAssignment={isOpenUpdateAssignment}
        onCloseUpdateAssignment={onCloseUpdateAssignment}
        isAssignmentUptId={isAssignmentUptId}
      />

      <div className="p-[1.25rem] w-4/5 navdashMain">
        <TrNav />

          <>
            {assigments && (
              <div className="flex flex-col sm:flex-row justify-between m-2">
                {/* create assigments */}
                <CreateAssigments
                  assigments={assigments}
                  loadingAssigments={loadingAssigments}
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
      </div>
    </>
  );
};

export default Assigments;
