import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de que Bootstrap esté instalado
import './App.css'; // Tu archivo de estilos globales

function UserForm({ userToEdit, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    userType: '',
  });
  const [isDirty, setIsDirty] = useState(false); // Para saber si hay cambios

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        username: userToEdit.username,
        name: userToEdit.name,
        email: userToEdit.email,
        phone: userToEdit.phone,
        userType: userToEdit.userType,
      });
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setIsDirty(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const validateForm = () => {
    const { email, phone } = formData;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/; // Asumiendo un formato de teléfono simple
    if (!emailPattern.test(email)) {
      alert('Por favor, ingresa un email válido.');
      return false;
    }
    if (!phonePattern.test(phone)) {
      alert('Por favor, ingresa un teléfono válido (10 dígitos).');
      return false;
    }
    return true;
  };

  const handleCancel = () => {
    if (isDirty && !window.confirm("¿Estás seguro de que quieres cancelar los cambios?")) {
      return;
    }
    onCancel();
  };

  return (
    <div className="container mt-4">
      <h2>{userToEdit ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre de Usuario</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={!!userToEdit}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tipo de Usuario</label>
          <select
            className="form-select"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Selecciona un tipo</option>
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">{userToEdit ? 'Guardar Cambios' : 'Agregar Usuario'}</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>Cancelar</button>
      </form>
    </div>
  );
}

// Definición de PropTypes
UserForm.propTypes = {
  userToEdit: PropTypes.shape({
    username: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    userType: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default UserForm;
