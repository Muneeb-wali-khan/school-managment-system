import React from 'react'
import "./loader.css"

const Loader = () => {
  return (
    <div className='flex items-center justify-center h-[100vh] bg-slate-50'>
        <div>
           <div className="loader"></div>
        </div>
    </div>
  )
}

export default Loader
