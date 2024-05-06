import React, { useEffect, useState } from "react";
import TrNav from "../../Navbar/TrNav";
import { useDispatch, useSelector } from "react-redux";
import MUIDataTable from "mui-datatables";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteModal from "./DeleteModal/DeleteModal";
import {
  DeleteStudentOfClass,
  clearErrorsTeacher,
  allStudentsClass as fetchAllStudents,
} from "../../../../store/features/teacher.reducers";
import toast from "react-hot-toast";
import LoaderTr from "../../LoaderTr/LoaderTr";

const TrStudents = () => {
  const { allStudentsClass, loadingStudent, msgDelSt, errDelSt } = useSelector(
    (state) => state?.teacher?.teacherD
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isStId, setIsStId] = useState(null);

  const onDelete = (id) => {
    setIsStId(id);
    setIsOpen(true);
  };

  const handleConfirmDelete = () => {
    if (isStId) {
      dispatch(DeleteStudentOfClass(isStId));
      setIsStId(null);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (msgDelSt) {
      toast.success(msgDelSt);
    }
    if (errDelSt) {
      toast.error(errDelSt);
    }
    dispatch(clearErrorsTeacher());
  }, [msgDelSt, errDelSt, dispatch]);

  const onRequestClose = () => {
    setIsOpen(false);
    setIsStId(null);
  };

  const handleEdit = (id) => {
    navigate(`/teacher-portal/update-student-class/${id}`);
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
        download: true,

      },
    },
    {
      name: "fullName",
      label: "Full Name",
      options: {
        filter: false,
        sort: false,
        download: true,

      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: false,
        sort: false,
        download: true,

      },
    },
    {
      name: "gender",
      label: "Gender",
      options: {
        filter: true,
        sort: false,
        download: true,

      },
    },
    // Add the remaining fields here
    {
      name: "age",
      label: "Age",
      options: {
        filter: false,
        sort: true,
        display: false,
        download: true,

      },
    },
    {
      name: "admissionClass",
      label: "Admission Class",
      options: {
        filter: false,
        sort: false,
        download: true,
        display: false,
      },
    },
    {
      name: "fatherName",
      label: "Father's Name",
      options: {
        filter: false,
        sort: false,
        display: false,
        download: true,

      },
    },
    {
      name: "DOB",
      label: "Date of Birth",
      options: {
        filter: false,
        sort: true,
        download: true,
        display: false,
        customBodyRender: (value) => {
          return new Date(value).toLocaleDateString();
        },
      },
    },
    {
      name: "joiningDate",
      label: "Joining Date",
      options: {
        filter: false,
        sort: true,
        download: true,
        display: false,
        customBodyRender: (value) => {
          return new Date(value).toLocaleDateString();
        },
      },
    },
    {
      name: "bloodGroup",
      label: "Blood Group",
      options: {
        filter: true,
        sort: false,
        download: true,
        filterType: "multiselect",
        display: false,
      },
    },
    {
      name: "address",
      label: "Address",
      options: {
        filter: false,
        sort: false,
        download: true,
        display: false,
      },
    },
    {
      name: "phone",
      label: "Phone",
      options: {
        filter: false,
        download: true,
        sort: false,
        display: false,
      },
    },
    {
      name: "avatar",
      label: "Avatar",
      options: {
        filter: false,
        sort: false,
        download: true,
        display: false,
        customBodyRender: (value) => {
          return <img src={value} alt="Avatar"  height={30} width={30} />;
        },
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
              <Link to={`/teacher-portal/student-details/${userId}`}>
                <button
                  className="rounded-md px-3 py-2 me-4 mb-2"
                  title="View student"
                  style={{ backgroundColor: "rgb(59 186 211)" }}
                >
                  <span className="fa fa-eye text-white"></span>
                </button>
              </Link>
              <button
                onClick={() => handleEdit(userId)}
                className="rounded-md px-3 py-2 me-4 mb-2"
                title="Edit student"
                style={{ backgroundColor: "rgb(255 185 27)" }}
              >
                <span className="fa fa-pencil text-white"></span>
              </button>
              <button
                onClick={() => onDelete(userId)}
                className="rounded-md px-3 py-2 me-2 mb-2"
                title="Delete student"
                style={{ backgroundColor: "red" }}
              >
                <span className="fa fa-trash text-white"></span>
              </button>
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
      if (
        colIndex === 1 ||
        colIndex === 3 ||
        colIndex === 4 ||
        colIndex === 5
      ) {
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

    selectableRows: false,
    rowsPerPage: 6,
    rowsPerPageOptions: [6, 15, 30, 60],
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
        <TrNav />
        {

          <>
            <div className="mt-4">
              <>
                {allStudentsClass && (
                  <>
                    <div
                      className="mb-4  text-[15px]"
                      onClick={() =>
                        navigate("/teacher-portal/add-student-class")
                      }
                    >
                      <button className="bg-gradient-to-r mt-2 from-[#8D5ADD] to-[#794ACA] border-2 hover:border-2 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-300">
                        Add Student to Class
                      </button>
                    </div>
                    <MUIDataTable
                      title={`${
                        allStudentsClass && allStudentsClass?.length > 0 &&
                        allStudentsClass?.[1]?.[0] +
                          allStudentsClass?.[1]
                            ?.substr(1, allStudentsClass[1]?.length)
                            .toLowerCase()
                      } | Students`}
                      data={allStudentsClass && allStudentsClass[0]}
                      columns={columns}
                      options={options}
                    />
                  </>
                ) }
              </>
            </div>
          </>
        }
      </div>
    </>
  );
};

export default TrStudents;
