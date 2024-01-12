import React from 'react'

const StBanner = () => {
  return (
    <>
          {/* <!-- Banner --> */}
          <div class="rounded-md p-5 bg-[#925FE2] relative overflow-hidden banner">
        <div class="flex items-center mx-5 bannermaindiv">
          {/* <!-- Left Side Div --> */}
          <div class="flex flex-col leftsiddivbanner">
            <p class="text-gray-200 text-lg mb-6">September 4, 2023</p>
            <div>
              <h1 class="text-3xl text-white mb-2 font-bold">
                Welcome back, Muneeb !
              </h1>
              <p class="text-gray-200">
                Always stay updated on your student portal.
              </p>
            </div>
          </div>

          {/* <!-- Right Side Div --> */}
          <div class="ml-auto flex absolute right-4 top-[6px] bannerimgmain">
            {/* <!-- Vector Image --> */}
            <img
              class="imgdegree"
              src="/Scholarcap scroll.png"
              width="170"
              height="100"
              alt="Vector Image"
            />
            <img
              src="/5. College Student.png"
              height="140"
              alt="Vector Image"
              class="w-40 h-40 studentvector"
            />
            <img
              class="imgbag"
              src="/Backpack.png"
              width="140"
              height="140"
              alt="Vector Image"
            />
          </div>
        </div>
      </div>
      
    </>
  )
}

export default StBanner
