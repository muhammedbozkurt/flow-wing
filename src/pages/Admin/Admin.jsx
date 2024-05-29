import { Divider, Input, Select } from "antd"
import React, { useState } from "react"
import "./admin.css"
import { addUser, deleteUser } from "../../services/userService"

const Admin = () => {
  const [sicil, setSicil] = useState("")
  const [roleName, setRoleName] = useState("user")
  const [isApplicationUser, setIsApplicationUser] = useState(true)
  const [deletingSicil, setDeletingSicil] = useState("")

  const credentials = { sicil: sicil.toUpperCase(), roleName, isApplicationUser }

  const handleAddUser = () => {
    addUser(credentials)
  }

  const handleDeleteUser = () => {
    deleteUser(deletingSicil.toUpperCase())
  }

  return (
    <div className="admin-page-content">
      <h3>Kullanıcı İşlemleri</h3>
      <div className="add-user-section">
        <Divider orientation="left" plain>
          Kullanıcı Ekle
        </Divider>
        <Input
          placeholder="Sicil"
          value={sicil}
          onChange={(e) => {
            setSicil(e.target.value)
          }}
        />
        <label>Rol</label>
        <Select
          defaultValue="user"
          style={{ width: 120 }}
          onChange={(value) => {
            setRoleName(value)
          }}
          options={[
            { value: "user", label: "User" },
            { value: "admin", label: "Admin" }
          ]}
        />
        <label>Application user mı</label>
        <Select
          defaultValue="true"
          style={{ width: 120 }}
          onChange={(value) => {
            setIsApplicationUser(value === "true")
          }}
          options={[
            { value: "true", label: "Evet" },
            { value: "false", label: "Hayır" }
          ]}
        />
        <button
          className="user-action-buttons add-btn"
          onClick={handleAddUser}
        >
          Kullanıcı Ekle
        </button>
      </div>

      <div className="delete-user-section">
        <Divider orientation="left" plain>
          Kullanıcı Sil
        </Divider>
        <Input
          placeholder="Sicil"
          onChange={(e) => {
            setDeletingSicil(e.target.value)
          }}
        />
        <button
          className="user-action-buttons delete-user-btn"
          onClick={handleDeleteUser}
        >
          Kullanıcı Sil
        </button>
      </div>
    </div>
  )
}

export default Admin
