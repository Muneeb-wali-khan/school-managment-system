import React, { useEffect, useState } from "react";
import AnNav from "../../Navbar/AnNav";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import {
  adminFetchAllStudents,
  adminRemoveStudent,
  clearErrorStudents,
} from "../../../../store/features/admin.reducers";
import LoaderAn from "../../LoaderAn/LoaderAn";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import DeleteModal from "../../components/AllStudents/DeleteModal/DeleteModal";

const AllStudents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allSt, errSt, msgSt, loadingSt } = useSelector(
    (state) => state.admin.students
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isStId, setIsStId] = useState(null);

  const onDelete = (id) => {
    setIsStId(id);
    setIsOpen(true);
  };

  const handleConfirmDelete = () => {
    if (isStId) {
      dispatch(adminRemoveStudent(isStId));
      setIsStId(null);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    dispatch(adminFetchAllStudents());
  }, [dispatch]);

  useEffect(() => {
    if (msgSt) {
      toast.success(msgSt);
      dispatch(adminFetchAllStudents());
    }
    if (errSt) {
      toast.error(errSt);
      dispatch(clearErrorStudents());
    }
    dispatch(clearErrorStudents());
  }, [msgSt, errSt, dispatch]);

  const onRequestClose = () => {
    setIsOpen(false);
    setIsStId(null);
  };

  const last48Hours = new Date();
  last48Hours.setHours(last48Hours.getHours() - 48);

  const columns = [
    {
      name: "_id",
      label: "ID",
      options: {
        filter: false,
        sort: false,
        display: false,
        download: false,
      },
    },
    {
      name: "createdAt",
      label: "Created At",
      options: {
        filter: false,
        sort: false,
        display: false,
        download: false,
      },
    },
    {
      name: "rollNo",
      label: "Roll No",
      options: {
        filter: false,
        sort: true,

        
        customBodyRender: (value, tableMeta) => {
          const roleNo = tableMeta.rowData[2]; // Assuming "fullName" is at index 3
          const createdAt = tableMeta.rowData[1];

          const isStudentNew = new Date(createdAt) >= last48Hours;

          return (
            <>
            <div className="flex items-center gap-2">
             <span>{roleNo}</span>
              {isStudentNew && (
                <div className="relative inline-block mr-2">
                  <span className="bg-green-400 text-black py-1 px-2  rounded-full text-xs">
                    new
                  </span>
                </div>
              )}
            </div>
            </>
          );
        },
      },
    },
    {
      name: "className",
      label: "Class",
      options: {
        filter: true,
        filterType: "multiselect",
        sort: true,
        customBodyRender: (value, tableMeta) => {
          // Access the nested className property
          const className = tableMeta.rowData[3]?.className?.toLowerCase();
          return className ? (
            className
          ) : (
            <span className="text-red-400">N/A</span>
          );
        },
      },
    },
    {
      name: "fullName",
      label: "Full Name",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "gender",
      label: "Gender",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,

        customBodyRender: (value, tableMeta) => {
          const userId = tableMeta.rowData[0];

          return (
            <>
              <Link to={`/admin-portal/admin-student-details/${userId}`}>
                <button
                  className=" rounded-md px-3 py-2 me-4 mb-2"
                  title="Veiw student"
                  style={{ backgroundColor: "rgb(59 186 211)" }}
                >
                  <span className="fa fa-eye text-white"></span>
                </button>
              </Link>

              <Link to={`/admin-portal/admin-update-student/${userId}`}>
                <button
                  className="rounded-md px-3 py-2 me-4 mb-2"
                  title="Edit student"
                  style={{ backgroundColor: "rgb(255 185 27)" }}
                >
                  <span className="fa fa-pencil text-white"></span>
                </button>
              </Link>

              <a onClick={() => onDelete(userId)}>
                <button
                  className=" rounded-md px-3 py-2 me-2 mb-2"
                  title="Delete student"
                  style={{ backgroundColor: "red" }}
                >
                  <span className="fa fa-trash text-white"></span>
                </button>
              </a>
            </>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    responsive: "simple", // Enable responsiveness
    customSort: (data, colIndex, order) => {
      if (colIndex === 1) {
        // Modify this condition for the "Product" column (column index 1)
        return data.sort((a, b) => {
          if (a.data[colIndex] < b.data[colIndex]) {
            return order === "asc" ? -1 : 1;
          }
          if (a.data[colIndex] > b.data[colIndex]) {
            return order === "asc" ? 1 : -1;
          }
          return 0;
        });
      }

      return data;
    },

    selectableRows: "none",
    rowsPerPage: 7,
    rowsPerPageOptions: [7, 15, 30, 60],
  };

  return (
    <>
      <DeleteModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        onDelete={onDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
      <div className="p-[1.25rem] w-4/5 navdashMain">
        <AnNav />
        {loadingSt ? (
          <LoaderAn />
        ) : (
          <>
            {allSt && allSt?.length > 0 ? (
              <>
                <div
                  className="mb-4 mt-6 text-[15px]"
                  onClick={() => navigate("/admin-portal/admin-student-add")}
                >
                  <button className="bg-gradient-to-r from-[#8b008bef] to-[#861686e8] border-2 hover:border-2 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-300">
                    Add Student to Class
                  </button>
                </div>
                <MUIDataTable
                  title={`All Students`}
                  data={allSt && allSt}
                  columns={columns}
                  options={options}
                />
              </>
            ) : (
              <>
                <p className="text-gray-600 text-lg font-semibold">
                  No Students Found ?.
                </p>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AllStudents;
