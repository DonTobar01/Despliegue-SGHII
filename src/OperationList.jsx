// OperationList.jsx

import React from 'react';
import PropTypes from 'prop-types';
import OperationItem from './OperationItem';

function OperationList({ operations, tools, kits, users, onEdit, onDelete }) {
  return (
    <div className="container mt-4">
      <h2>Lista de Operaciones</h2>
      {operations.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID Herramienta</th>
              <th>ID Kit</th>
              <th>ID Operario</th>
              <th>Nombre Herramienta</th>
              <th>Nombre Kit</th>
              <th>Nombre Operario</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {operations.map((operation) => {
              const tool = tools.find(t => t.id === operation.idHerramienta);
              const kit = kits.find(k => k.id === operation.idKit);
              const user = users.find(u => u.username === operation.idOperario);

              return (
                <OperationItem
                  key={`${operation.idHerramienta}-${operation.idKit}-${operation.idOperario}`}
                  operation={operation}
                  toolName={tool ? tool.nombre : 'Desconocida'}
                  kitName={kit ? kit.nombre : 'Desconocido'}
                  userName={user ? user.name : 'Desconocido'}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-warning" role="alert">
          No hay operaciones registradas.
        </div>
      )}
    </div>
  );
}

// Definición de PropTypes
OperationList.propTypes = {
  operations: PropTypes.arrayOf(
    PropTypes.shape({
      idHerramienta: PropTypes.string.isRequired,
      idKit: PropTypes.string.isRequired,
      idOperario: PropTypes.string.isRequired,
      tipo: PropTypes.string.isRequired,
      cantidad: PropTypes.number.isRequired,
    })
  ).isRequired,
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
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default OperationList;
