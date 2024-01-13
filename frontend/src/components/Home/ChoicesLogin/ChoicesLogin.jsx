import React from 'react'
import NavHome from "../NavHome/NavHome"
import { Link } from 'react-router-dom'

const ChoicesLogin = () => {

  const addClickName = (e)=>{
    const logerName = e.currentTarget?.firstChild?.lastChild?.textContent
    sessionStorage.setItem(`logerName`, logerName)
  }

  return (
    <div>
      <NavHome/>
      <div className="flex items-center justify-center gap-12 flex-wrap m-5 p-5 mt-20">
        <Link to='/login'>
          <div onClick={addClickName} className=" hover:bg-[darkgreen] hover:text-white hover:border-white cursor-pointer transition-all gap-5 flex-col shadow-2xl w-[230px] h-[230px] rounded-full flex items-center justify-center  border-[1px] border-[darkgreen]">
          <div className='flex items-center flex-col justify-center gap-5'>
              <i className="fa fa-graduation-cap text-5xl"></i>
              <h5 title='Student' className=" text-xl font-medium">Student</h5>
            </div>
          </div>
        </Link>

        <Link to='/login'>
          <div onClick={addClickName} className=" hover:bg-[darkgreen] hover:text-white hover:border-white cursor-pointer transition-all gap-5 flex-col shadow-2xl w-[230px] h-[230px] rounded-full flex items-center justify-center  border-[1px] border-[darkgreen]">
            <div className='flex items-center flex-col justify-center gap-5'>
              <i className="fa fa-person-chalkboard text-5xl"></i>
              <h5 title='Student' className=" text-xl font-medium">Teacher</h5>
            </div>
          </div>
        </Link>

        <Link to='/login'>
          <div onClick={addClickName} className=" hover:bg-[darkgreen] hover:text-white hover:border-white cursor-pointer transition-all gap-5 flex-col shadow-2xl w-[230px] h-[230px] rounded-full flex items-center justify-center  border-[1px] border-[darkgreen]">
          <div className='flex items-center flex-col justify-center gap-5'>
              <i className="fa fa-user-tie text-5xl"></i>
              <h5 title='Student' className=" text-xl font-medium">Admin</h5>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ChoicesLogin
