import React, { useEffect, useState } from "react";
import AnNav from "../../Navbar/AnNav";
import { useDispatch, useSelector } from "react-redux";
import { adminDeleteSubject, adminFetchAllSubjects, clearErrorSubjects } from "../../../../store/features/admin.reducers";
import { Link } from "react-router-dom";
import LoaderAn from "../../LoaderAn/LoaderAn";
import AddSubject from "./AddSubject/AddSubject";
import DeleteSubject from "./DeleteSubject/DeleteSubject";
import toast from "react-hot-toast";

const AllSubjects = () => {
  const dispatch = useDispatch();
  const [isOpenSubjectAdd, setIsOpenSubjectAdd] = useState(false);
  const [isStId, setIsStId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { loadingSb, errSb, allSb ,msgDelSb,errDelSb} = useSelector(
    (state) => state?.admin?.subjects
  );

  useEffect(() => {
    dispatch(adminFetchAllSubjects());
  }, [dispatch]);

  // add
  const handleAddSub = () => {
    setIsOpenSubjectAdd(true);
  };

  const onCloseSubjectAdd = () => {
    setIsOpenSubjectAdd(false);
  };


  // delete
  const handleDeleteSub = (id) => {
    setIsStId(id);
    setIsOpen(true);
  };

  const handleDeleteSubject = () => {
    if (isStId) {
      dispatch(adminDeleteSubject(isStId));
      setIsStId(null);
      setIsOpen(false);
    }
  };

  useEffect(()=>{
    if(msgDelSb){
      toast.success(msgDelSb)
    }
    if(errDelSb){
      toast.error(errDelSb)
    }
    dispatch(adminFetchAllSubjects());
    dispatch(clearErrorSubjects())
  },[dispatch, msgDelSb, errDelSb])

  const onRequestClose = () => {
    setIsOpen(false);
    setIsStId(null);
  };

  return (
    <>
      <AddSubject
        isOpenSubjectAdd={isOpenSubjectAdd}
        onCloseSubjectAdd={onCloseSubjectAdd}
      />
      <DeleteSubject
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        handleDeleteSubject={handleDeleteSubject}
      />
      <div className="p-[1.25rem] w-4/5 navdashMain">
        <AnNav />
        {loadingSb ? (
          <LoaderAn />
        ) : (
          <>
            {allSb && allSb ? (
              <>
                <div className="mb-4 mt-6 text-[15px]" onClick={handleAddSub}>
                  <button className="bg-gradient-to-r from-[#8b008bef] to-[#861686e8] border-2 hover:border-2 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-300">
                    Add Subject
                  </button>
                </div>

                <div className="overflow-x-auto overflow-y-auto sbdetailsAdminScrollBar max-h-[115vh]">
                  <table className="min-w-full bg-white border-2 rounded-lg border-[#8b008b8e]">
                    <thead className=" bg-[#a139a1] text-white">
                      <tr>
                        <th className="py-2 px-4 text-left border-b">
                          Subject Name
                        </th>
                        <th className="py-2 px-4 pl-7 text-left border-b">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allSb.map((subject) => (
                        <tr key={subject?._id} className="hover:bg-gray-100">
                          <td className="py-3 px-4 text-left border-b text-[#8b008bb9] font-semibold">
                            {subject.subjectName}
                          </td>
                          <td className="py-2 px-4 text-left border-b space-x-5 allSubjectsAdmin">
                            <Link
                              title="Veiw Subject"
                              className="py-1 px-3 rounded-lg"
                              to={`/admin-portal/admin-subject-details/${subject?._id}`}
                            >
                              <i className="text-blue-500 cursor-pointer fa fa-eye" />
                            </Link>
                            <Link
                              title="Veiw Subject"
                              className="py-1 px-3 rounded-lg"
                              to={`/admin-portal/admin-subject-curriculums/${subject?._id}`}
                            >
                              <i className="text-[#8b008bc0] cursor-pointer fa fa-book" />
                            </Link>
                            <i
                              title="Remove Subject"
                              className="py-1 px-3   text-red-500 rounded-lg cursor-pointer fa fa-trash"
                              onClick={() => handleDeleteSub(subject?._id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-600 text-lg font-semibold">
                  No Subjects Found ?.
                </p>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AllSubjects;
