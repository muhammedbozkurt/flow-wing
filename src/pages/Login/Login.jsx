import React, { useState } from "react"
import "./login.css"
import { useNavigate } from "react-router"
import { Divider } from "antd"
import { Link } from "react-router-dom"
import { TextField } from "@mui/material"
import { Formik } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../Redux/authSlice"
import { login } from "../../services/userService"

const Login = () => {
  const [registrationNumber,setRgeistrationNumber]= useState("")
  let navigate = useNavigate()
  const dispatch = useDispatch()
  // redux state
  const { loading, error } = useSelector((state) => state.user)
  // login handler function
  const handleLogin = () => {
    login(registrationNumber).then((result) => {
    //  console.log(registrationNumber)
      if (result.status===200) {
        navigate("/home")
      }
    })
  }
  
  
  return (
    <div className="login-page-content">
      <div className="login-page-form">
        <p>Hoş Geldiniz</p>
        <Divider />
        
            <form>
              <div className="input-areas">
                <TextField
                  id="standard-basic"
                  name="registrationNumber"
                  label="Sicil Numarası "
                  variant="standard"
                  onChange={(e)=>setRgeistrationNumber(e.target.value)}
                  value={registrationNumber}
                />
              </div>

              {/* LINK TO REGISTER PAGE IF USER DOESN'T HAVE AN ACCOUNT */}
              <div className="register-link">
                Hesabınız yok mu? <Link to="/register">Kayıt Ol</Link>
              </div>

              {/* SUBMIT BUTTON */}

              <button className="sign-in-btn" onClick={() => handleLogin()}>

                {loading ? (
                  <span className="loading loading-dots loading-lg"></span>
                ) : (
                  "Giriş Yap"
                )}
              </button>
            </form>
       
      </div>
    </div>
  )
}

export default Login
