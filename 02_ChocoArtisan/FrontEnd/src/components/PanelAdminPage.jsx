/**
 * @file PanelAdminPage.jsx
 * @description RUTA PRIVADA — Panel Administrativo de ChocoArtisan.
 * Accesible únicamente tras iniciar sesión en el Modal de Login (Ej: admin | admin123).
 * Muestra las órdenes procesadas desde la Base de Datos MySQL, el inventario y los clientes.
 */

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Badge, Button, Alert } from 'react-bootstrap';
import { PRODUCTOS_CATALOGO } from '../data/chocoData';

function PanelAdminPage({ currentUser, registeredUsers = [] }) {
  const [orders, setOrders] = useState([]);
  const [msg, setMsg] = useState({ type: '', text: '' });

  // Función para obtener las órdenes desde la Base de Datos MySQL
  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/ordenes');
      const data = await res.json();
      if (data.success) {
        setOrders(data.ordenes);
      }
    } catch (err) {
      console.error('Error al cargar órdenes de la BD:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Función para eliminar una orden de la Base de Datos
  const handleDeleteOrder = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta orden de compra de la base de datos?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/auth/ordenes/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setMsg({ type: 'success', text: 'Orden eliminada exitosamente de la base de datos.' });
        fetchOrders(); // Recargar la tabla
      } else {
        setMsg({ type: 'danger', text: 'No se pudo eliminar la orden.' });
      }
    } catch (err) {
      setMsg({ type: 'danger', text: 'Error de conexión con el servidor al eliminar.' });
    }
  };

  return (
    <Container className="py-4">
      <div className="text-center mb-4">
        <Badge bg="success" className="mb-2 px-3 py-2">
          🔓 RUTA PRIVADA PROTEGIDA • PANEL ADMINISTRATIVO (MYSQL)
        </Badge>
        <h1 className="section-heading">
          Panel de Gestión de Órdenes e Inventario ChocoArtisan
        </h1>
        <div className="gold-divider" />
        <p className="text-muted">
          Sesión autenticada como: <strong>{currentUser?.username}</strong> ({currentUser?.role || currentUser?.rol}) • Sede: Bucaramanga
        </p>
      </div>

      {msg.text && (
        <Alert variant={msg.type} onClose={() => setMsg({ type: '', text: '' })} dismissible>
          {msg.text}
        </Alert>
      )}

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
              Órdenes Registradas en BD
            </span>
            <span className="display-6 fw-bold text-success">
              {orders.length}
            </span>
          </div>
        </Col>
        <Col md={4}>
          <div className="choco-card p-3 text-center">
            <span className="text-muted small d-block">
              Usuarios Verificados
            </span>
            <span className="display-6 fw-bold text-warning">
              {registeredUsers.length + 1}
            </span>
          </div>
        </Col>
      </Row>

      {/* Tabla de Órdenes Procesadas desde MySQL */}
      <div className="choco-card p-4 mb-4">
        <h4 className="serif-title mb-3">📋 Registro de Órdenes de Compra (MySQL)</h4>
        <Table responsive striped bordered hover size="sm" className="align-middle">
          <thead style={{ backgroundColor: '#3E2723', color: '#FFF8E1' }}>
            <tr>
              <th>ID Orden</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Destino</th>
              <th>IVA (19%)</th>
              <th>Total Pagado</th>
              <th>Estado</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((ord) => (
                <tr key={ord.id}>
                  <td className="fw-bold">{ord.idOrden}</td>
                  <td>{ord.fecha}</td>
                  <td>{ord.cliente}</td>
                  <td>{ord.direccion}</td>
                  <td>${Number(ord.iva).toFixed(2)}</td>
                  <td className="fw-bold">${Number(ord.total).toFixed(2)} USD</td>
                  <td>
                    <Badge bg="success">{ord.estado}</Badge>
                  </td>
                  <td className="text-center">
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleDeleteOrder(ord.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-muted">
                  No hay órdenes de compra registradas en la base de datos. Realiza una compra en el carrito para verla aquí.
                </td>
              </tr>
            )}
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