import React from 'react'
import { useSelector } from 'react-redux';

const StBanner = () => {
  const { userProfile } = useSelector((state) => state?.profile?.userProfile);

  return (
    <>
      {/* <!-- Banner --> */}
      <div className="rounded-md p-5 bg-[darkslategrey] overflow-y-hidden  banner">
        <div className=" mx-5 bannermaindiv">
          {/* <!-- Left Side Div --> */}
          <div className="flex flex-col leftsiddivbanner">
            <p className="text-gray-200 text-lg mb-6">
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <div>
              <h1 className="text-3xl text-white mb-2 font-bold">
                Welcome back,{" "}
                {(userProfile &&
                  (userProfile.fullName.length > 11
                    ? userProfile.fullName.slice(0, 11) + ".."
                    : userProfile.fullName[0].toUpperCase() +
                      userProfile.fullName.substr(1))) ||
                  "Student Name "}{" "} !
              </h1>
              <p className="text-gray-200">
                Always stay updated on your teacher portal.
              </p>
            </div>
          </div>


        </div>
      </div>
    </>
  )
}

export default StBanner
