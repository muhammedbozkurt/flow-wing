import apiAxios from "../lib/apiAxios"

const getUsers = () => {
  return apiAxios.get("Users")
}

 const addUser = (values) => {
  const  {
    sicil,
    roleName,
    isApplicationUser
  }=values 

  const credentials = {
    sicil: String(sicil),
    roleName: String(roleName),
    isApplicationUser: parseInt(isApplicationUser, 10),  // Ensure it is an integer
  };
console.log("gönderilen json: " , credentials)
  return apiAxios.post("addUser", credentials, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'  // Add Content-Type header
    }
  });
};
const deleteUser = (sicil) => {
  return apiAxios.delete(`Users?sicil=${sicil}`)
}

export { getUsers, addUser, deleteUser }
