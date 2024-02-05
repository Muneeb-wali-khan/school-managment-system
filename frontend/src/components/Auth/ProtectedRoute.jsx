import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { clearErrorsAuth } from "../../store/features/regLogin";

// / Protected Route Component
const ProtectedRoute = ({ element: Element, requiredRole, ...rest }) => {
  const dispatch = useDispatch();
    const {userD } = useSelector(
        (state) => state?.user?.userAuth
      );
      
  
    if (userD === null) {
      // Redirect to login if user is not authenticated
      dispatch(clearErrorsAuth())
      return <Navigate to="/" />;
    }
  
    if (userD?.role === requiredRole) {
      // Render the component if the user has the required role
      return <Element {...rest} />;
    } else {
      // Redirect to unauthorized page if the user doesn't have the required role
      return <Navigate to="/unauthorized" />;
    }
  };

  export default ProtectedRoute;