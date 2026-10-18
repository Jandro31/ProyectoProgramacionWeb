/**
 * @file LoginModal.jsx
 * @description Modal de Bootstrap para la autenticación de usuarios en Fase I.
 * Implementa el patrón requerido "usuario: xxxxxx; passwd: xxxxxxx" utilizando
 * explícitamente `import Form from 'react-bootstrap/Form';`.
 * Valida las credenciales de prueba (Admin | 1234) o usuarios registrados en sesión
 * para desplegar el Menú de Rutas Privadas en la barra de navegación fija.
 */

import React, { useState } from 'react';
import { Modal, Button, Alert, Badge } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function LoginModal({
  show,
  onHide,
  onLoginSuccess,
  authNotice,
  registeredUsers = []
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Función que procesa el envío del formulario de Login
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanUser = username.trim();
    const cleanPass = password.trim();

    // Verificación con usuario de prueba por defecto exigido en Fase I: Admin | 1234
    if (
      (cleanUser.toLowerCase() === 'admin' && cleanPass === '1234') ||
      registeredUsers.some(
        (u) =>
          (u.username.toLowerCase() === cleanUser.toLowerCase() ||
            u.email.toLowerCase() === cleanUser.toLowerCase()) &&
          u.password === cleanPass
      )
    ) {
      onLoginSuccess({
        username: cleanUser === 'admin' ? 'Admin' : cleanUser,
        role: cleanUser.toLowerCase() === 'admin' ? 'Administrador General' : 'Cliente VIP ChocoArtisan',
        loginTime: new Date().toLocaleTimeString()
      });
      setUsername('');
      setPassword('');
    } else {
      setErrorMsg(
        'Credenciales inválidas. Por favor utilice el usuario de prueba "Admin" y passwd "1234", o regístrese previamente.'
      );
    }
  };

  // Permite rellenar rápidamente las credenciales de prueba Admin | 1234
  const fillDemoCredentials = () => {
    setUsername('Admin');
    setPassword('1234');
    setErrorMsg('');
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
          🔐 Autenticación — Acceso a Rutas Privadas
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ backgroundColor: '#FFF8E1' }}>
        {/* Mensaje informativo cuando se bloquea un intento de entrada por puerta trasera */}
        {authNotice && (
          <Alert variant="warning" className="border-warning small">
            <strong>🛡️ Control de Seguridad de Rutas:</strong> {authNotice}
          </Alert>
        )}

        <div className="p-3 mb-3 rounded border" style={{ backgroundColor: '#FFFFFF', borderColor: '#D4AF37' }}>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div>
              <span className="fw-bold d-block text-dark small">
                Patrón de Prueba Fase I (Despliega Menú Privado):
              </span>
              <Badge bg="dark" className="me-2">
                login: Admin
              </Badge>
              <Badge bg="secondary">passwd: 1234</Badge>
            </div>
            <Button
              variant="outline-dark"
              size="sm"
              type="button"
              onClick={fillDemoCredentials}
            >
              ⚡ Autocompletar Admin | 1234
            </Button>
          </div>
        </div>

        {errorMsg && (
          <Alert variant="danger" className="py-2 small">
            {errorMsg}
          </Alert>
        )}

        {/* Formulario implementado con import Form from 'react-bootstrap/Form' */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="loginUsernameInput">
            <Form.Label className="fw-bold">
              Login (Usuario o Correo): <span className="text-muted">xxxxxx</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="loginPasswordInput">
            <Form.Label className="fw-bold">
              Passwd (Contraseña): <span className="text-muted">xxxxxxx</span>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Ej: 1234"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Form.Text className="text-muted">
              Al verificar las credenciales se habilitará el Menú de Rutas Privadas en la barra superior.
            </Form.Text>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button type="submit" className="btn-choco-gold">
              Verificar y Desplegar Rutas Privadas
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
