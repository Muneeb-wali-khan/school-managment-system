import React, { useEffect, useState } from "react";
import AnNav from "../../Navbar/AnNav";
import { useDispatch, useSelector } from "react-redux";
import {
  adminDeleteUserWebApp,
  adminFetchAllUsersWebApp,
  clearErrorUsersWeb,
} from "../../../../store/features/admin.reducers";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import LoaderAn from "../../LoaderAn/LoaderAn";
import DeleteModal from "../AllUsers/DeleteModal/DeleteModal";
import toast from "react-hot-toast";
import UpdateUserRole from "./UpdateUserRole/UpdateUserRole";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { loadingUsersWeb, errDelUsersWeb, msgDelUsersWeb, allUsersWeb } =
    useSelector((state) => state?.admin?.users);

  const [isOpen, setIsOpen] = useState(false);
  const [isUserId, setIsUserId] = useState(null);
  const [isUserUptId, setIsUserUptId] = useState(null);
  const [isOpenUpdateUserWeb, SetIsOpenUpdateUserWeb] = useState(false);

  useEffect(() => {
    dispatch(adminFetchAllUsersWebApp());
  }, [dispatch]);

  // update modal
  const handleUpdate = (userId) => {
    setIsUserUptId(userId);
    SetIsOpenUpdateUserWeb(true);
  };

  const onCloseUpdateUserWeb = () => {
    setIsUserUptId(null);
    SetIsOpenUpdateUserWeb(false);
  };

  // delete modal
  const onDelete = (id) => {
    setIsUserId(id);
    setIsOpen(true);
  };

  const handleConfirmDelete = () => {
    if (isUserId) {
      dispatch(adminDeleteUserWebApp(isTrId));
      setIsUserId(null);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (errDelUsersWeb) {
      toast.success(errDelUsersWeb);
      dispatch(adminFetchAllUsersWebApp());
    }
    if (msgDelUsersWeb) {
      toast.success(msgDelUsersWeb);
    }
    dispatch(clearErrorUsersWeb());
  }, [errDelUsersWeb, msgDelUsersWeb, dispatch]);

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
      name: "role",
      label: "User Role",
      options: {
        filter: true,
        sort: true,

        customBodyRender: (value, tableMeta) => {
          const Role = tableMeta?.rowData[1];
          const isActive = tableMeta?.rowData[6];
          if (Role === "admin") {
            return (
              <>
                <span className="text-red-600">{Role}</span>
              </>
            );
          } else if (Role === "teacher") {
            return (
              <>
                <div className="relative">
                  <span className="text-green-600">{Role}</span>
                  <span className="absolute -top-2 right-3  text-[0.45rem] text-white rounded-full">
                    {isActive ? "🟢" : "🔘"}
                  </span>
                </div>
              </>
            );
          } else if (Role === "student") {
            return (
              <>
                <div className="relative">
                  <span className="text-blue-600">{Role}</span>
                  <span className="absolute -top-2 right-3 text-[0.45rem] text-white rounded-full">
                    {isActive ? "🟢" : "🔘"}
                  </span>
                </div>
              </>
            );
          }
        },
      },
    },
    {
      name: "username",
      label: "UserName",
      options: {
        filter: false,
        sort: false,
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
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,

        customBodyRender: (value, tableMeta) => {
          const userId = tableMeta.rowData[0];

          return (
            <>
              <Link to={`/admin-portal/admin-user-details/${userId}`}>
                <button
                  className=" rounded-md px-3 py-2 me-4 mb-2"
                  title="Veiw teacher"
                  style={{ backgroundColor: "rgb(59 186 211)" }}
                >
                  <span className="fa fa-eye text-white"></span>
                </button>
              </Link>

              <a onClick={() => handleUpdate(userId)}>
                <button
                  className="rounded-md px-3 py-2 me-4 mb-2"
                  title="Update User Role"
                  style={{ backgroundColor: "rgb(255 185 27)" }}
                >
                  <span className="fa fa-pencil text-white"></span>
                </button>
              </a>

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

    {
      name: "isActive",
      label: "Active",
      options: {
        filter: false,
        sort: false,
        display: false,
        download: false,
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

      <UpdateUserRole
        isOpenUpdateUserWeb={isOpenUpdateUserWeb}
        onCloseUpdateUserWeb={onCloseUpdateUserWeb}
        isUserUptId={isUserUptId}
      />
      <div className="p-[1.25rem] w-4/5 navdashMain">
        <AnNav />
        {loadingUsersWeb ? (
          <LoaderAn />
        ) : (
          <>
            {allUsersWeb && allUsersWeb?.length > 0 ? (
              <div className="mt-10">
                <MUIDataTable
                  title={`All Users`}
                  data={allUsersWeb && allUsersWeb}
                  columns={columns}
                  options={options}
                />
              </div>
            ) : (
              <>
                <>
                  <p className="text-gray-600 text-lg font-semibold">
                    No Users Found ?.
                  </p>
                </>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AllUsers;
