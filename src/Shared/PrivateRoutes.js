import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    let data = JSON.parse(localStorage.getItem("token-info")) ? JSON.parse(localStorage.getItem("token-info")).stsTokenManager.accessToken : false ;
    let auth = {'token': data}
    return ( auth.token ? <Outlet/> : <Navigate to='/login'/> );
}
 
export default PrivateRoutes;