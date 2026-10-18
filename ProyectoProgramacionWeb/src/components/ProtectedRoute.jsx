/**
 * @file ProtectedRoute.jsx
 * @description Componente de protección de Rutas Privadas en React Router.
 * Cumple el requisito estricto: "El sitio no debe permitir entradas por puertas traseras,
 * este objetivo se logra implementando rutas".
 * Si un usuario no autenticado intenta ingresar escribiendo la URL privada directamente,
 * es redirigido de inmediato a la portada ("/") y se despliega el Modal de Login.
 */

import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated, onRequireLogin, children }) {
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && onRequireLogin) {
      onRequireLogin(
        `Acceso restringido a la ruta privada "${location.pathname}". Se ha bloqueado el ingreso directo (puerta trasera). Por favor inicie sesión con Admin | 1234.`
      );
    }
  }, [isAuthenticated, location.pathname, onRequireLogin]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
