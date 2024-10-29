import React from 'react';
import PropTypes from 'prop-types';
import UserItem from './UserItem';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de que Bootstrap esté instalado

function UserList({ users, onEdit, onDelete }) {
  return (
    <div className="container mt-4">
      <h2>Lista de Usuarios</h2>
      {users.length === 0 ? (
        <div className="alert alert-info" role="alert" aria-live="polite">
          No hay usuarios para mostrar. Puedes agregar uno nuevo.
        </div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre de Usuario</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Tipo de Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserItem key={user.username} user={user} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Definición de PropTypes
UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      userType: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserList;
