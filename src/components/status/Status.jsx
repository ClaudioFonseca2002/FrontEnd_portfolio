// Componente que muestra el estado de autenticación
import React from 'react';
import { useAuth } from '../../utils/AuthContext.jsx';

function Status() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {isAuthenticated ? 'Estás autenticado' : 'No estás autenticado'}
    </div>
  );
}

export default Status;