import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import PropTypes from 'prop-types';

function OperationItem({ operation, toolName, kitName, userName, onEdit, onDelete }) {
  return (
    <tr>
      <td className="text-center">{operation.idHerramienta}</td>
      <td className="text-center">{operation.idKit}</td>
      <td className="text-center">{operation.idOperario}</td>
      <td className="text-center">{toolName}</td>
      <td className="text-center">{kitName}</td>
      <td className="text-center">{userName}</td>
      <td className="text-center">{operation.tipo}</td>
      <td className="text-center">{operation.cantidad}</td>
      <td className="text-center">
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`edit-tooltip`}>Editar operación</Tooltip>}
        >
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => onEdit(operation)}
            aria-label="Editar operación"
          >
            Editar
          </button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`delete-tooltip`}>Eliminar operación</Tooltip>}
        >
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(operation.idHerramienta, operation.idKit, operation.idOperario)}
            aria-label="Eliminar operación"
          >
            Eliminar
          </button>
        </OverlayTrigger>
      </td>
    </tr>
  );
}

// Definición de PropTypes
OperationItem.propTypes = {
  operation: PropTypes.shape({
    idHerramienta: PropTypes.string.isRequired,
    idKit: PropTypes.string.isRequired,
    idOperario: PropTypes.string.isRequired,
    tipo: PropTypes.string.isRequired,
    cantidad: PropTypes.number.isRequired,
  }).isRequired,
  toolName: PropTypes.string.isRequired,
  kitName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default OperationItem;
