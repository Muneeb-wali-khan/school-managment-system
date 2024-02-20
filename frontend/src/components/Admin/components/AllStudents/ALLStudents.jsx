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
    if (msgSt) {
      toast.success(msgSt);
      dispatch(adminFetchAllStudents());
    }
    if (errSt) {
      toast.success(errSt);
    }
    dispatch(clearErrorStudents());
    dispatch(adminFetchAllStudents());
  }, [msgSt, errSt, dispatch]);

  const onRequestClose = () => {
    setIsOpen(false);
    setIsStId(null);
  };

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
      name: "rollNo",
      label: "Roll No",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "className",
      label: "Class",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          // Access the nested className property
          const className = tableMeta.rowData[2]?.className?.toLowerCase();
          return className
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
            {/* <div className="mt-8 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-[#663399da]">
            All Students :
          </h2>
        </div> */}
            {errSt && (
              <p className="text-red-500 text-lg font-semibold mb-4">
                <div className="flex flex-col items-center justify-center h-[50vh] mt-10 w-full border border-gray-300 rounded-lg shadow-lg">
                  <h1 className="text-4xl font-extrabold text-red-500 mb-2">
                    {errSt}
                  </h1>
                  <p className="text-lg text-gray-600 leading-6">
                    It seems like you haven't been assigned as the Admin.
                  </p>
                </div>
              </p>
            )}

            {allSt && allSt?.length > 0 && (
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
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AllStudents;
