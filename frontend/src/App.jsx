import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy,Suspense } from "react";
import "./index.css"
import Loader from "./components/loader/Loader"
const Login =  lazy(()=> import("./components/Auth/Login/Login") ) 
const Register =  lazy(()=> import( "./components/Auth/Register/Register") )
const Home =  lazy(()=> import("./components/Home/Home") ) 
const Student =  lazy(()=> import("./components/StudentPortal/Student")) 
const Teacher =  lazy(()=> import("./components/TeacherPortal/Teacher") ) 
const NotFound =  lazy(()=> import("./components/Not-Found/NotFound") ) 
const ChoicesLogin =  lazy(()=> import("./components/Home/ChoicesLogin/ChoicesLogin") ) 
const ChoicesRegister =  lazy(()=> import("./components/Home/ChoicesRegister/ChoicesRegister") ) 

function App() {


  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<Loader/>}>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/student-portal/*" element={<Student/>} />
              <Route path="/teacher-portal/*" element={<Teacher/>} />
              <Route path="*" element={<NotFound/>} />
              
              <Route path="/Login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/logins" element={<ChoicesLogin/>} />
              <Route path="/registers" element={<ChoicesRegister/>} />
            </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
