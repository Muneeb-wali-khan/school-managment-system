import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css"
import Login from "./components/Auth/Login/Login"
import Register from "./components/Auth/Register/Register"
import Home from "./components/Home/Home"
import Student from "./components/StudentPortal/Student";
import Teacher from "./components/TeacherPortal/Teacher"
import NotFound from "./components/Not-Found/NotFound"
import ChoicesLogin from "./components/Home/ChoicesLogin/ChoicesLogin"
import ChoicesRegister from "./components/Home/ChoicesRegister/ChoicesRegister"

function App() {


  return (
    <div>
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
