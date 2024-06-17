import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router"
import { LOGIN_ROUTE } from "../routes"

const RequireAuth = ({ children }) => {
  // Use the useSelector hook to get the user from  Redux store
  const user = useSelector((state) => state.user.user)
 // console.log("user in require auth component", user)
  // If user is not logged in navigate to the login page
  if (!user) {
    return <Navigate to={LOGIN_ROUTE} />;
  }

  return <div>{children}</div>
}

export default RequireAuth
