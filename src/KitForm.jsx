//import React, { useState } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css'

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function KitForm({ kitToEdit, tools, onSave, onCancel }) {
  const [idHerramienta, setIdHerramienta] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [rol, setRol] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (kitToEdit) {
      setIdHerramienta(kitToEdit.idHerramienta);
      setCantidad(kitToEdit.cantidad);
      setRol(kitToEdit.rol);
    }
  }, [kitToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cantidad <= 0) {
      setError('La cantidad debe ser un número positivo.');
      return;
    }
    setError('');
    onSave({ idHerramienta, cantidad, rol });
    // Limpiar los campos después de guardar
    setIdHerramienta('');
    setCantidad('');
    setRol('');
  };

  return (
    <div className="container mt-4">
      <h2>{kitToEdit ? 'Editar Kit' : 'Agregar Kit'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="idHerramienta">ID Herramienta</label>
          <select
            id="idHerramienta"
            className="form-select"
            value={idHerramienta}
            onChange={(e) => setIdHerramienta(e.target.value)}
            required
          >
            <option value="" disabled>Selecciona una herramienta</option>
            {tools.map(tool => (
              <option key={tool.id} value={tool.id}>{tool.nombre}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            className="form-control"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="rol">Rol</label>
          <input
            id="rol"
            type="text"
            className="form-control"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">{kitToEdit ? 'Guardar Cambios' : 'Agregar Kit'}</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>Cancelar</button>
      </form>
    </div>
  );
}

export default KitForm;

