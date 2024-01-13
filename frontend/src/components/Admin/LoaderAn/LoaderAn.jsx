import React from 'react'
import "./loader.css"
import { useLocation } from 'react-router-dom'

const LoaderAn = () => {
  const location = useLocation()
  return (
    <div className={`flex items-center justify-center ${!location.pathname.endsWith("portal") ?  'w-[100%]' : 'w-[79%]'} h-[100vh] bg-slate-50`}>
           <div class="loader"></div>
    </div>
  )
}

export default LoaderAn
