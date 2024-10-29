import React from 'react';
import logo from './assets/logo.png'; // Ajusta la ruta según la ubicación de tu imagen

const CompanyLogo = () => {
    return (
        <div className="logo-container">
            <img src={logo} alt="Company Logo" className="company-logo" />
        </div>
    );
};

export default CompanyLogo;
