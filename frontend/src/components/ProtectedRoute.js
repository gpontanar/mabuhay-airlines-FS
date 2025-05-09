import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/login" />;
  }

  // Redirect admin users to the admin dashboard
  if (user?.isAdmin) {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default ProtectedRoute;