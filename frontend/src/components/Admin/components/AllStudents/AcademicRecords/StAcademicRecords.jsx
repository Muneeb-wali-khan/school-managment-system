import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { adminAllStudentAcademicRecord, adminRemoveAcademicRecord, adminSingleAcademicRecord } from "../../../../../store/features/admin.reducers";
import { useParams } from "react-router-dom";
import AnNav from "../../../Navbar/AnNav";
import LoaderAn from "../../../LoaderAn/LoaderAn";
import AddAcademicRecord from "../AddAcademic/AddAcademicRecord";
import UpdateAcademicRecord from "../UpdateAcademic/UpdateAcademicRecord";
import DeleteAcademicRecord from "../DeleteAcademicModal/DeleteAcademicRecord";

const StAcademicRecords = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [isModalOpenAcademicAdd, setIsModalOpenAcademicAdd] = useState(false);
  const [isModalOpenAcademicUpdate, setIsModalOpenAcademicUpdate] = useState(false);
  const [uptId, setUptId] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isStId, setIsStId] = useState(null);

  const { academic, loadingSt } = useSelector(
    (state) => state?.admin?.students
  );


  useEffect(() => {
    dispatch(adminAllStudentAcademicRecord(params?.id));
  }, [params?.id, dispatch]);

    
  // update modal
  const handleUpdateAcademic = (id) => {
    setIsModalOpenAcademicUpdate(true);
    setUptId(id)
  };
  const closeModalAcademicUpdate = () => {
    setIsModalOpenAcademicUpdate(false);
  };


  // delete
  const onDelete = (id) => {
    setIsStId(id);
    setIsOpen(true);
  };

  const handleDeleteAcademic = () => {
    if (isStId) {
      dispatch(adminRemoveAcademicRecord(isStId));
      setIsStId(null);
      setIsOpen(false);
      dispatch(adminAllStudentAcademicRecord(params?.id))
    }
  };

  const onRequestClose = () => {
    setIsOpen(false);
    setIsStId(null);
  };


  // add modal
  const openModalAcademicAdd = () => {
    setIsModalOpenAcademicAdd(true);
  };
  const closeModalAcademicAdd = () => {
    setIsModalOpenAcademicAdd(false);
  };


  return (
    <>
      <AddAcademicRecord
        isOpenAcademicAdd={isModalOpenAcademicAdd}
        onCloseAcademicAdd={closeModalAcademicAdd}
      />
      <UpdateAcademicRecord
        isOpenAcademicUpdate={isModalOpenAcademicUpdate}
        onCloseAcademicUpdate={closeModalAcademicUpdate}
        uptId={uptId}
      />
      <DeleteAcademicRecord
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        handleDeleteAcademic={handleDeleteAcademic}
      />

      <div className="p-[1.25rem] w-4/5 navdashMain">
        <AnNav />
        {loadingSt && <LoaderAn />}
        {/* button + heading */}
        <div className="mt-12 max-w-7xl mx-auto flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#8B008B]">
            Academic Records :
          </h2>
          <button
            onClick={openModalAcademicAdd}
            className="text-white bg-[#8B008B] py-1 px-3 rounded-lg mr-12"
          >
            Add New Record
          </button>
        </div>

        <div className="mt-8 max-w-4xl">
          {academic && academic.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {academic.map((record) => (
                  <div key={record?._id}>
                    <div
                      className="bg-white border-2 border-[#8b008b98] rounded-md overflow-hidden shadow-lg p-6 mb-4"
                    >
                      <h3 className="text-xl font-bold mb-3">{record?.exam}</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Year: {record?.year}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        Class: {record?.pClass}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        Grade: {record?.grade}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        Percentage: {record?.percentage}%
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        Position in Class: {record?.positionInClass}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        Marks Obtained: {record?.marksObtained}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        Total Marks: {record?.totalMarks}
                      </p>

                      {/* update and delete */}

                      <div className=" flex gap-5 items-center justify-end">
                        <i
                        onClick={()=> handleUpdateAcademic(record?._id)}
                          title="UPDATE RECORD"
                          className="fa fa-pen text-yellow-500 text-md cursor-pointer p-2 hover:bg-[#8b008b98] hover:text-white transition-all rounded-md"
                        ></i>
                        <i
                        onClick={()=> onDelete(record?._id)}
                          title="DELETE RECORD"
                          className="fa fa-trash text-red-500 text-md cursor-pointer p-2 hover:bg-[#8b008b98] hover:text-white transition-all rounded-md"
                        ></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-600 text-lg font-semibold">
              No academic records found for this student.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default StAcademicRecords;
