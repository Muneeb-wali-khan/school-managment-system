import React from 'react'
import AnNav from '../Navbar/AnNav'
import AnBanner from '../Banner/AnBanner'

const AnDash = () => {
  return (
    <>
        {/* <!-- Main Content --> */}
    <div class="w-4/5 p-5 maincontent">
      <AnNav/>
      {/* <!-- ====================================navbar ends ========================================================= --> */}

      <AnBanner/>

      {/* <!-- ====================================================banner ends ==================================== --> */}

      {/* <!-- Main Div --> */}
      <div class="mt-4 p-4 pl-0 pr-0">
        <div class="flex gap-8 maindiv">
          {/* <!-- Left Div --> */}
          <div class="w-2/3 flex flex-col gap-5 mb-0 leftdiv1">
            <div class="flex justify-between items-center px-2">
              <h3 class="text-lg font-bold">Finance</h3>
            </div>

            {/* <!-- Cards Section --> */}
            <div class="flex gap-4 cardsec1">
              {/* <!-- Card 1 --> */}
              <div
                class="w-64 flex bg-white flex-col items-center text-center rounded-2xl p-6 shadow-xl"
              >
                <img
                  class="mb-4"
                  src="/Frame 30.png"
                  height="40"
                  width="70"
                  alt=""
                />
                <h4 class="text-xl font-bold mb-2">$10,000</h4>
                <p>Total Payable</p>
              </div>

              {/* <!-- Card 2 --> */}
              <div
                class="w-64 bg-white flex border-2 border-[darkmagenta] flex-col items-center text-center rounded-2xl p-6 shadow-2xl"
              >
                <img
                  class="mb-4"
                  src="/Group 14.png"
                  height="40"
                  width="70"
                  alt=""
                />
                <h4 class="text-xl font-bold mb-2">$8,500</h4>
                <p>Total Paid</p>
              </div>

              {/* <!-- Card 3 --> */}
              <div
                class="w-64 bg-white flex flex-col items-center text-center rounded-2xl p-6 shadow-xl"
              >
                <img
                  class="mb-4"
                  src="/Group 15.png"
                  height="40"
                  width="70"
                  alt=""
                />
                <h4 class="text-xl font-bold mb-2">$1,500</h4>
                <p>Remaining Balance</p>
              </div>
            </div>

            {/* <!-- Cards Section 2 --> */}
            <div class="flex justify-between items-center px-2">
              <h3 class="text-lg font-bold mt-5">Enrolled Courses</h3>
              <h4 class="text-[darkmagenta] font-bold cursor-pointer">See all</h4>
            </div>

            <div class="flex gap-4 cardsec2">
              {/* <!-- Card 1 --> */}
              <div
                class="firstbottomdiv w-67 flex bg-[#915fe250] rounded-2xl p-4 pl-6 pr-6 shadow-xl border-2 border-[darkmagenta]"
              >
                {/* <!-- left div --> */}
                <div>
                  <h4 class="text-lg text-[darkmagenta] font-bold mb-5">
                    Python Programming
                  </h4>
                  <button
                    class="px-7 py-1 font-bold mb-2 bg-[darkmagenta] text-white rounded-full"
                  >
                    Veiw
                  </button>
                </div>

                {/* <!-- right div 1--> */}
                <div>
                  <img
                    src="/Icon Container.png"
                    width="120"
                    height="120"
                    alt="Computer"
                  />
                </div>
              </div>

              {/* <!-- Card 2 --> */}
              <div
                class="firstbottomdiv w-67 flex bg-[#915fe250] rounded-2xl p-4 pl-6 pr-6 shadow-xl"
              >
                {/* <!-- left div --> */}
                <div>
                  <h4 class="text-lg text-[darkmagenta] font-bold mb-5">
                    Javascript Programming
                  </h4>
                  <button
                    class="px-7 mb-2 py-1 font-bold bg-[darkmagenta] text-white rounded-full"
                  >
                    Veiw
                  </button>
                </div>

                {/* <!-- right div 2--> */}
                <div>
                  <img
                    src="/Group 16.png"
                    height="100"
                    width="100"
                    alt="Computer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Right Div --> */}
          <div class="w-1/3 rightdivP">
            {/* <!-- Top Div --> */}
            <div class="flex flex-col gap-5 px-2">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-bold mb-2">Course Instructors</h3>
              </div>

              <div class="flex items-center gap-4">
                {/* <!-- Avatar 1 --> */}
                <div
                  class="border-2 border-[darkmagenta] overflow-hidden rounded-full"
                >
                  <img
                    class="w-14 h-14"
                    src="/5. College Student.png"
                    alt=""
                  />
                </div>
                {/* <!-- Avatar 2 --> */}
                <div
                  class="border-2 border-[darkmagenta] overflow-hidden rounded-full"
                >
                  <img
                    class="w-14 h-14"
                    src="/5. College Student.png"
                    alt=""
                  />
                </div>
                {/* <!-- Avatar 3 --> */}
                <div
                  class="border-2 border-[darkmagenta] overflow-hidden rounded-full"
                >
                  <img
                    class="w-14 h-14"
                    src="/5. College Student.png"
                    alt=""
                  />
                </div>
              </div>
              <div class="flex items-center justify-between pr-2">
                <h3 class="text-lg font-bold">Daily Notice</h3>
                <h4 class="text-[darkmagenta] font-bold cursor-pointer">See all</h4>
              </div>
            </div>

            {/* <!-- Bottom Div --> */}
            <div
              class="p-8 flex flex-col gap-8 shadow-xl mt-5 rounded-xl bg-white"
            >
              {/* <!-- Top Div --> */}
              <div>
                <h4 class="text-md font-bold mb-2">Exam Schedule</h4>
                <p class="mb-3">
                  2 lines of Lorem Ipsum random text Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Sapiente, modi.
                </p>
                <h4 class="text-gray-500 cursor-pointer font-bold">See More</h4>
              </div>

              {/* <!-- Bottom Div --> */}
              <div>
                <h4 class="text-md font-bold mb-2">Exam Schedule</h4>
                <p class="mb-3">
                  2 lines of Lorem Ipsum random text. Lorem, ipsum dolor sit
                  amet consectetur adipisicing elit.
                </p>
                <h4 class="text-gray-500 cursor-pointer font-bold">See More</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
      
    </>
  )
}

export default AnDash
