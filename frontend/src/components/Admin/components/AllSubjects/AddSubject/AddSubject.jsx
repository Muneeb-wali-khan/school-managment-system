import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminAddSubject, adminFetchAllSubjects, clearErrorSubjects } from '../../../../../store/features/admin.reducers'
import toast from 'react-hot-toast'

const AddSubject = ({isOpenSubjectAdd,onCloseSubjectAdd}) => {
    const dispatch = useDispatch()
    const {loadingSb, msgSb, errSb}  = useSelector((state)=> state?.admin?.subjects)
    const [subject, SetAddSubject] = useState("")

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(adminAddSubject({ subjectName: subject }))
    }

    useEffect(()=>{
        if(msgSb){
            toast.success(msgSb)
            dispatch(adminFetchAllSubjects())
            onCloseSubjectAdd();
        }
        if(errSb){
            toast.error(errSb)
        }
        clearErrorSubjects()
    },[dispatch,msgSb, errSb])


  return (
    <>
      <div
        className={`fixed inset-0 z-50 ${isOpenSubjectAdd ? "" : "hidden"}`}
      >
        <div className="flex items-center justify-center h-screen">
          <div
            onClick={() => onCloseSubjectAdd()}
            className="fixed inset-0 bg-black opacity-50"
          ></div>
          <div
            className="
        custom-scrollbar
        bg-gradient-to-r from-[#8b008bef] to-[#861686] w-full  max-h-[70vh] sm:w-96 p-8 rounded-md shadow-md transform transition-transform duration-300 hover:scale-105 z-50 mx-4 sm:mx-auto"
          >
            <h2 className="text-2xl sm:text-2xl font-bold text-white mb-6 flex items-center justify-center gap-4">
              Add New Subject
              <i className="fa fa-plus"></i>
            </h2>

            <form onSubmit={handleSubmit}>

              <div className="mb-4 relative">
                <label
                  htmlFor="subjectName"
                  className="block text-white font-semibold mb-2"
                >
                  Subject Name:
                </label>
                <div className="flex items-center">
                  <input
                    disabled={loadingSb ? true : false}
                    name="subjectName"
                    type="text"
                    onChange={(e)=> SetAddSubject(e.target.value)}
                    className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-blue-500 text-white"
                  />
                </div>
              </div>

              <button
                disabled={loadingSb ? true : false}
                type="submit"
                className="bg-white hover:bg-gray-300 text-blue-500 py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-300 w-full"
              >
                {loadingSb ? "Submitting..." : "Add Subject"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddSubject
