import React from "react";
import NavHome from "../../Home/NavHome/NavHome";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const logerNamed = sessionStorage.getItem("logerName")
  const navigate = useNavigate()

  const handlePrev=()=>{
    navigate('/logins')
  }

  const handleSubmitLogin = (e)=>{
    e.preventDefault()
    const email = "st@gmail.com"
    const username = "student09"
    const password = "1122"

    const email2 = "tr@gmail.com"
    const username2 = "teacher09"
    const password2 = "1122"

    const userlogedIn = {
      username: e.target?.username.value,
      email: e.target?.email.value,
      password: e.target?.password.value,
    }

    if(userlogedIn.email === email && userlogedIn.username === username && userlogedIn.password === password){
       alert(`Welcome ${userlogedIn.username} email: ${userlogedIn.email}`)
       navigate('/student-portal/student-dash')
    }
    else if(userlogedIn.email === email2 && userlogedIn.username === username2 && userlogedIn.password === password2){
      alert(`Welcome ${userlogedIn.username} email: ${userlogedIn.email}`)
      navigate('/teacher-portal/teacher-dash')
   }
    else{
      return alert("wrong email/password or username")
    }

    console.log(userlogedIn);
  }



  return (
    <>
      <NavHome />
    <div>
        <button onClick={handlePrev} className='py-[7px] px-[15px] ml-[34px] mt-[20px] rounded-lg bg-green-700 text-white'>
          {/* <i  className='fa fa-arrow-left'></i> */}
        ◀  Back 
        </button>
    </div>
      <div className="flex justify-center  h-full p-3 m-4">
        <form
        onSubmit={handleSubmitLogin}
          action=""
          className=" sm:max-wi-[320px] shadow-2xl  border-gray-500  rounded-xl  border max-w-[380px] w-[800px] py-9 pb-12 px-9 gap-4 flex flex-col   bg-gradient-to-r text-gray-500"
        >
          <h3 className="font-bold text-2xl text-center m-0 p-0">
            Login {logerNamed && logerNamed ? logerNamed: 'Form'}
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
            <label htmlFor="password" className="font-bold text-md">
              Password
            </label>
            <input
             autoComplete="true"
              type="password"
              name="password"
              className="bg-gray-200 p-2 rounded-lg"
            />
          </div>
          <div>
            <button className="font-bold px-2 py-2 mt-3 rounded-lg w-full bg-gray-300 hover:bg-gray-400 hover:text-white transition-all text-gray-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
