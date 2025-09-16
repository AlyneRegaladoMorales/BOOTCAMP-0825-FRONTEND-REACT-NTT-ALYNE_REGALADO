import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { AppPaths } from "../utils/AppPaths";

const ProtectedRoute = () => {
  const auth = useAuth();
  return auth.isAuthenticated ? <Outlet /> : <Navigate to={AppPaths.ROOT} />;
};

export default ProtectedRoute;