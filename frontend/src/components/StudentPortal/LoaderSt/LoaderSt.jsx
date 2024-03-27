import React from 'react'
import "./loader.css"
import { useLocation } from 'react-router-dom'

const LoaderSt = () => {
  const location = useLocation()
  return (
    <div className={`flex items-center justify-center ${!location.pathname.endsWith("portal") ?  'w-[100%]' : 'w-[79%]'} h-[100vh] bg-slate-50`}>
           <div className="loader"></div>
    </div>
  )
}

export default LoaderSt
