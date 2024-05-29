import { Divider } from "antd"
import React, { useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import "./register.css"
import { TextField } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import alertify from "alertifyjs"
import { registerUser } from "../../Redux/authSlice"

const Register = () => {
  const [registrationNumber, setRgeistrationNumber] = useState("")
  let navigate = useNavigate()
  const dispatch = useDispatch()

  // redux state
  const { loading, error } = useSelector((state) => state.user)

  // REGISTER FUNCTION
  const handleRegister = (registrationNumber) => {
    dispatch(registerUser(registrationNumber)).then((result) => {
      console.log(registrationNumber)
      if (result.payload) {
        alertify.success("Kayıt oluşturuldu")
        navigate("/login")
      }
    })
  }

  return (
    <div className="register-page-content">
      <div className="register-page-form">
        <p>Hoş Geldiniz</p>
        <Divider />

        <form>
          <div className="input-areas">
            <TextField
              name="registrationNumber"
              id="standard-basic"
              label="Sicil Numarası "
              variant="standard"
              onChange={(e) => setRgeistrationNumber(e.target.value)}
              value={registrationNumber}
            />
          </div>

          <div className="register-link">
            Hesabınız var mı? <Link to="/login">Giriş Yap</Link>
          </div>

          <button
            className="register-btn"
            type="submit"
            onClick={() => handleRegister(registrationNumber)}
          >
            Hesap Oluştur
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
