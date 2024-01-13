import React from 'react'

const AnNav = () => {
  return (
    <>
         {/* <!-- Navbar --> */}
         <div class="flex justify-between items-center mb-4 pr-2">
        <div class="flex items-center">
          {/* <!-- Search Element --> */}
          <form action="">
            <input
              type="text"
              class="border px-8 pr-20 outline-none py-2 rounded-full shadow-lg searchbox"
              placeholder="Search"
            />
          </form>
        </div>

        {/* <!-- Profile Section --> */}
        <div class="flex items-center gap-2">
          {/* <!-- Profile Pic --> */}
          <div class="flex items-center">
            <div
              class="rounded-full border-2 border-[darkmagenta] overflow-hidden mr-3 shadow-2xl"
            >
              <img
                src="/5. College Student.png"
                alt="Profile"
                class="w-10 h-10 cursor-pointer"
              />
            </div>

            {/* <!-- Profile Info --> */}
            <div>
              <p class="text-sm font-bold">Muneeb shah</p>
              <p class="text-xs text-gray-600">Administrator</p>
            </div>
          </div>

          {/* <!-- Bell Icon with Notification Dot --> */}
          <div class="relative ml-4">
            <div class="w-6 h-6 cursor-pointer">
              <span class="fa fa-bell"></span>
            </div>
            {/* <!-- Notification Dot --> */}
            <div
              class="absolute top-0 right-2 h-2 w-2 bg-red-500 rounded-full"
            ></div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default AnNav
