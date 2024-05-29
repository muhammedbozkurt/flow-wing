
import {  Navigate, Outlet, useNavigate} from "react-router-dom";

import { useSelector } from "react-redux";

const ProtectedRouteAdmin = (props) => {
  const user = useSelector((state) => state.user.user)
  const navigate = useNavigate();
  function presentPage() {
    navigate(-1);
  }

  if (!user) return <Navigate to="/" />;

 

  if (user.role === "admin") {
    return <Outlet {...props} />;
  }
 else if(user.role!=="admin"){
   presentPage()
  }
};

export default ProtectedRouteAdmin;
