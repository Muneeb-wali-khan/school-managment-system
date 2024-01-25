import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// / Protected Route Component
const ProtectedRoute = ({ element: Element, requiredRole, ...rest }) => {
    const {userD } = useSelector(
        (state) => state?.user?.userAuth
      );
  
    if (!userD) {
      // Redirect to login if user is not authenticated
      return <Navigate to="/login" />;
    }
  
    if (userD === requiredRole) {
      // Render the component if the user has the required role
      return <Element {...rest} />;
    } else {
      // Redirect to unauthorized page if the user doesn't have the required role
      return <Navigate to="/unauthorized" />;
    }
  };

  export default ProtectedRoute;