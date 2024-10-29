import React, { useState } from 'react';
import KitItem from './KitItem'; // Asegúrate de que la ruta sea correcta
import PropTypes from 'prop-types';

function KitTable({ kits, tools, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredKits = kits.filter(kit => {
    const tool = tools.find(t => t.id === kit.idHerramienta);
    return (
      (tool && tool.nombre.toLowerCase().includes(searchTerm.toLowerCase())) || 
      kit.rol.toLowerCase().includes(searchTerm.toLowerCase()) // Puedes agregar más campos aquí
    );
  });

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Lista de Kits</h2>
      <input
        type="text"
        placeholder="Buscar herramienta..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-3"
        aria-label="Buscar herramienta"
      />
      <table className="table" role="table">
        <thead>
          <tr role="row">
            <th role="columnheader">ID Herramienta</th>
            <th role="columnheader">Nombre Herramienta</th>
            <th role="columnheader">Cantidad</th>
            <th role="columnheader">Rol</th>
            <th role="columnheader">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredKits.length > 0 ? (
            filteredKits.map(kit => {
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
            })
          ) : (
            <tr role="row">
              <td colSpan="5" className="text-center">No se encontraron kits que coincidan con la búsqueda.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// Definición de PropTypes
KitTable.propTypes = {
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

export default KitTable;