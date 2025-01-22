import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store/store";

export const PublicRoute = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  return token ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;
