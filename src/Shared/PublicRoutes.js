import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  let data = JSON.parse(localStorage.getItem("token-info"))
    ? JSON.parse(localStorage.getItem("token-info")).stsTokenManager.accessToken
    : false;
  let auth = { token: data };
  return auth.token ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoutes;
