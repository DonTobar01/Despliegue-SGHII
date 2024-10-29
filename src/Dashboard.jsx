import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ isAuthenticated }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login'); // Redirige al login si no está autenticado
        }
    }, [isAuthenticated, navigate]);

    return (
        <div>
            <h1>Bienvenido al Dashboard</h1>
            <p>Contenido protegido para usuarios autenticados.</p>
        </div>
    );
};

export default Dashboard;
