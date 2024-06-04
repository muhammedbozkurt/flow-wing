import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
const APIURL = import.meta.env.VITE_API_URL;

//Login
export const loginUser = createAsyncThunk("user/login", async (registrationNumber) => {
 // console.log("Auth Slice'ın login fonk")
  //console.log(registrationNumber)
  const request = await axios.post(
    `http://localhost:5232/FlowWingAPI/api/Auth/login/${registrationNumber}`
    
  ) 
  //console.log("istek atıldı")
  const response = await request.data 
  console.log(response)
  localStorage.setItem("user", JSON.stringify(response))
  return response; // action.payload contains whatever we returned here

})
// Register
export const registerUser = createAsyncThunk(
  "user/register",
  async (registrationNumber) => {
    const request = await axios.post(
      "http://localhost:5232/FlowWingAPI/api/Auth/signup?sicil="+
      registrationNumber
    )
    const response = await request.data
    // You may handle the registration success or store data accordingly
    return response
  }
)

// Logout
export const logoutUser = createAsyncThunk("user/logout", async () => {
  // kullanıcı bilgilerini localStorage'dan temizliyoruz.
  localStorage.removeItem("user")
  localStorage.clear()
  return null // Çıkış işlemi başarılı olduğunda null döndürebilirsiniz.
})

const authSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  loading: false,
  error: null
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
        state.user = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message // action.error.message
        state.user = null
        console.log(action.error.message)
      })
      // Register reducers
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
        state.user = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.user = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message // action.error.message
        state.user = null
        console.log(action.error.message)
        // Handle the error message according to your needs
      })
      // Logout reducer

      .addCase(logoutUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false
        state.error = null
        state.user = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message // action.error.message
        console.log(action.error.message)
      })
  }
})

export default authSlice.reducer
