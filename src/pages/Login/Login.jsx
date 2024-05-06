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

const Login = () => {
  const [registrationNumber,setRgeistrationNumber]= useState("")
  let navigate = useNavigate()
  const dispatch = useDispatch()
  // redux state
  const { loading, error } = useSelector((state) => state.user)
  // login handler function
  const handleLogin = () => {
    dispatch(loginUser(registrationNumber)).then((result) => {
    //  console.log(registrationNumber)
      if (result.payload) {
        navigate("/home")
      }
    })
  }
  // //validations

  // const validationSchema = Yup.object({
  //   registrationNumber: Yup.string()
  //    // .matches(/^\d{4}$/, "Geçersiz sicil numarası") // 4 basamaklı sayı olmalı
  //     .required("Zorunlu alan")
  // });
  
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

   {/*            {errors.registrationNumber && (
                <div className="error-message">{errors.registrationNumber}</div>
              )}

              <div className="input-areas">
                {" "}
                <TextField
                  id="standard-basic"
                  name="password"
                  label="Şifre"
                  variant="standard"
                  type="password"
                  onChange={handleChange}
                  value={values.password}
                />
              </div>
              {errors.password && (
                <div className="error-message">{errors.password}</div>
              )} */}

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
