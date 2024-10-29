import React from 'react';
import PropTypes from 'prop-types';
import ToolItem from './ToolItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

function ToolList({ tools, onEdit, onDelete }) {
  return (
    <div className="container mt-4">
      <h2>Lista de Herramientas</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            {[
              { id: 'id', label: 'ID', tooltip: 'Identificador único de la herramienta' },
              { id: 'nombre', label: 'Nombre', tooltip: 'Nombre de la herramienta' },
              { id: 'marca', label: 'Marca', tooltip: 'Marca de la herramienta' },
              { id: 'modelo', label: 'Modelo', tooltip: 'Modelo de la herramienta' },
              { id: 'cantidad', label: 'Cantidad', tooltip: 'Cantidad disponible' },
              { id: 'precio', label: 'Precio', tooltip: 'Precio de la herramienta' },
            ].map(({ id, label, tooltip }) => (
              <th key={id}>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id={`${id}-tooltip`}>{tooltip}</Tooltip>}
                >
                  <span>{label}</span>
                </OverlayTrigger>
              </th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(tools) && tools.length > 0 ? (
            tools.map((tool) => (
              <ToolItem key={tool.id} tool={tool} onEdit={onEdit} onDelete={onDelete} />
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No hay herramientas disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// Definición de PropTypes
ToolList.propTypes = {
  tools: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      nombre: PropTypes.string,
      marca: PropTypes.string,
      modelo: PropTypes.string,
      cantidad: PropTypes.number,
      precio: PropTypes.number,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ToolList;
