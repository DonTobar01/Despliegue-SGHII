import React, { useEffect } from 'react';

function Notification({ message, type, onClose, duration = 5000 }) {
  if (!message) return null;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div 
      className={`alert alert-${type} alert-dismissible fade show`} 
      role="alert" 
      aria-live="assertive" 
      aria-atomic="true"
    >
      <strong>{type.charAt(0).toUpperCase() + type.slice(1)}:</strong> {message}
      <button 
        type="button" 
        className="btn-close" 
        aria-label="Cerrar" 
        onClick={onClose}
      ></button>
    </div>
  );
}

export default Notification;
