import apiAxios from "../lib/apiAxios"

const getUsers = () => {
  return apiAxios.get("Users")
}


const login = async () => {
  try {
    // Post isteği yap
    const response = await apiAxios.post(`Auth/login/C9023642`);
    
    // Yanıtı kontrol et
    if (response.status === 200) {
      // Başarılı ise kullanıcı verilerini sakla ve yanıtı döndür
      const { token, message, email, username } = response.data;
      localStorage.setItem("userToken", token);
      return { token, message, email, username };
    } else {
      // Başarısız ise hata fırlat
      throw new Error("Giriş başarısız.");
    }
  } catch (error) {
    // Hata durumunda hata mesajını konsola yazdır ve yeniden fırlat
    console.error("Login error:", error);
    throw error;
  }
};

const addUser=(credentials)=>{
  return apiAxios.post("Users",credentials)
}
const deleteUser = (sicil) => {
  return apiAxios.delete(`Users?sicil=${sicil}`);
}

export default login;


export { getUsers, login ,addUser,deleteUser};

