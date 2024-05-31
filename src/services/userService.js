import apiAxios from "../lib/apiAxios"

const getUsers = () => {
  return apiAxios.get("Users")
}


const addUser=(credentials)=>{
  return apiAxios.post("Users",credentials,
  {
    headers: {
      "Content-Type": "application/json"
    }
  })
}
const deleteUser = (sicil) => {
  return apiAxios.delete(`Users?sicil=${sicil}`);
}




export { getUsers ,addUser,deleteUser};

