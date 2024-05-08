import apiAxios from "../lib/apiAxios"

const getUsers = () => {
  return apiAxios.get("Users")
}
const login=(sicil )=>{
  return apiAxios.post("Auth/login/"+sicil )
}

export { getUsers ,login}
