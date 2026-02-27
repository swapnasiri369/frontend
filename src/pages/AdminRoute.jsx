import { Navigate } from "react-router-dom";

const AdminRoute = ({ isLoggedIn, user, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default AdminRoute;