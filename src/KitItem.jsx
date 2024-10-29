import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';

function KitItem({ kit, toolName, onEdit, onDelete }) {
  const confirmDelete = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este kit?")) {
      onDelete(id)
        .catch(err => alert("Error al eliminar el kit: " + err.message)); // Manejo de errores
    }
  };

  return (
    <tr className="hover-row">
      <td>{kit.idHerramienta}</td>
      <td>{toolName}</td>
      <td>{kit.cantidad}</td>
      <td>{kit.rol}</td>
      <td>
        <button
          className="btn btn-warning btn-sm me-2"
          onClick={() => onEdit(kit)}
          aria-label={`Editar kit con ID ${kit.idHerramienta}`}
        >
          <FaEdit className="me-1" /> Editar
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => confirmDelete(kit.idHerramienta)}
          aria-label={`Eliminar kit con ID ${kit.idHerramienta}`}
        >
          <FaTrashAlt className="me-1" /> Eliminar
        </button>
      </td>
    </tr>
  );
}

// Definición de PropTypes
KitItem.propTypes = {
  kit: PropTypes.shape({
    idHerramienta: PropTypes.string.isRequired,
    cantidad: PropTypes.number.isRequired,
    rol: PropTypes.string.isRequired,
  }).isRequired,
  toolName: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default KitItem;
