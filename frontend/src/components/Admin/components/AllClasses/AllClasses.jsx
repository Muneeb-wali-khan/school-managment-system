import React, { useEffect, useState } from "react";
import AnNav from "../../Navbar/AnNav";
import { useDispatch, useSelector } from "react-redux";
import {
  adminDeleteClass,
  adminFetchAllClasses,
  clearErrorClasses,
} from "../../../../store/features/admin.reducers";
import { Link, useNavigate } from "react-router-dom";
import LoaderAn from "../../LoaderAn/LoaderAn";
import toast from "react-hot-toast";
import AddClass from "../AllClasses/AddClass/AddClass";
import DeleteClass from "./DeleteClass/DeleteClass";

const AllClasses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenClassAdd, setIsOpenClassAdd] = useState(false);
  const [isStId, setIsStId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { loadingCls, errCls, allCls, msgDelCls, errDelCls } = useSelector(
    (state) => state?.admin?.classes
  );

  useEffect(() => {
    dispatch(adminFetchAllClasses());
  }, [dispatch]);

  //   // add
  const handleAddClass = () => {
    setIsOpenClassAdd(true);
  };

  const onCloseClassAdd = () => {
    setIsOpenClassAdd(false);
  };

  //   // delete
  const handleDeleteCls = (id) => {
    setIsStId(id);
    setIsOpen(true);
  };

  const handleDeleteClass = () => {
    if (isStId) {
      dispatch(adminDeleteClass(isStId));
      setIsStId(null);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (msgDelCls) {
      toast.success(msgDelCls);
      dispatch(adminFetchAllClasses());
    }
    if (errDelCls) {
      toast.error(errDelCls);
    }
    dispatch(clearErrorClasses());
  }, [dispatch, msgDelCls, errDelCls]);

  const onRequestClose = () => {
    setIsOpen(false);
    setIsStId(null);
  };


  return (
    <>
      <AddClass
        isOpenClassAdd={isOpenClassAdd}
        onCloseClassAdd={onCloseClassAdd}
      />
      <DeleteClass
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        handleDeleteClass={handleDeleteClass}
      />
      <div className="p-[1.25rem] w-4/5 navdashMain">
        <AnNav />
        {loadingCls ? (
          <LoaderAn />
        ) : (
          <>
            {allCls && allCls ? (
              <>
                <div className="mb-4 mt-6 text-[15px]" onClick={handleAddClass}>
                  <button className="bg-gradient-to-r from-[#8b008bef] to-[#861686e8] border-2 hover:border-2 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-300">
                    Add Class
                  </button>
                </div>

                <div className="overflow-x-auto overflow-y-auto sbdetailsAdminScrollBar max-h-[115vh]">
                  <table className="min-w-full bg-white border-2 rounded-lg border-[#8b008b8e]">
                    <thead className=" bg-[#a139a1] text-white">
                      <tr>
                        <th className="py-2 px-4 text-left border-b">
                          Class Name
                        </th>
                        <th className="py-2 px-4 text-left border-b">
                          Class Teacher
                        </th>
                        <th className="py-2 px-4 pl-7 text-left border-b">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allCls.map((cls) => (
                        <tr key={cls?._id} className="hover:bg-gray-100">
                          <td className="py-3 px-4 text-left border-b text-[#8b008bb9] font-semibold">
                            {cls.className}
                          </td>
                          <td className="py-3 px-4 text-left border-b text-[#8b008bb9] font-semibold">
                            {cls?.classTeacherID?.fullName || (
                              <>
                                <span className="text-red-400">N/A</span>
                              </>
                            )}
                          </td>
                          <td className="py-2 px-4 text-left border-b space-x-5 allSubjectsAdmin">
                            <Link
                              title="Veiw Class"
                              className="py-1 px-3 rounded-lg"
                              to={`/admin-portal/admin-class-details/${cls?._id}`}
                            >
                              <i className="text-blue-500 cursor-pointer fa fa-eye" />
                            </Link>
                            <a
                              title="Update Class"
                              className="py-1 px-3 rounded-lg"
                              onClick={() =>
                                navigate(
                                  `/admin-portal/admin-class-update/${cls?._id}`
                                )
                              }
                            >
                              <i className="text-[#8b008bc0] cursor-pointer fa fa-pen" />
                            </a>
                            <i
                              title="Remove Class"
                              className="py-1 px-3  text-red-500 rounded-lg cursor-pointer fa fa-trash"
                              onClick={() => handleDeleteCls(cls?._id)}
                            />
                            <i
                              title="Attendances Record"
                              className="py-1 px-3  text-gray-500 rounded-lg cursor-pointer fa fa-database"
                              onClick={() =>
                                navigate(
                                  `/admin-portal/admin-attendances-class/${cls?.className}`
                                )
                              }
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
                  No Classes Found ?.
                </p>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AllClasses;
