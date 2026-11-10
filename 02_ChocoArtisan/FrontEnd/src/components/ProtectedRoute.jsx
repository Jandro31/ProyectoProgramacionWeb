/**
 * @file ProtectedRoute.jsx
 * @description Guardia de Rutas Privadas. Verifica (1) que exista sesión y
 * (2) opcionalmente que el rol del usuario esté en `allowedRoles`.
 * Sin sesión -> portada + Modal de Login. Con sesión pero sin permiso -> portada + aviso.
 */

import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({
  isAuthenticated,
  currentUser,
  allowedRoles,
  onRequireLogin,
  onAccessDenied,
  children
}) {
  const location = useLocation();
  const hasRole = !allowedRoles || allowedRoles.includes(currentUser?.tipo);

  useEffect(() => {
    if (!isAuthenticated && onRequireLogin) {
      onRequireLogin(
        `Acceso restringido a la ruta privada "${location.pathname}". Se ha bloqueado el ingreso directo (puerta trasera). Por favor inicie sesión.`
      );
    } else if (isAuthenticated && !hasRole && onAccessDenied) {
      onAccessDenied(
        `⛔ Acceso denegado a "${location.pathname}": requiere rol de Administrador.`
      );
    }
  }, [isAuthenticated, hasRole, location.pathname, onRequireLogin, onAccessDenied]);

  if (!isAuthenticated || !hasRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;