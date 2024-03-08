import React, { useEffect, useState } from "react";
import AnNav from "../../../Navbar/AnNav";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoaderAn from "../../../LoaderAn/LoaderAn";
import { adminFetchSingleSubject } from "../../../../../store/features/admin.reducers";

const SbDetaills = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { loadingSb, errSb, singleSb } = useSelector(
    (state) => state?.admin?.subjects
  );

  useEffect(() => {
    dispatch(adminFetchSingleSubject(params?.id));
  }, [dispatch, params?.id]);

  return (
    <>
      <div className="p-[1.25rem] w-4/5 navdashMain">
        <AnNav />
        {loadingSb ? (
          <LoaderAn />
        ) : errSb ? (
          <>
            <p className="text-red-500 text-lg font-semibold mb-4">
              <div className="flex flex-col items-center justify-center h-[50vh] mt-10 w-full border border-gray-300 rounded-lg shadow-lg">
                <h1 className="text-4xl font-extrabold text-red-500 mb-2">
                  {errSb}
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
              {/* teachers */}
              {singleSb?.teachers && singleSb?.teachers?.length > 0 ? (
                <>
                  <div className="mt-8 max-w-7xl mx-auto mb-4 ml-1">
                    <h2 className="text-xl font-bold mb-2 text-[#663399da]">
                      All Teachers :
                    </h2>
                  </div>

                  <div className="overflow-x-auto overflow-y-auto sbdetailsAdminScrollBar max-h-[51vh]">
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
                        {singleSb?.teachers?.map((teacher) => (
                          <tr key={teacher?._id} className="hover:bg-gray-100">
                            <td className="py-3 px-4 text-left border-b text-[#8b008bb9] font-semibold">
                              {teacher?.fullName}
                            </td>
                            <td className="py-3 px-4 text-left border-b text-[#8b008bb9] font-semibold">
                              {teacher?.gender}
                            </td>
                            <td className="py-3 px-4 text-left border-b text-[#8b008bb9] font-semibold">
                              {teacher?.subject}
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
                      All Teachers :
                    </h2>
                  </div>
                  <div className="text-red-400 font-semibold text-md ml-1">
                    No teachers is assigned yet to that subject !
                  </div>
                </>
              )}

              {/* classses  */}

              {singleSb?.classes && singleSb?.classes?.length > 0 ? (
                <>
                  <div className="mt-8 max-w-7xl mx-auto mb-4 ml-1">
                    <h2 className="text-xl font-bold mb-2 text-[#663399da]">
                      All Classes :
                    </h2>
                  </div>

                  <div className="overflow-x-auto overflow-y-auto sbdetailsAdminScrollBar max-h-[51vh] ">
                    <table className="min-w-full bg-white border-gray-300 border-2 rounded-lg border-[#8b008b8e]">
                      <thead className="bg-[#a139a1] text-white">
                        <tr>
                          <th className="py-2 px-4 text-left border-b">
                            ClassName
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {singleSb?.classes?.map((cls) => (
                          <tr key={cls?._id} className="hover:bg-gray-100">
                            <td className="py-3 px-4 text-left border-b text-[#8b008bb9] font-semibold">
                              {cls?.className}
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
                      All Classes :
                    </h2>
                  </div>
                  <div className="text-red-400 font-semibold text-md ml-1">
                    No classes is assigned yet to that subject !
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

export default SbDetaills;
