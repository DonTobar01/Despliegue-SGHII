import React, { useState } from 'react';
import CompanyLogo from './CompanyLogo';
import './login.css'; // Asegúrate de tener un archivo CSS para estilizar el formulario


const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Reiniciar el error al enviar

        // Simular la validación del usuario
        const validUsername = "admin"; // Cambia esto por tu lógica de autenticación real
        const validPassword = "1234"; // Cambia esto por tu lógica de autenticación real

        // Verificar el nombre de usuario
        if (username !== validUsername) {
            setError('Usuario incorrecto');
            return;
        }
        
        // Verificar la contraseña
        if (password !== validPassword) {
            setError('Contraseña incorrecta');
            return;
        }

        // Si las credenciales son válidas, llama a la función onLogin
        onLogin(username, password);
    };

    return (
        <div className="login-container">
            <CompanyLogo /> {/* Aquí se muestra el logo */}
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} className="login-form">
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label htmlFor="username">Usuario:</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <button type="submit" id="login-button" className="submit-button">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;

