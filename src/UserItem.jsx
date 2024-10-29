import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de que Bootstrap esté instalado
import { Tooltip, OverlayTrigger } from 'react-bootstrap'; // Asegúrate de que react-bootstrap esté instalado

function UserItem({ user, onEdit, onDelete }) {
  const handleDelete = () => {
    const confirmationMessage = `¿Estás seguro de que deseas eliminar a ${user.username}?`;
    if (window.confirm(confirmationMessage)) {
      onDelete(user.username);
    }
  };

  return (
    <tr>
      <td>{user.username}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>{user.userType}</td>
      <td>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`edit-tooltip`}>Editar</Tooltip>}
        >
          <button 
            className="btn btn-warning btn-sm me-2" 
            onClick={() => onEdit(user)}
            aria-label={`Editar usuario ${user.username}`}
          >
            Editar
          </button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`delete-tooltip`}>Eliminar</Tooltip>}
        >
          <button 
            className="btn btn-danger btn-sm" 
            onClick={handleDelete}
            aria-label={`Eliminar usuario ${user.username}`}
          >
            Eliminar
          </button>
        </OverlayTrigger>
      </td>
    </tr>
  );
}

// Definición de PropTypes
UserItem.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    userType: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserItem;

