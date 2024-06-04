
import {  Navigate, Outlet, useNavigate} from "react-router-dom";

import { useSelector } from "react-redux";
import { LOGIN_ROUTE } from "../routes";

const ProtectedRouteAdmin = (props) => {
  const user = useSelector((state) => state.user.user)

 

  if (!user) return <Navigate to={LOGIN_ROUTE} />;

 

  if (user.role === "admin") {
    return <Outlet {...props} />;
  }
 else if(user.role!=="admin"){
  return <Navigate to={LOGIN_ROUTE} />;
  }
};

export default ProtectedRouteAdmin;
