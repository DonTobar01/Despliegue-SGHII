import { useState } from 'react';
import './App.css';
import ToolList from './ToolList.jsx';
import ToolForm from './ToolForm.jsx';
import KitList from "./KitList.jsx";
import KitForm from './KitForm.jsx';
import UserList from './UserList.jsx';
import UserForm from './UserForm.jsx';
import OperationList from './OperationList.jsx';
import OperationForm from './OperationForm.jsx';
import ToolStatus from './ToolStatus.jsx';
import Login from './Login.jsx';
import Notification from './Notification.jsx';
//import Dashboard from './Dashboard.jsx';
//import CompanyLogo from './CompanyLogo';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tools, setTools] = useState([]);
  const [kits, setKits] = useState([]);
  const [users, setUsers] = useState([]);
  const [operations, setOperations] = useState([]);

  const [editingTool, setEditingTool] = useState(null);
  const [editingKit, setEditingKit] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editingOperation, setEditingOperation] = useState(null);

  // Estado de notificación
  const [notification, setNotification] = useState({ message: '', type: '', show: false });

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === '1234') {
      setIsAuthenticated(true);
    } else {
      showNotification('Credenciales incorrectas', 'error');
    }
  };

  // Función para mostrar la notificación
  const showNotification = (message, type) => {
    setNotification({ message, type, show: true });
    // Oculta la notificación después de 5 segundos
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, 5000);
  };

    
  // Manejo de herramientas
  const handleAddTool = (tool) => {
    setTools((prev) => [...prev, tool]);
    showNotification('Herramienta agregada exitosamente', 'success');
    setEditingTool(null);
  };

  const handleEditTool = (tool) => setEditingTool(tool);

  const handleSaveTool = (tool) => {
    setTools((prev) => prev.map((t) => (t.id === tool.id ? tool : t)));
    showNotification('Herramienta editada exitosamente', 'success');
    setEditingTool(null);
  };

  const handleDeleteTool = (id) => {
    setTools((prev) => prev.filter((t) => t.id !== id));
    showNotification('Herramienta eliminada exitosamente', 'success');
  };

  // Manejo de kits
  const handleAddKit = (Kit) => {
    setKits((prev) => [...prev, Kit]);
    showNotification('Kit agregado exitosamente', 'success');
    setEditingKit(null);
  };

  const handleEditKit = (kit) => setEditingKit(kit);

  const handleSaveKit = (kit) => {
    setKits((prev) => prev.map((k) => (k.id === kit.id ? kit : k)));
    showNotification('Kit editado exitosamente', 'success');
    setEditingKit(null);
  };

  const handleDeleteKit = (id) => {
    setKits((prev) => prev.filter((kit) => kit.id !== id));
    showNotification('Kit eliminado exitosamente', 'success');
  };

  // Manejo de usuarios
  const handleAddUser = (user) => {
    setUsers((prev) => [...prev, user]);
    showNotification('Usuario agregado exitosamente', 'success');
    setEditingUser(null);
  };

  const handleEditUser = (user) => setEditingUser(user);

  const handleSaveUser = (user) => {
    setUsers((prev) => prev.map((u) => (u.username === user.username ? user : u)));
    showNotification('Usuario editado exitosamente', 'success');
    setEditingUser(null);
  };

  const handleDeleteUser = (username) => {
    setUsers((prev) => prev.filter((u) => u.username !== username));
    showNotification('Usuario eliminado exitosamente', 'success');
  };

  // Manejo de operaciones
  const handleAddOperation = (operation) => {
    setOperations((prev) => [...prev, operation]);
    showNotification('Operación agregada exitosamente', 'success');
    setEditingOperation(null);
  };

  const handleEditOperation = (operation) => setEditingOperation(operation);

  const handleSaveOperation = (operation) => {
    setOperations((prev) =>
      prev.map((op) =>
        op.idHerramienta === operation.idHerramienta &&
        op.idKit === operation.idKit &&
        op.idOperario === operation.idOperario ? operation : op
      )
    );
    showNotification('Operación editada exitosamente', 'success');
    setEditingOperation(null);
  };

  const handleDeleteOperation = (idHerramienta, idKit, idOperario) => {
    setOperations((prev) =>
      prev.filter((op) =>
        !(op.idHerramienta === idHerramienta &&
          op.idKit === idKit &&
          op.idOperario === idOperario)
      )
    );
    showNotification('Operación eliminada exitosamente', 'success');
  };

  const handleCancelEdit = () => {
    setEditingTool(null);
    setEditingKit(null);
    setEditingUser(null);
    setEditingOperation(null);
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          <h1 className="text-center mt-4">Gestión de Herramientas</h1>
          <ToolForm
            toolToEdit={editingTool}
            onSave={editingTool ? handleSaveTool : handleAddTool}
            onCancel={handleCancelEdit}
          />
          <ToolList tools={tools} onEdit={handleEditTool} onDelete={handleDeleteTool} />

          <h1 className="text-center mt-4">Gestión de Kits</h1>
          <KitForm
            kitToEdit={editingKit}
            tools={tools}
            onSave={editingKit ? handleSaveKit : handleAddKit}
            onCancel={handleCancelEdit}
          />
          <KitList kits={kits} tools={tools} onEdit={handleEditKit} onDelete={handleDeleteKit} />

          <h1 className="text-center mt-4">Gestión de Usuarios</h1>
          <UserForm
            userToEdit={editingUser}
            onSave={editingUser ? handleSaveUser : handleAddUser}
            onCancel={handleCancelEdit}
          />
          <UserList users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />

          <h1 className="text-center mt-4">Gestión de Operaciones</h1>
          <OperationForm
            operationToEdit={editingOperation}
            tools={tools}
            kits={kits}
            users={users}
            onSave={editingOperation ? handleSaveOperation : handleAddOperation}
            onCancel={handleCancelEdit}
          />
          <OperationList
            operations={operations}
            tools={tools}
            kits={kits}
            users={users}
            onEdit={handleEditOperation}
            onDelete={handleDeleteOperation}
          />

          <h1 className="text-center mt-4">Consultar Estado de Herramienta</h1>
          <ToolStatus tools={tools} operations={operations} />

          {/* Componente de Notificación */}
          <Notification 
            message={notification.show ? notification.message : ''}
            type={notification.type}
            onClose={() => setNotification((prev) => ({ ...prev, show: false }))}
          />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;







       
