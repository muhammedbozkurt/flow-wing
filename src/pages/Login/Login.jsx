import React, { useState } from "react"
import "./login.css"
import { useNavigate } from "react-router"
import { Divider } from "antd"
import { Link } from "react-router-dom"
import { TextField } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../Redux/authSlice"
import alertify from "alertifyjs"

const Login = () => {
  const [registrationNumber, setRgeistrationNumber] = useState("")
  let navigate = useNavigate()
  const dispatch = useDispatch()
  // redux state
  const { loading, error } = useSelector((state) => state.user)
  // login handler function
  const handleLogin = () => {
    dispatch(loginUser(registrationNumber)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate("/home");
      } else if (result.meta.requestStatus === 'rejected' && result.error.message.includes('404')) {
    alertify.error("Kullanıcı bulunamadı")
      } else {
      
        console.error(result.error.message);
      }
    });
  };
  


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
              onChange={(e) => setRgeistrationNumber(e.target.value)}
              value={registrationNumber}
            />
          </div>

          {/* LINK TO REGISTER PAGE IF USER DOESN'T HAVE AN ACCOUNT */}
          {/* <div className="register-link">
            Hesabınız yok mu? <Link to="/register">Kayıt Ol</Link>
          </div> */}

          {/* SUBMIT BUTTON */}

          <button type="button" className="sign-in-btn" onClick={() => handleLogin()}>
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
