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
  const {
    allStudentsClass,
    loadingTeacher,
    errorTeacher,
    msgDelSt,
    errDelSt,
    profileTeacher,
  } = useSelector((state) => state?.teacher?.teacherD);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isStId, setIsStId] = useState(null);

  useEffect(()=>{
    dispatch(fetchAllStudents());
  },[dispatch])

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
      dispatch(fetchAllStudents());
    }
    if (errDelSt) {
      toast.error(errDelSt);
    }
    dispatch(clearErrorsTeacher());
    dispatch(fetchAllStudents());
  }, [msgDelSt, errDelSt, dispatch]);

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
              <Link to={`/teacher-portal/student-details/${userId}`}>
                <button
                  className=" rounded-md px-3 py-2 me-4 mb-2"
                  title="Veiw student"
                  style={{ backgroundColor: "rgb(59 186 211)" }}
                >
                  <span className="fa fa-eye text-white"></span>
                </button>
              </Link>

              <Link to={`/teacher-portal/update-student-class/${userId}`}>
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

    selectableRows: "none",
    rowsPerPage: 6,
    rowsPerPageOptions: [6, 15, 30, 60],
  };

  if ((errorTeacher && errorTeacher === null) || !errorTeacher) {
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
          <div className="mt-4">
            {allStudentsClass ? (
              <>
                <div
                  className="mb-4  text-[15px]"
                  onClick={() => navigate("/teacher-portal/add-student-class")}
                >
                  <button className="bg-gradient-to-r from-[#8D5ADD] to-[#794ACA] border-2 hover:border-2 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-300">
                    Add Student to Class
                  </button>
                </div>
                <MUIDataTable
                  title={`${
                    allStudentsClass &&
                    allStudentsClass[1]?.[0] +
                      allStudentsClass[1]
                        ?.substr(1, allStudentsClass[1]?.length)
                        .toLowerCase()
                  } | Students`}
                  data={allStudentsClass && allStudentsClass[0]}
                  columns={columns}
                  options={options}
                />
              </>
            ) : (
              <LoaderTr />
            )}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        {loadingTeacher ? (
          <LoaderTr />
        ) : (
          <div className="p-[1.25rem] w-4/5 navdashMain">
            <TrNav />
            <div className="mt-8 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-2 text-[#663399da]">
              {profileTeacher &&
                profileTeacher[1] &&
                profileTeacher[1]?.[0] +
                  profileTeacher[1]
                    ?.substring(1, profileTeacher[1].length)
                    .toLowerCase()}{" "}
              Students :
            </h2>
            </div>

            <div className="flex flex-col items-center justify-center h-[50vh] mt-10 w-full border border-gray-300 rounded-lg shadow-lg">
              <h1 className="text-4xl font-extrabold text-red-500 mb-2">
              You're not yet the Class Teacher of any class !
              </h1>
              <p className="text-lg text-gray-600 leading-6">
                It seems like you haven't been assigned as the Class Teacher for
                any class yet.
              </p>
              <p className="text-lg text-gray-600 leading-6 mt-4">
                Contact your administrator for further assistance.
              </p>
              <button className="mt-6 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-700">
                Request Administrator
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
};

export default TrStudents;
