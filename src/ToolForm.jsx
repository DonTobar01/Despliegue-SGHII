import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

function ToolForm({ toolToEdit, onSave, onCancel }) {
  const [tool, setTool] = useState({
    id: '',
    nombre: '',
    marca: '',
    modelo: '',
    cantidad: '',
    precio: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (toolToEdit) {
      setTool({
        id: toolToEdit.id,
        nombre: toolToEdit.nombre,
        marca: toolToEdit.marca,
        modelo: toolToEdit.modelo,
        cantidad: toolToEdit.cantidad,
        precio: toolToEdit.precio
      });
    }
  }, [toolToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTool((prevTool) => ({
      ...prevTool,
      [name]: value
    }));
  };

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({ ...tool, precio: parseFloat(tool.precio) });
      setError(''); // Reset error
    }
  }, [tool, onSave]);

  const validateForm = () => {
    if (tool.cantidad <= 0 || tool.precio <= 0) {
      setError('La cantidad y el precio deben ser mayores que cero.');
      return false;
    }
    return true;
  };

  return (
    <div className="container mt-4">
      <h2>{toolToEdit ? 'Editar Herramienta' : 'Agregar Herramienta'}</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label className="form-label">ID</label>
          <input
            type="text"
            className="form-control"
            name="id"
            value={tool.id}
            onChange={handleChange}
            disabled={!!toolToEdit}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={tool.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Marca</label>
          <input
            type="text"
            className="form-control"
            name="marca"
            value={tool.marca}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Modelo</label>
          <input
            type="text"
            className="form-control"
            name="modelo"
            value={tool.modelo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Cantidad</label>
          <input
            type="number"
            className="form-control"
            name="cantidad"
            value={tool.cantidad}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            name="precio"
            value={tool.precio}
            onChange={handleChange}
            required
          />
        </div>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="save-tooltip">Guardar herramienta</Tooltip>}
        >
          <button type="submit" className="btn btn-primary">
            {toolToEdit ? 'Guardar Cambios' : 'Agregar Herramienta'}
          </button>
        </OverlayTrigger>
        <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>Cancelar</button>
      </form>
    </div>
  );
}

// Definición de PropTypes
ToolForm.propTypes = {
  toolToEdit: PropTypes.shape({
    id: PropTypes.string,
    nombre: PropTypes.string,
    marca: PropTypes.string,
    modelo: PropTypes.string,
    cantidad: PropTypes.number,
    precio: PropTypes.number,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ToolForm;
