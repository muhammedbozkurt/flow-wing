import { Divider, Input, Select } from 'antd';
import React, { useState } from 'react';
import './admin.css';
import { addUser, deleteUser } from '../../services/userService';

const Admin = () => {
  const [sicil, setSicil] = useState('');
  const [roleName, setRoleName] = useState('User');
  const [isApplicationUser, setIsApplicationUser] = useState('1');
  const [deletingSicil, setDeletingSicil] = useState('');

  const handleAddUser = () => {
    const values={
      sicil,roleName,isApplicationUser
    }
    addUser(values);
    console.log("admin sayfasındaki credentials: ",sicil,roleName,isApplicationUser)
  };

  const handleDeleteUser = () => {
    deleteUser(deletingSicil.toUpperCase());
  };

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
          onChange={(e) => setSicil(e.target.value)}
        />
        <label>Rol</label>
        <Select
        
          style={{ width: 120 }}
          onChange={(value) => setRoleName(value)}
          options={[
            { value: 'User', label: 'User' },
            { value: 'Admin', label: 'Admin' },
          ]}
        />
        <label>Application user mı</label>
        <Select
          
          style={{ width: 120 }}
          onChange={(value) => setIsApplicationUser(value)}
          options={[
            { value: 1, label: 'Evet' },
            { value: 0, label: 'Hayır' },
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
          onChange={(e) => setDeletingSicil(e.target.value)}
        />
        <button
          className="user-action-buttons delete-user-btn"
          onClick={handleDeleteUser}
        >
          Kullanıcı Sil
        </button>
      </div>
    </div>
  );
};

export default Admin;
