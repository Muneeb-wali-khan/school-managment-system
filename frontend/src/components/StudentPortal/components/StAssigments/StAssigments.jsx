import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import StNav from "../../Navbar/StNav";
import LoaderSt from "../../LoaderSt/LoaderSt";
import { studentClassAssignments } from "../../../../store/features/student.reducers";

const StAssigments = () => {
  const dispatch = useDispatch();
  const { assigments, loadingStAssigments, errorStudent } = useSelector(
    (state) => state.student?.studentD
  );

  useEffect(() => {
    dispatch(studentClassAssignments());
  }, [dispatch]);

  return (
    <>
      <div className="p-[1.25rem] w-4/5 navdashMain">
        <StNav />
        <>
          <h1 className="text-2xl font-bold mb-4 text-[#2F4F4F] mt-6">
           All Assigmnments :{" "}
          </h1>
        </>
        {loadingStAssigments ? (
          <LoaderSt />
        ) : errorStudent ? (
          <>
            <p className="text-red-500">{errorStudent}</p>
          </>
        ) : (
          <div className=" h-[115vh] max-h-[115vh] overflow-y-auto">
            {assigments && assigments.length > 0 ? (
              assigments?.map((assignment) => (
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border-[#2F4F4F] border-2">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {assignment.subject}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Due Date:</span>{" "}
                    <span className="text-red-600">
                    {new Date(assignment?.dueDate).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                    </span>
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Created By:</span>{" "}
                    {assignment.createdBy}
                  </p>
                  <div className="flex items-center">
                    <a
                      href={assignment.docLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Document
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Assignments not found !</p>
            )}
          </div>
        )}
      </div>
      ;
    </>
  );
};

export default StAssigments;
