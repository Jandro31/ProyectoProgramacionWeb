/**
 * @file PanelAdminPage.jsx
 * @description RUTA PRIVADA — Panel Administrativo de ChocoArtisan.
 * Accesible únicamente tras iniciar sesión en el Modal de Login (Ej: Admin | 1234).
 * Muestra las órdenes procesadas, el inventario de productos y los clientes registrados.
 */

import React from 'react';
import { Container, Row, Col, Table, Badge } from 'react-bootstrap';
import { PRODUCTOS_CATALOGO } from '../data/chocoData';

function PanelAdminPage({ currentUser, orders = [], registeredUsers = [] }) {
  return (
    <Container className="py-4">
      <div className="text-center mb-4">
        <Badge bg="success" className="mb-2 px-3 py-2">
          🔓 RUTA PRIVADA PROTEGIDA • PANEL ADMINISTRATIVO
        </Badge>
        <h1 className="section-heading">
          Panel de Gestión de Órdenes e Inventario ChocoArtisan
        </h1>
        <div className="gold-divider" />
        <p className="text-muted">
          Sesión autenticada como: <strong>{currentUser?.username}</strong> (
          {currentUser?.role}) • Hora de ingreso: {currentUser?.loginTime}
        </p>
      </div>

      <Row className="g-4 mb-4">
        <Col md={4}>
          <div className="choco-card p-3 text-center">
            <span className="text-muted small d-block">
              Productos en Catálogo
            </span>
            <span className="display-6 fw-bold" style={{ color: '#3E2723' }}>
              {PRODUCTOS_CATALOGO.length}
            </span>
          </div>
        </Col>
        <Col md={4}>
          <div className="choco-card p-3 text-center">
            <span className="text-muted small d-block">
              Órdenes Registradas en Sesión
            </span>
            <span className="display-6 fw-bold text-success">
              {orders.length}
            </span>
          </div>
        </Col>
        <Col md={4}>
          <div className="choco-card p-3 text-center">
            <span className="text-muted small d-block">
              Usuarios Verificados con Captcha
            </span>
            <span className="display-6 fw-bold text-warning">
              {registeredUsers.length + 1}
            </span>
          </div>
        </Col>
      </Row>

      {/* Tabla de Órdenes Procesadas */}
      <div className="choco-card p-4 mb-4">
        <h4 className="serif-title mb-3">📋 Registro de Órdenes de Compra</h4>
        <Table responsive striped bordered hover size="sm">
          <thead style={{ backgroundColor: '#3E2723', color: '#FFF8E1' }}>
            <tr>
              <th>ID Orden</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Destino</th>
              <th>IVA (19%)</th>
              <th>Total Pagado</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((ord) => (
              <tr key={ord.idOrden}>
                <td className="fw-bold">{ord.idOrden}</td>
                <td>{ord.fecha}</td>
                <td>{ord.cliente}</td>
                <td>{ord.direccion}</td>
                <td>${ord.iva.toFixed(2)}</td>
                <td className="fw-bold">${ord.total.toFixed(2)} USD</td>
                <td>
                  <Badge bg="success">{ord.estado}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Tabla de Inventario de Productos */}
      <div className="choco-card p-4">
        <h4 className="serif-title mb-3">
          🍫 Control de Inventario (Entidad Productos)
        </h4>
        <Table responsive hover size="sm" className="align-middle">
          <thead style={{ backgroundColor: '#3E2723', color: '#FFF8E1' }}>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>% Cacao</th>
              <th>Precio Unitario</th>
              <th>Stock Disponible</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTOS_CATALOGO.map((prod) => (
              <tr key={prod.id}>
                <td>#{prod.id}</td>
                <td className="fw-semibold">{prod.nombre}</td>
                <td>{prod.categoria}</td>
                <td>
                  <Badge bg="dark" className="text-warning">
                    {prod.cacao}%
                  </Badge>
                </td>
                <td>${prod.precio.toFixed(2)} USD</td>
                <td>{prod.stock} unidades</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default PanelAdminPage;
