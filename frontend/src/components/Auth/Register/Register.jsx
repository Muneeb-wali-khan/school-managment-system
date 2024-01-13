import React from 'react'
import NavHome from "../../Home/NavHome/NavHome"
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const logerNamed = sessionStorage.getItem("logerName")

  const handleSubmit = (e)=>{
    e.preventDefault()
    // console.log();
  }

  const handlePrev=()=>{
    navigate('/registers')
  }

  return (
    <>
    <NavHome/>
    <div>
        <button onClick={handlePrev} className='py-[7px] px-[15px] ml-[34px] mt-[20px] rounded-lg bg-green-700 text-white'>
          {/* <i  className='fa fa-arrow-left'></i> */}
          <i className="fa fa-arrow-left "> </i> Back 
        </button>
    </div>
        <div className="flex justify-center  h-full p-3 m-4">
        <form
        onSubmit={handleSubmit}
          action=""
          className=" sm:max-wi-[320px] shadow-2xl  border-gray-500  rounded-xl  border max-w-[100%] w-[800px] py-9 pb-12 px-9 gap-4 flex flex-col   bg-gradient-to-r text-gray-500"
        >
          <h3 className="font-bold text-2xl text-center m-0 p-0">
            Register {logerNamed && logerNamed ? logerNamed: 'Form'}
          </h3>
          <div className="w-[8.5rem] h-1 bg-white relative bottom-4 left-[70px] my-2"></div>
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-bold text-md">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="bg-gray-200 p-2 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-bold text-md">
              Firstname
            </label>
            <input
              type="text"
              name="firstname"
              className="bg-gray-200 p-2 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-bold text-md">
              Fullname
            </label>
            <input
              type="text"
              name="fullname"
              className="bg-gray-200 p-2 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-bold text-md">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="bg-gray-200 p-2 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-bold text-md">
              Role
            </label>
            <input
              type="text"
              disabled
              value={logerNamed && logerNamed ? logerNamed.toLocaleLowerCase() : 'no role provided'}
              name="role"
              className="bg-gray-200 p-2 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-bold text-md">
              Unique code for {logerNamed && logerNamed ? logerNamed.toLocaleLowerCase() : 'no role provided'}
            </label>
            <input
              type="text"
              name="uniqueCode"
              className="bg-gray-200 p-2 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-bold text-md">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="bg-gray-200 p-2 rounded-lg"
              />
            </div>

            <div className='flex items-center gap-8 registerAvatar'>
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="font-bold text-md">
                  Avatar
                </label>
                <input
                  type="file"
                  name="avatar"
                  className="bg-gray-200 p-2 rounded-lg"
                />
              </div>
                 <img src="/5. College Student.png" alt=""  width={50} height={50} className=' rounded-full'/>

          </div>

          <div>
            <button className="font-bold px-2 py-2 mt-3 rounded-lg w-full bg-gray-300 hover:bg-gray-400 hover:text-white transition-all text-gray-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register
