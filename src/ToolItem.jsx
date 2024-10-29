import React from 'react';
import PropTypes from 'prop-types';
import './ToolItem.css'; // Importa un archivo de estilos específico para ToolItem
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

function ToolItem({ tool, onEdit, onDelete }) {
  return (
    <tr className="tool-item">
      <td className="text-center">{tool.id}</td>
      <td className="text-center">{tool.nombre || 'Sin nombre'}</td>
      <td className="text-center">{tool.marca || 'Sin marca'}</td>
      <td className="text-center">{tool.modelo || 'Sin modelo'}</td>
      <td className="text-center">{tool.cantidad || 0}</td>
      <td className="text-center">${tool.precio ? tool.precio.toFixed(2) : '0.00'}</td>
      <td className="text-center">
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`edit-tooltip`}>Editar herramienta</Tooltip>}
        >
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => onEdit(tool)}
            aria-label={`Editar herramienta ${tool.nombre}`}
          >
            Editar
          </button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`delete-tooltip`}>Eliminar herramienta</Tooltip>}
        >
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(tool.id)}
            aria-label={`Eliminar herramienta ${tool.nombre}`}
          >
            Eliminar
          </button>
        </OverlayTrigger>
      </td>
    </tr>
  );
}

// Definición de PropTypes
ToolItem.propTypes = {
  tool: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nombre: PropTypes.string,
    marca: PropTypes.string,
    modelo: PropTypes.string,
    cantidad: PropTypes.number,
    precio: PropTypes.number,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ToolItem;
