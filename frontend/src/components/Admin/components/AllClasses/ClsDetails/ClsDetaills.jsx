import React, { useEffect, useState } from "react";
import AnNav from "../../../Navbar/AnNav";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import LoaderAn from "../../../LoaderAn/LoaderAn";
import { adminFetchSingleClass } from "../../../../../store/features/admin.reducers";

const ClsDetaills = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { loadingCls, errCls, singleCls } = useSelector(
    (state) => state?.admin?.classes
  );

  useEffect(() => {
    dispatch(adminFetchSingleClass(params?.id));
  }, [dispatch, params?.id]);

  return (
    <>
      <div className="p-[1.25rem] w-4/5 navdashMain">
        <AnNav />
        {loadingCls ? (
          <LoaderAn />
        ) : errCls ? (
          <>
            <p className="text-red-500 text-lg font-semibold mb-4">
              <div className="flex flex-col items-center justify-center h-[50vh] mt-10 w-full border border-gray-300 rounded-lg shadow-lg">
                <h1 className="text-4xl font-extrabold text-red-500 mb-2">
                  {errCls}
                </h1>
                <p className="text-lg text-gray-600 leading-6">
                  It seems like you haven't been assigned as the Admin.
                </p>
              </div>
            </p>
          </>
        ) : (
          <>
            <div className="flex flex-col">
              {/* Students */}
              {singleCls?.students && singleCls?.students?.length > 0 ? (
                <>
                  <div className="mt-8 max-w-7xl mx-auto mb-4 ml-1">
                    <h2 className="text-xl font-bold mb-2 text-[#663399da]">
                      Students Of Class :
                    </h2>
                  </div>

                  <div className="overflow-x-auto overflow-y-auto sbdetailsAdminScrollBar max-h-[35vh]">
                    <table className="min-w-full bg-white border-gray-300 border-2 rounded-lg border-[#8b008b8e]">
                      <thead className="bg-[#a139a1] text-white">
                        <tr>
                          <th className="py-2 px-4 text-left border-b">
                            Student Name
                          </th>
                          <th className="py-2 px-4 text-left border-b">
                            Gender
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {singleCls?.students?.map((std) => (
                          <tr key={std?._id} className="hover:bg-gray-100">
                            <td className="py-3 px-4 text-left border-b text-[#8b008bb9] font-semibold">
                              {std?.fullName}
                            </td>
                            <td className="py-3 px-4 text-left border-b text-[#8b008bb9] font-semibold">
                              {std?.gender}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-8 max-w-7xl ml-1">
                    <h2 className="text-xl font-bold mb-2 text-[#663399da]">
                      Students of Class :
                    </h2>
                  </div>
                  <div className="text-red-400 font-semibold text-md ml-1">
                    Students Not Found !
                  </div>
                </>
              )}


              {/* teacher of  classs  */}
              {singleCls?.teachersOfClass &&
              singleCls?.teachersOfClass?.length > 0 ? (
                <>
                  <div className="mt-8 max-w-7xl mx-auto mb-4 ml-1">
                    <h2 className="text-xl font-bold mb-2 text-[#663399da]">
                      Teachers Of Class :
                    </h2>
                  </div>

                  <div className="overflow-x-auto overflow-y-auto sbdetailsAdminScrollBar max-h-[30vh] ">
                    <table className="min-w-full bg-white border-gray-300 border-2 rounded-lg border-[#8b008b8e]">
                      <thead className="bg-[#a139a1] text-white">
                        <tr>
                          <th className="py-2 px-4 text-left border-b">
                            Teacher Name
                          </th>
                          <th className="py-2 px-4 text-left border-b">
                            Gender
                          </th>
                          <th className="py-2 px-4 text-left border-b">
                            Subject
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {singleCls?.teachersOfClass?.map((tcls) => (
                          <tr key={tcls?._id} className="hover:bg-gray-100">
                            <td className="py-3 px-4 text-left border-b text-[#8b008bb9] font-semibold">
                              {tcls?.fullName}
                            </td>
                            <td className="py-3 px-4 text-left border-b text-[#8b008bb9] font-semibold">
                              {tcls?.gender}
                            </td>
                            <td className="py-3 px-4 text-left border-b text-[#8b008bb9] font-semibold">
                              {tcls?.subject}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-8 max-w-7xl ml-1">
                    <h2 className="text-xl font-bold mb-2 text-[#663399da]">
                      Teachers Of Class :
                    </h2>
                  </div>
                  <div className="text-red-400 font-semibold text-md ml-1">
                    No Teachers is asigned Yet to that Class !
                  </div>
                </>
              )}


              {/* subjects of  classs  */}
              {singleCls?.subjects && singleCls?.subjects?.length > 0 ? (
                <>
                  <div className="mt-8 max-w-7xl mx-auto mb-4 ml-1">
                    <h2 className="text-xl font-bold mb-2 text-[#663399da]">
                      Subjects Of Class :
                    </h2>
                  </div>

                  <div className="overflow-x-auto overflow-y-auto sbdetailsAdminScrollBar max-h-[25vh] ">
                    <table className="min-w-full bg-white border-gray-300 border-2 rounded-lg border-[#8b008b8e]">
                      <thead className="bg-[#a139a1] text-white">
                        <tr>
                          <th className="py-2 px-4 text-left border-b">
                            Subject Name
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {singleCls?.subjects?.map((sb) => (
                          <tr key={sb?._id} className="hover:bg-gray-100">
                            <td className="py-3 px-4 text-left border-b text-[#8b008bb9] font-semibold">
                              {sb?.subjectName}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-8 max-w-7xl ml-1">
                    <h2 className="text-xl font-bold mb-2 text-[#663399da]">
                      Teachers Of Class :
                    </h2>
                  </div>
                  <div className="text-red-400 font-semibold text-md ml-1">
                    No Teachers is asigned Yet to that Class !
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ClsDetaills;
