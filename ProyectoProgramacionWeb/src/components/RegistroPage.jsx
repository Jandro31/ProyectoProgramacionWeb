/**
 * @file RegistroPage.jsx
 * @description Módulo de Registro de Clientes con Validación de Fortaleza de Contraseña
 * y Captcha Interactivo Anti-Bots (Funcionalidad Obligatoria del Proyecto).
 * Utiliza explícitamente `import Form from 'react-bootstrap/Form';`.
 * Valida en tiempo real:
 * 1. Mínimo 8 caracteres
 * 2. Al menos una letra mayúscula
 * 3. Al menos un número
 * 4. Al menos un carácter especial
 * 5. Verificación de código Captcha alfanumérico + reto visual
 */

import React, { useState } from 'react';
import { Container, Row, Col, Button, Alert, Badge, ProgressBar } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

// Generador de códigos Captcha aleatorios de 6 caracteres
function generateCaptchaCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 6; i += 1) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function RegistroPage({ onRegisterUser, onOpenLoginModal }) {
  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Estado del Captcha de seguridad
  const [captchaTarget, setCaptchaTarget] = useState(() => generateCaptchaCode());
  const [captchaInput, setCaptchaInput] = useState('');
  const [humanCheck, setHumanCheck] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Reglas de validación de fortaleza de contraseña en tiempo real
  const validations = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]]/.test(password),
    passwordsMatch: password.length > 0 && password === confirmPassword
  };

  const passedRulesCount = [
    validations.minLength,
    validations.hasUppercase,
    validations.hasNumber,
    validations.hasSpecial
  ].filter(Boolean).length;

  const strengthPercent = passedRulesCount * 25;

  const refreshCaptcha = () => {
    setCaptchaTarget(generateCaptchaCode());
    setCaptchaInput('');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    if (['admin', 'cliente'].includes(username.trim().toLowerCase())) {
      setErrorMsg('Ese nombre de usuario está reservado. Elija otro.');
      return;
    }

    if (passedRulesCount < 4) {
      setErrorMsg(
        'La contraseña no cumple todos los requisitos de seguridad (mínimo 8 caracteres, una mayúscula, un número y un carácter especial).'
      );
      return;
    }

    if (!validations.passwordsMatch) {
      setErrorMsg('Las contraseñas ingresadas no coinciden.');
      return;
    }

    if (captchaInput.trim().toUpperCase() !== captchaTarget || !humanCheck) {
      setErrorMsg(
        'Verificación Captcha incorrecta. Por favor escribe los caracteres exactos de la imagen de seguridad y marca la casilla anti-bots.'
      );
      refreshCaptcha();
      return;
    }

    // Registrar el usuario en el estado global de la aplicación
    onRegisterUser({
      nombre,
      username,
      email,
      password,
      fechaRegistro: new Date().toLocaleDateString()
    });

    setSuccessMsg(
      `¡Cuenta creada exitosamente para "${username}"! Ya puedes iniciar sesión en el Modal de Login para desplegar el Menú de Rutas Privadas.`
    );
    setNombre('');
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setCaptchaInput('');
    setHumanCheck(false);
    refreshCaptcha();
  };

  return (
    <Container className="py-4">
      <div className="text-center mb-4">
        <Badge bg="warning" text="dark" className="mb-2 px-3 py-2">
          SEGURIDAD Y AUTENTICACIÓN DE CLIENTES
        </Badge>
        <h1 className="section-heading">
          Registro de Clientes con Validación y Captcha
        </h1>
        <div className="gold-divider" />
        <p className="text-muted">
          Valida la fortaleza criptográfica de tu contraseña y completa el reto
          Captcha anti-bots
        </p>
      </div>

      <Row className="justify-content-center">
        <Col lg={8}>
          <div className="choco-card p-4">
            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
            {successMsg && (
              <Alert variant="success">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <span>{successMsg}</span>
                  <Button
                    size="sm"
                    className="btn-choco-gold"
                    onClick={() => onOpenLoginModal()}
                  >
                    🔐 Abrir Modal de Login Ahora
                  </Button>
                </div>
              </Alert>
            )}

            <Form onSubmit={handleRegisterSubmit}>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group controlId="regNombre">
                    <Form.Label className="fw-bold">Nombre Completo *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ej: Deissy Liliana Romero"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="regUsername">
                    <Form.Label className="fw-bold">
                      Usuario de Acceso (Login) *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ej: ClienteChoco"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group controlId="regEmail">
                    <Form.Label className="fw-bold">
                      Correo Electrónico *
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="correo@uis.edu.co"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="regPassword">
                    <Form.Label className="fw-bold">
                      Contraseña Segura *
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Mínimo 8 caracteres, Mayúscula, Número y Símbolo"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="regConfirmPassword">
                    <Form.Label className="fw-bold">
                      Confirmar Contraseña *
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Repite la contraseña"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>

                {/* Indicador interactivo de fortaleza de contraseña */}
                <Col xs={12}>
                  <div className="p-3 rounded border bg-light">
                    <div className="d-flex justify-content-between mb-1 small fw-bold">
                      <span>Nivel de Fortaleza de Contraseña:</span>
                      <span>{strengthPercent}% completado</span>
                    </div>
                    <ProgressBar
                      now={strengthPercent}
                      variant={
                        strengthPercent < 50
                          ? 'danger'
                          : strengthPercent < 100
                          ? 'warning'
                          : 'success'
                      }
                      className="mb-2"
                    />
                    <Row className="small g-2">
                      <Col sm={6}>
                        <span
                          className={
                            validations.minLength
                              ? 'text-success fw-bold'
                              : 'text-muted'
                          }
                        >
                          {validations.minLength ? '✅' : '⬜'} Mínimo 8
                          caracteres
                        </span>
                      </Col>
                      <Col sm={6}>
                        <span
                          className={
                            validations.hasUppercase
                              ? 'text-success fw-bold'
                              : 'text-muted'
                          }
                        >
                          {validations.hasUppercase ? '✅' : '⬜'} Al menos una
                          letra mayúscula (A-Z)
                        </span>
                      </Col>
                      <Col sm={6}>
                        <span
                          className={
                            validations.hasNumber
                              ? 'text-success fw-bold'
                              : 'text-muted'
                          }
                        >
                          {validations.hasNumber ? '✅' : '⬜'} Al menos un
                          número (0-9)
                        </span>
                      </Col>
                      <Col sm={6}>
                        <span
                          className={
                            validations.hasSpecial
                              ? 'text-success fw-bold'
                              : 'text-muted'
                          }
                        >
                          {validations.hasSpecial ? '✅' : '⬜'} Al menos un
                          carácter especial (!@#$%*)
                        </span>
                      </Col>
                    </Row>
                  </div>
                </Col>

                {/* Componente Captcha Interactivo Anti-Bots */}
                <Col xs={12}>
                  <div
                    className="p-3 rounded border"
                    style={{
                      backgroundColor: '#FFF8E1',
                      borderColor: '#D4AF37'
                    }}
                  >
                    <h6 className="fw-bold mb-2" style={{ color: '#3E2723' }}>
                      🛡️ Verificación de Seguridad Captcha Anti-Bots
                    </h6>
                    <Row className="align-items-center g-3">
                      <Col md={5}>
                        <div
                          className="p-3 rounded text-center user-select-none d-flex justify-content-between align-items-center"
                          style={{
                            background:
                              'repeating-linear-gradient(45deg, #3E2723, #3E2723 10px, #261512 10px, #261512 20px)',
                            color: '#D4AF37',
                            border: '2px solid #D4AF37',
                            letterSpacing: '8px',
                            fontFamily: 'monospace',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            textDecoration: 'line-through'
                          }}
                        >
                          <span>{captchaTarget}</span>
                          <Button
                            variant="outline-warning"
                            size="sm"
                            type="button"
                            onClick={refreshCaptcha}
                            title="Generar nuevo código Captcha"
                          >
                            🔄
                          </Button>
                        </div>
                      </Col>
                      <Col md={7}>
                        <Form.Control
                          type="text"
                          placeholder="Escribe los 6 caracteres del Captcha"
                          value={captchaInput}
                          onChange={(e) => setCaptchaInput(e.target.value)}
                          required
                        />
                        <Form.Check
                          type="checkbox"
                          id="captcha-human-check"
                          className="mt-2 fw-semibold small"
                          label="Confirmo que soy un usuario humano y no un bot automatizado"
                          checked={humanCheck}
                          onChange={(e) => setHumanCheck(e.target.checked)}
                          required
                        />
                      </Col>
                    </Row>
                  </div>
                </Col>

                <Col xs={12} className="text-end mt-3">
                  <Button type="submit" className="btn-choco-gold btn-lg px-5">
                    ✅ Completar Registro Seguro
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default RegistroPage;
