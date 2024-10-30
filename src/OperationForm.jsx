import React, { useState, useEffect } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import PropTypes from 'prop-types';

function OperationForm({ operationToEdit, tools, kits, users, onSave, onCancel }) {
  const [idHerramienta, setIdHerramienta] = useState('');
  const [idKit, setIdKit] = useState('');
  const [idOperario, setIdOperario] = useState('');
  const [tipo, setTipo] = useState('');
  const [cantidad, setCantidad] = useState('');

  useEffect(() => {
    if (operationToEdit) {
      setIdHerramienta(operationToEdit.idHerramienta);
      setIdKit(operationToEdit.idKit);
      setIdOperario(operationToEdit.idOperario);
      setTipo(operationToEdit.tipo);
      setCantidad(operationToEdit.cantidad);
    }
  }, [operationToEdit]);
 

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ idHerramienta, idKit, idOperario, tipo, cantidad });
  };

  return (
    <div className="container mt-4">
      <h2>{operationToEdit ? 'Editar Operación' : 'Agregar Operación'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">ID Herramienta</label>
          <select
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
          <label className="form-label">ID Kit</label>
          <select
            className="form-select"
            value={idKit}
            onChange={(e) => setIdKit(e.target.value)}
            required
          >
            <option value="" disabled>Selecciona un kit</option>
            {kits.map(kit => (
              <option key={kit.id} value={kit.id}>{kit.nombre}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">ID Operario</label>
          <select
            className="form-select"
            value={idOperario}
            onChange={(e) => setIdOperario(e.target.value)}
            required
          >
            <option value="" disabled>Selecciona un operario</option>
            {users.map(user => (
              <option key={user.username} value={user.username}>{user.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Tipo</label>
          <input
            type="text"
            className="form-control"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Cantidad</label>
          <input
            type="number"
            className="form-control"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
          />
        </div>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`save-tooltip`}>{operationToEdit ? 'Guardar Cambios' : 'Agregar Operación'}</Tooltip>}
        >
          <button type="submit" className="btn btn-primary me-2">{operationToEdit ? 'Guardar Cambios' : 'Agregar Operación'}</button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`cancel-tooltip`}>Cancelar</Tooltip>}
        >
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        </OverlayTrigger>
      </form>
    </div>
  );
}

// Definición de PropTypes
OperationForm.propTypes = {
  operationToEdit: PropTypes.shape({
    idHerramienta: PropTypes.string,
    idKit: PropTypes.string,
    idOperario: PropTypes.string,
    tipo: PropTypes.string,
    cantidad: PropTypes.number,
  }),
  tools: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      nombre: PropTypes.string.isRequired,
    })
  ).isRequired,
  kits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      nombre: PropTypes.string.isRequired,
    })
  ).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default OperationForm;




