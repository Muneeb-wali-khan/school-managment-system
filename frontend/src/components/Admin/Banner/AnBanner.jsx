import React from 'react'
import { useSelector } from 'react-redux';

const AnBanner = () => {
  const { userProfile } = useSelector((state) => state?.profile?.userProfile);

  return (
    <>
          {/* <!-- Banner --> */}
          <div class="rounded-md p-5 bg-[darkmagenta] relative overflow-hidden banner">
          <div class=" mx-5 bannermaindiv">

          {/* <!-- Left Side Div --> */}
          <div class="flex flex-col leftsiddivbanner">
            <p class="text-gray-200 text-lg mb-6">
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <div>
              <h1 class="text-3xl text-white mb-2 font-bold">
                Welcome back,{" "}
                {(userProfile &&
                  (userProfile.fullName.length > 11
                    ? userProfile.fullName.slice(0, 11) + ".."
                    : userProfile.fullName[0].toUpperCase() +
                      userProfile.fullName.substr(1))) ||
                  "Admin Name "}{" "} !
              </h1>
              <p class="text-gray-200">
                Always stay updated on your Admin portal.
              </p>
            </div>
          </div>


        </div>
      </div>
      
    </>
  )
}

export default AnBanner
