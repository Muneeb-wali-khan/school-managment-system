import React, { useEffect, useState } from "react";
import AnNav from "../../Navbar/AnNav";
import { useDispatch, useSelector } from "react-redux";
import {
  adminFetchAllTeachers,
  adminRemoveTeacher,
  clearErrorTeachers,
} from "../../../../store/features/admin.reducers";
import { Link, useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import LoaderAn from "../../LoaderAn/LoaderAn";
import DeleteModal from "../AllTeachers/DeleteModal/DeleteModal";
import toast from "react-hot-toast";

const AllTeachers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loadingTr, errDelTr, msgDelTr, allTr, errTr } = useSelector(
    (state) => state?.admin?.teachers
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isTrId, setIsTrId] = useState(null);

  useEffect(() => {
    dispatch(adminFetchAllTeachers());
  }, [dispatch]);

  const onDelete = (id) => {
    setIsTrId(id);
    setIsOpen(true);
  };

  const handleConfirmDelete = () => {
    if (isTrId) {
      dispatch(adminRemoveTeacher(isTrId));
      setIsTrId(null);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (errDelTr) {
      toast.success(errDelTr);
      dispatch(adminFetchAllTeachers());
    }
    if (msgDelTr) {
      toast.success(msgDelTr);
    }
    dispatch(clearErrorTeachers());
  }, [errDelTr, msgDelTr, dispatch]);

  const onRequestClose = () => {
    setIsOpen(false);
    setIsTrId(null);
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
      name: "subject",
      label: "Subject",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "className",
      label: "Teacher Class",
      options: {
        filter: true,
        sort: true,

        customBodyRender: (value, tableMeta)=>{
          const cls = tableMeta?.rowData?.[2]
        if(cls === "N/A"){
          return (
            <>
              <span className="text-red-500">{cls}</span>
            </>
          )
        }
        return (
          <>
            <span>{cls}</span>
          </>
        )
        }
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
      name: "avatar",
      label: "Avatar",
      options: {
        filter: false,
        sort: false,
        display: false,
        customBodyRender: (value, tableMeta) => {
          const userpic = tableMeta.rowData[4];
          return (
            <>
              <img src={userpic} width={45} height={45} alt="teacher picture" />
            </>
          );
        },
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
              <Link to={`/admin-portal/admin-teacher-details/${userId}`}>
                <button
                  className=" rounded-md px-3 py-2 me-4 mb-2"
                  title="Veiw teacher"
                  style={{ backgroundColor: "rgb(59 186 211)" }}
                >
                  <span className="fa fa-eye text-white"></span>
                </button>
              </Link>

              <Link to={`/admin-portal/admin-teacher-update/${userId}`}>
                <button
                  className="rounded-md px-3 py-2 me-4 mb-2"
                  title="Edit teacher"
                  style={{ backgroundColor: "rgb(255 185 27)" }}
                >
                  <span className="fa fa-pencil text-white"></span>
                </button>
              </Link>

              <a onClick={() => onDelete(userId)}>
                <button
                  className=" rounded-md px-3 py-2 me-2 mb-2"
                  title="Delete teacher"
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
        {loadingTr ? (
          <LoaderAn />
        ) : (
          <>
            {allTr && allTr?.length > 0 ? (
              <>
                <div
                  className="mb-4 mt-6 text-[15px]"
                  onClick={() => navigate("/admin-portal/admin-teacher-add")}
                >
                  <button className="bg-gradient-to-r from-[#8b008bef] to-[#861686e8] border-2 hover:border-2 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-300">
                    Add Teacher
                  </button>
                </div>
                <MUIDataTable
                  title={`All Teachers`}
                  data={allTr && allTr}
                  columns={columns}
                  options={options}
                />
              </>
            ) : (
              <>
                <p className="text-gray-600 text-lg font-semibold">
                  No Teachers Found ?.
                </p>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AllTeachers;
