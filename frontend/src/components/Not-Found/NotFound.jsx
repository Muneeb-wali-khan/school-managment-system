import React from 'react'
import { useLocation } from 'react-router-dom'

const NotFound = () => {
  const location = useLocation()

  return (
    <div className={`flex justify-center gap-5 ${!location.pathname.endsWith("portal") ?  'w-[100%]' : 'w-[79%]'}  notfound flex-col items-center h-[100vh] font-bold text-red-500`}>
      <div>
        <i className='fa fa-ban text-5xl'></i>
      </div>
      <h1 className='text-3xl'>Page Not Found !</h1>
    </div>
  )
}

export default NotFound
