/**
 * @file LoginModal.jsx
 * @description Modal de Bootstrap para la autenticación de usuarios conectada a la Base de Datos.
 * Implementa la validación mediante petición HTTP hacia el backend.
 */

import React, { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function LoginModal({
  show,
  onHide,
  onLoginSuccess,
  authNotice
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Función que procesa el envío del formulario consultando el Backend de forma directa
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const cleanUser = username.trim();
    const cleanPass = password.trim();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario: cleanUser, password: cleanPass })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        onLoginSuccess({
          username: data.user.usuario,
          tipo: data.user.rol === 'admin' ? 'admin' : 'cliente',
          role: data.user.rol,
          loginTime: new Date().toLocaleTimeString()
        });
        setUsername('');
        setPassword('');
      } else {
        setErrorMsg(data.message || 'Credenciales inválidas en la base de datos.');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setErrorMsg('No se pudo conectar con el servidor backend en el puerto 5000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header
        closeButton
        style={{
          backgroundColor: '#3E2723',
          color: '#FFF8E1',
          borderBottom: '2px solid #D4AF37'
        }}
      >
        <Modal.Title className="serif-title text-warning">
          🔐 Iniciar Sesión — ChocoArtisan
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ backgroundColor: '#FFF8E1' }}>
        {authNotice && (
          <Alert variant="warning" className="border-warning small mb-3">
            <strong>🛡️ Control de Acceso:</strong> {authNotice}
          </Alert>
        )}

        {errorMsg && (
          <Alert variant="danger" className="py-2 small mb-3">
            {errorMsg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="loginUsernameInput">
            <Form.Label className="fw-bold text-dark">
              Usuario:
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="loginPasswordInput">
            <Form.Label className="fw-bold text-dark">
              Contraseña:
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Form.Text className="text-muted">
              Ingresa tus credenciales registradas para acceder a tu cuenta.
            </Form.Text>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" className="btn-choco-gold" disabled={loading}>
              {loading ? 'Verificando...' : 'Iniciar Sesión'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;