import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./index.css";
import Loader from "./components/loader/Loader";
import UnAuthorized from "./components/unAuthorized/UnAuthorized";

const Login = lazy(() => import("./components/Auth/Login/Login"));
const RequireAuth = lazy(() => import("./components/Auth/requireAuth"));
const Register = lazy(() => import("./components/Auth/Register/Register"));
const Home = lazy(() => import("./components/Home/Home"));
const Student = lazy(() => import("./components/StudentPortal/Student"));
const Teacher = lazy(() => import("./components/TeacherPortal/Teacher"));
const NotFound = lazy(() => import("./components/Not-Found/NotFound"));
const ChoicesLogin = lazy(() =>
  import("./components/Home/ChoicesLogin/ChoicesLogin")
);
const ChoicesRegister = lazy(() =>
  import("./components/Home/ChoicesRegister/ChoicesRegister")
);
const Admin = lazy(() => import("./components/Admin/Admin"));



function App() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logins" element={<ChoicesLogin />} />
            <Route path="/registers" element={<ChoicesRegister />} />
            <Route path="/unauthorized" element={<UnAuthorized />} />

            <Route element={<RequireAuth allowedRoles={["student"]} />}>
              <Route path="/student-portal/*" element={<Student />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={["teacher"]} />}>
              <Route path="/teacher-portal/*" element={<Teacher />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={["admin"]} />}>
              <Route path="/admin-portal/*" element={<Admin />} />
            </Route>

            
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
