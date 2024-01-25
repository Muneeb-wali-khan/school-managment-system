import React from 'react'

const UnAuthorized = () => {
  return (
    <div className='text-center text-2xl flex items-center flex-col gap-6 justify-center h-[70vh] font-bold text-red-500'>
        <i className='fa fa-triangle-exclamation'></i>
        UnAuthorized Access Denied !
    </div>
  )
}

export default UnAuthorized
