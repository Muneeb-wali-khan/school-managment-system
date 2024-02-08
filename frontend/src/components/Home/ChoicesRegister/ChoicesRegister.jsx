import React, { useEffect } from 'react'
import NavHome from "../NavHome/NavHome"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearErrorsAuth } from '../../../store/features/regLogin'

const ChoicesRegister = () => {
  const dispatch = useDispatch()

  const addClickName = (e)=>{
    const logerName = e.currentTarget?.firstChild?.lastChild?.textContent
    sessionStorage.setItem(`logerName`, logerName)
  }

  useEffect(()=>{
    dispatch(clearErrorsAuth())
  },[dispatch])


  return (
    <div>
      <NavHome/>
      <div className="flex items-center justify-center gap-12 flex-wrap m-5 p-5 mt-20">
        <Link to='/register'>
          <div onClick={addClickName} className=" hover:bg-green-600 hover:text-white hover:border-white cursor-pointer transition-all gap-5 flex-col shadow-2xl w-[230px] h-[230px] rounded-full flex items-center justify-center  border-[1px] border-green-600">
          <div className='flex items-center flex-col justify-center gap-5'>
              <i className="fa fa-graduation-cap text-5xl"></i>
              <h5 title='Student' className=" text-xl font-medium">Student</h5>
            </div>
          </div>
        </Link>

        <Link to='/register'>
          <div onClick={addClickName} className=" hover:bg-green-600 hover:text-white hover:border-white cursor-pointer transition-all gap-5 flex-col shadow-2xl w-[230px] h-[230px] rounded-full flex items-center justify-center  border-[1px] border-green-600">
            <div className='flex items-center flex-col justify-center gap-5'>
              <i className="fa fa-person-chalkboard text-5xl"></i>
              <h5 title='Student' className=" text-xl font-medium">Teacher</h5>
            </div>
          </div>
        </Link>

        <Link to='/register'>
          <div onClick={addClickName} className=" hover:bg-green-600 hover:text-white hover:border-white cursor-pointer transition-all gap-5 flex-col shadow-2xl w-[230px] h-[230px] rounded-full flex items-center justify-center  border-[1px] border-green-600">
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

export default ChoicesRegister
