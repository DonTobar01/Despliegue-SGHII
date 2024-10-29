import React, { useState } from 'react';
import KitItem from './KitItem'; // Asegúrate de que la ruta sea correcta
import PropTypes from 'prop-types';

function KitList({ kits, tools, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredKits = kits.filter(kit => {
    const tool = tools.find(t => t.id === kit.idHerramienta);
    return tool && tool.nombre.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Lista de Kits</h2>
      <div className="mb-3">
        <label htmlFor="searchInput" className="form-label">Buscar herramienta:</label>
        <input
          id="searchInput"
          type="text"
          placeholder="Buscar herramienta..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
        />
      </div>
      {filteredKits.length === 0 ? (
        <p>No se encontraron kits que coincidan con la búsqueda.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID Herramienta</th>
              <th>Nombre Herramienta</th>
              <th>Cantidad</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredKits.map((kit) => {
              const tool = tools.find(t => t.id === kit.idHerramienta);
              return (
                <KitItem
                  key={kit.idHerramienta}
                  kit={kit}
                  toolName={tool ? tool.nombre : 'Desconocida'}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Definición de PropTypes
KitList.propTypes = {
  kits: PropTypes.arrayOf(
    PropTypes.shape({
      idHerramienta: PropTypes.string.isRequired,
      cantidad: PropTypes.number.isRequired,
      rol: PropTypes.string.isRequired,
    })
  ).isRequired,
  tools: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      nombre: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default KitList;