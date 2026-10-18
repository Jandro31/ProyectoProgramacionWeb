/**
 * @file FooterChoco.jsx
 * @description Pie de página (Footer) corporativo de ChocoArtisan.
 * Cumple estrictamente el requisito del docente:
 * "El footer, además del contáctenos (miembros del equipo, al hacer click presentar
 * los datos básicos del estudiante incluyendo una foto), debe hacer referencia a
 * mínimo tres redes sociales."
 */

import React, { useState } from 'react';
import { Container, Row, Col, Modal, Button, Badge } from 'react-bootstrap';
import { EQUIPO_DESARROLLO, MULTIMEDIA_ASSETS } from '../data/chocoData';
import '../styles/footer.css';

function FooterChoco() {
  // Estado para almacenar el integrante del equipo seleccionado y mostrar su Modal con foto
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <footer className="footer-choco">
      <Container>
        <Row className="g-4">
          {/* Columna 1: Identidad Corporativa y Redes Sociales (Mínimo 3 redes sociales) */}
          <Col lg={4} md={6}>
            <div className="d-flex align-items-center gap-3 mb-3">
              <img
                src={MULTIMEDIA_ASSETS.logo}
                alt="Logo ChocoArtisan"
                style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '50%',
                  border: '2px solid #D4AF37'
                }}
              />
              <div>
                <h4 className="footer-title mb-0">ChocoArtisan</h4>
                <small className="text-warning">
                  Plataforma Web Corporativa & Tienda en Línea
                </small>
              </div>
            </div>
            <p className="small opacity-75 mb-3">
              Boutique de chocolatería fina artesanal elaborada con cacao de
              origen santandereano. Proyecto de Programación Web — Escuela de
              Ingeniería de Sistemas e Informática, Universidad Industrial de
              Santander (UIS).
            </p>

            <h6 className="text-warning fw-bold mb-2">
              🌐 Síguenos en Nuestras Redes Sociales:
            </h6>
            <div className="social-links-row">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                className="social-btn-choco"
              >
                📘 Facebook
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="social-btn-choco"
              >
                🐦 Twitter / X
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="social-btn-choco"
              >
                📸 Instagram
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noreferrer"
                className="social-btn-choco"
              >
                ▶️ YouTube
              </a>
            </div>
          </Col>

          {/* Columna 2: Contáctenos — Miembros del Equipo (Al hacer clic abre Modal con foto y datos) */}
          <Col lg={5} md={6}>
            <h5 className="footer-title">
              👥 Contáctenos — Equipo de Desarrollo (Haz clic en cada integrante)
            </h5>
            <p className="small opacity-75 mb-2">
              Haz clic sobre cualquier miembro del equipo para desplegar su
              ficha estudiantil completa con fotografía:
            </p>

            {EQUIPO_DESARROLLO.map((miembro) => (
              <button
                key={miembro.id}
                type="button"
                className="team-member-chip"
                onClick={() => setSelectedStudent(miembro)}
              >
                <img
                  src={miembro.foto}
                  alt={miembro.nombre}
                  className="team-member-thumb"
                />
                <div className="flex-grow-1">
                  <div className="fw-bold small text-warning">
                    {miembro.nombre}
                  </div>
                  <div className="small opacity-75" style={{ fontSize: '0.78rem' }}>
                    {miembro.rol} • <span className="text-decoration-underline">Ver Foto y Datos</span>
                  </div>
                </div>
              </button>
            ))}
          </Col>

          {/* Columna 3: Datos de Contacto Institucional y Ubicación */}
          <Col lg={3} md={12}>
            <h5 className="footer-title">📍 Sede & Contacto Directo</h5>
            <ul className="list-unstyled small opacity-85">
              <li className="mb-2">
                <strong>Dirección:</strong> Carrera 27 Calle 9, Ciudad
                Universitaria UIS, Bucaramanga, Santander.
              </li>
              <li className="mb-2">
                <strong>Línea de Atención:</strong> +57 (607) 634 4000 Ext. 2110
              </li>
              <li className="mb-2">
                <strong>Correo Corporativo:</strong> contacto@chocoartisan.co
              </li>
              <li className="mb-2">
                <strong>Asignatura:</strong> Programación Web — Grupo 02
              </li>
              <li className="mb-2">
                <strong>Docente:</strong> Ing. Manuel Florez
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="border-warning opacity-25 my-4" />

        <div className="d-flex justify-content-between align-items-center flex-wrap small opacity-75">
          <span>
            © 2026 ChocoArtisan — Todos los derechos reservados (Fase I ReactJS).
          </span>
          <span>
            Facultad de Ingeniería • Universidad Industrial de Santander (UIS)
          </span>
        </div>
      </Container>

      {/* ====================================================================
          REQUISITO: Modal con Datos Básicos del Estudiante incluyendo su Foto
          ==================================================================== */}
      <Modal
        show={Boolean(selectedStudent)}
        onHide={() => setSelectedStudent(null)}
        centered
      >
        {selectedStudent && (
          <>
            <Modal.Header
              closeButton
              style={{
                backgroundColor: '#3E2723',
                color: '#FFF8E1',
                borderBottom: '2px solid #D4AF37'
              }}
            >
              <Modal.Title className="serif-title text-warning">
                🎓 Ficha del Integrante del Equipo
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              className="text-center p-4"
              style={{ backgroundColor: '#FFF8E1', color: '#2C1B18' }}
            >
              <img
                src={selectedStudent.foto}
                alt={selectedStudent.nombre}
                className="student-modal-photo mb-3"
              />
              <h4 className="serif-title mb-1">{selectedStudent.nombre}</h4>
              <Badge bg="dark" className="text-warning mb-3 px-3 py-2">
                {selectedStudent.rol}
              </Badge>

              <div className="text-start bg-white p-3 rounded border border-warning small">
                <p className="mb-1">
                  <strong>📌 Código Estudiantil:</strong>{' '}
                  {selectedStudent.codigo}
                </p>
                <p className="mb-1">
                  <strong>🏛️ Programa Académico:</strong>{' '}
                  {selectedStudent.programa}
                </p>
                <p className="mb-1">
                  <strong>📚 Nivel / Semestre:</strong>{' '}
                  {selectedStudent.semestre}
                </p>
                <p className="mb-1">
                  <strong>✉️ Correo Institucional:</strong>{' '}
                  {selectedStudent.correo}
                </p>
                <p className="mb-2">
                  <strong>📱 Teléfono de Contacto:</strong>{' '}
                  {selectedStudent.telefono}
                </p>
                <hr className="my-2" />
                <p className="mb-0">
                  <strong>💻 Aporte en ChocoArtisan:</strong>{' '}
                  {selectedStudent.aportes}
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#FFF8E1' }}>
              <Button
                className="btn-choco-gold"
                onClick={() => setSelectedStudent(null)}
              >
                Cerrar Ficha del Estudiante
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </footer>
  );
}

export default FooterChoco;
