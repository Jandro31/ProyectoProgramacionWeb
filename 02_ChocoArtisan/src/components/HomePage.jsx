/**
 * @file HomePage.jsx
 * @description Página de Portada Principal (Fase I) de ChocoArtisan.
 * Implementa todos los requisitos de diseño y programación solicitados:
 * - Hero Banner corporativo con llamada a la acción ("Explorar Catálogo").
 * - Carrusel promocional interactivo (Carousel de React-Bootstrap).
 * - Diseño estructurado a Tres Columnas responsivas (Desktop, Tablet y Celular).
 * - Efectos de Bootstrap: Fade, Modal, Collapse, Popover y Dropdown.
 * - Integración de Video (<video>), Sonido (<audio>), Acordeón (Accordion) y
 *   Texto con estilos (primera letra grande y a color mediante ::first-letter).
 * - Formulario interactivo con `import Form from 'react-bootstrap/Form';`.
 */

import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Carousel,
  Button,
  Accordion,
  Collapse,
  Fade,
  OverlayTrigger,
  Popover,
  Modal,
  Badge,
  Alert
} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { MULTIMEDIA_ASSETS, PRODUCTOS_CATALOGO } from '../data/chocoData';

// Importación de archivos locales de Sonido y Video desde la carpeta multimedia
import audioExperiencia from '../multimedia/sonido/experiencia_cacao.mp3';
import videoProceso from '../multimedia/videos/arte_chocolate.mp4';
import '../styles/home.css';

function HomePage({
  onAddToCart,
  isAuthenticated,
  onOpenLoginModal
}) {
  const navigate = useNavigate();

  // Estados para los efectos interactivos de Bootstrap: Collapse, Fade y Modal
  const [openCollapseOrigen, setOpenCollapseOrigen] = useState(false);
  const [openFadeCupon, setOpenFadeCupon] = useState(true);
  const [selectedQuickProduct, setSelectedQuickProduct] = useState(null);

  // Estado para el Formulario de Solicitud y Contacto Rápido en portada
  const [contactForm, setContactForm] = useState({
    nombre: '',
    direccion: '',
    ciudad: 'Bucaramanga (Área Metropolitana)',
    codigoPostal: '',
    telefono: '',
    correo: '',
    notas: ''
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Definición del Popover de Bootstrap para guía de maridaje y cata
  const popoverMaridaje = (
    <Popover id="popover-maridaje-choco" style={{ borderColor: '#D4AF37' }}>
      <Popover.Header
        as="h3"
        style={{ backgroundColor: '#3E2723', color: '#D4AF37' }}
      >
        🍷 Guía de Cata & Maridaje
      </Popover.Header>
      <Popover.Body style={{ backgroundColor: '#FFF8E1', color: '#2C1B18' }}>
        <strong>Temperatura ideal:</strong> Conservar entre 16 °C y 18 °C.
        <br />
        <strong>Maridaje recomendado:</strong> El cacao al 78%-85% resalta sus
        notas florales junto a un café filtrado de Santander o un vino Pinot Noir.
      </Popover.Body>
    </Popover>
  );

  // Manejo del formulario de contacto y guía de envío rápida
  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 6000);
  };

  return (
    <Container className="py-4">
      {/* ====================================================================
          1. BANNER INICIAL (HERO SECTION)
          ==================================================================== */}
      <section className="hero-banner-section">
        <img
          src={MULTIMEDIA_ASSETS.heroBanner}
          alt="Banner Principal ChocoArtisan"
          className="hero-banner-img"
        />
        <div className="hero-overlay-content">

          <p
            className="lead mb-4"
            style={{ color: '#F5E6B3', maxWidth: '620px' }}
          >
            Alta chocolatería colombiana elaborada a mano con granos de origen
            seleccionados, manteca de cacao pura y destellos de oro comestible de
            24 quilates.
          </p>
          <div className="d-flex flex-wrap gap-3">
            <Button
              className="btn-choco-gold btn-lg"
              onClick={() => navigate('/catalogo')}
            >
              🍫 Explorar Catálogo
            </Button>
            <Button
              variant="outline-light"
              size="lg"
              onClick={() => {
                if (isAuthenticated) {
                  navigate('/caja-personalizada');
                } else {
                  onOpenLoginModal(
                    'Inicia sesión (Admin | 1234) para abrir el Configurador 3D/2D de Cajas Personalizadas.'
                  );
                }
              }}
            >
              🎁 Crea tu Caja 3D/2D
            </Button>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. BANNER PROMOCIONAL (CARRUSEL DE REACT-BOOTSTRAP)
          ==================================================================== */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <h2 className="section-heading mb-0">
            Ofertas de Temporada y Lanzamientos
          </h2>
          <span className="text-muted small fw-semibold">
            Carrusel Interactivo • Cupones & Ediciones Limitadas
          </span>
        </div>

        <div className="promo-carousel-wrapper">
          <Carousel fade interval={4500} pause="hover">
            {MULTIMEDIA_ASSETS.carouselSlides.map((slide) => (
              <Carousel.Item key={slide.id}>
                <img
                  className="d-block w-100 promo-carousel-img"
                  src={slide.image}
                  alt={slide.title}
                />
                <Carousel.Caption className="promo-carousel-caption">
                  <Badge bg="warning" text="dark" className="mb-2">
                    {slide.badge}
                  </Badge>
                  <h3 className="text-light serif-title">{slide.title}</h3>
                  <p className="mb-3 text-light">{slide.subtitle}</p>
                  <Button
                    className="btn-choco-gold btn-sm"
                    onClick={() => {
                      if (
                        (slide.ctaLink === '/caja-personalizada' ||
                          slide.ctaLink === '/carrito-despacho') &&
                        !isAuthenticated
                      ) {
                        onOpenLoginModal(
                          'Esta sección pertenece al Menú de Rutas Privadas. Ingresa con Admin | 1234.'
                        );
                      } else {
                        navigate(slide.ctaLink);
                      }
                    }}
                  >
                    {slide.ctaText}
                  </Button>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </section>

      {/* ====================================================================
          3. DISEÑO A TRES COLUMNAS (CON MULTIMEDIA, TEXTO CAPITULAR Y EFECTOS)
          ==================================================================== */}
      <section className="three-col-section">
        <div className="text-center mb-4">
          <h2 className="section-heading">
            Experiencia Sensorial ChocoArtisan
          </h2>
          <div className="gold-divider" />

        </div>

        <Row className="g-4">
          {/* COLUMNA 1: Historia, Primera Letra Grande a Color, Audio y Collapse */}
          <Col lg={4} md={6} xs={12}>
            <div className="col-feature-box">
              <div>
                <div className="d-flex align-items-center mb-3">
                  <span className="col-badge-number">1</span>
                  <h4 className="mb-0 serif-title">
                    Nuestra Historia y Sonido
                  </h4>
                </div>

                {/* REQUISITO: Texto con estilos (primera letra grande y a color) */}
                <p className="drop-cap-choco text-justify">
                  Cultivamos la excelencia chocolatera desde el corazón de
                  Santander, seleccionando mazorcas de cacao criollo y trinitario
                  cosechadas a mano por familias campesinas que preservan el
                  ecosistema del bosque húmedo tropical.
                </p>

                {/* REQUISITO: Sonido (Reproductor de Audio HTML5 local) */}
                <div className="multimedia-player-box my-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="small fw-bold text-warning">
                      🎵 Paisaje Sonoro: Armonía del Cacao
                    </span>
                    <Badge bg="secondary">Audio MP3</Badge>
                  </div>
                  <p className="small mb-1 text-light opacity-75">
                    Escucha nuestra ambientación acústica mientras recorres la
                    boutique:
                  </p>
                  <audio controls className="multimedia-audio" preload="metadata">
                    <source src={audioExperiencia} type="audio/mpeg" />
                    Tu navegador no soporta el elemento de audio.
                  </audio>
                </div>
              </div>

              {/* REQUISITO: Efecto Collapse de Bootstrap */}
              <div className="mt-2">
                <Button
                  className="btn-choco-dark w-100"
                  onClick={() => setOpenCollapseOrigen(!openCollapseOrigen)}
                  aria-controls="collapse-trazabilidad-cacao"
                  aria-expanded={openCollapseOrigen}
                >
                  {openCollapseOrigen
                    ? '▲ Ocultar Trazabilidad (Efecto Collapse)'
                    : '▼ Ver Trazabilidad de Origen (Efecto Collapse)'}
                </Button>
                <Collapse in={openCollapseOrigen}>
                  <div
                    id="collapse-trazabilidad-cacao"
                    className="mt-3 p-3 rounded border"
                    style={{
                      backgroundColor: '#FFF8E1',
                      borderColor: '#D4AF37'
                    }}
                  >
                    <h6 className="fw-bold mb-1" style={{ color: '#3E2723' }}>
                      📍 Finca La Esmeralda — San Vicente de Chucurí
                    </h6>
                    <p className="small mb-0">
                      Altitud: 1.150 m.s.n.m. • Fermentación en cajones de madera
                      de laurel durante 144 horas • Humedad controlada al 6.8%.
                    </p>
                  </div>
                </Collapse>
              </div>
            </div>
          </Col>

          {/* COLUMNA 2: Video Artesanal, Segunda Capitular, Popover y Modal */}
          <Col lg={4} md={6} xs={12}>
            <div className="col-feature-box highlight-gold">
              <div>
                <div className="d-flex align-items-center mb-3">
                  <span className="col-badge-number">2</span>
                  <h4 className="mb-0 serif-title">
                    Maestro Chocolatero
                  </h4>
                </div>

                {/* REQUISITO: Video HTML5 local */}
                <div className="multimedia-player-box mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="small fw-bold text-warning">
                      🎬 Proceso Artesanal: Del Grano a la Barra
                    </span>
                    <Badge bg="warning" text="dark">
                      Video MP4
                    </Badge>
                  </div>
                  <video
                    controls
                    className="multimedia-video"
                    poster={MULTIMEDIA_ASSETS.procesoArtesanalImg}
                    preload="metadata"
                  >
                    <source src={videoProceso} type="video/mp4" />
                    Tu navegador no soporta la reproducción de video.
                  </video>
                </div>

                {/* Segunda muestra de Texto con primera letra grande y a color */}
                <p className="drop-cap-gold small">
                  Dominar el templado del chocolate exige precisión térmica al
                  grado exacto para cristalizar la manteca de cacao en su forma
                  Beta V, logrando ese brillo espejo y chasquido inconfundible.
                </p>
              </div>

              {/* REQUISITO: Efectos Popover y Modal de Bootstrap */}
              <div className="d-flex flex-column gap-2 mt-2">
                <OverlayTrigger
                  trigger={['hover', 'focus', 'click']}
                  placement="top"
                  overlay={popoverMaridaje}
                >
                  <Button variant="outline-dark" className="w-100 fw-semibold">
                    🍷 Ver Guía de Cata
                  </Button>
                </OverlayTrigger>

                <Button
                  className="btn-choco-gold w-100"
                  onClick={() => setSelectedQuickProduct(PRODUCTOS_CATALOGO[0])}
                >
                  🔍 Ficha de Degustación
                </Button>
              </div>
            </div>
          </Col>

          {/* COLUMNA 3: Acordeón del Proceso y Efecto Fade de Cupones */}
          <Col lg={4} md={12} xs={12}>
            <div className="col-feature-box">
              <div>
                <div className="d-flex align-items-center mb-3">
                  <span className="col-badge-number">3</span>
                  <h4 className="mb-0 serif-title">
                    Etapas
                  </h4>
                </div>

                {/* REQUISITO: Acordeón de React-Bootstrap */}
                <Accordion defaultActiveKey="0" className="mb-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      1. Cosecha y Selección Manual
                    </Accordion.Header>
                    <Accordion.Body className="small">
                      Solo el 12% superior de las almendras de cacao supera
                      nuestro control de calidad sensorial y tamaño en finca.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      2. Tostado Lento y Conchado 48h
                    </Accordion.Header>
                    <Accordion.Body className="small">
                      Refinamos en molinos de piedra de granito durante 48 horas
                      hasta obtener una textura sedosa de 18 micras.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      3. Moldeado y Oro Comestible 24K
                    </Accordion.Header>
                    <Accordion.Body className="small">
                      Cada bombón se pinta a mano con manteca de cacao coloreada
                      naturalmente y hojas de oro certificado.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>

              {/* REQUISITO: Efecto Fade de React-Bootstrap */}
              <div>
                <Button
                  className="btn-choco-dark w-100 mb-2"
                  onClick={() => setOpenFadeCupon(!openFadeCupon)}
                  aria-controls="fade-cupon-panel"
                  aria-expanded={openFadeCupon}
                >
                  {openFadeCupon
                    ? '✨ Ocultar Cupones VIP'
                    : '✨ Revelar Cupones VIP'}
                </Button>

                <Fade in={openFadeCupon}>
                  <div
                    id="fade-cupon-panel"
                    className="p-3 rounded border text-center"
                    style={{
                      backgroundColor: '#3E2723',
                      color: '#FFF8E1',
                      borderColor: '#D4AF37'
                    }}
                  >
                    <span className="text-warning fw-bold d-block small">
                      🎁 CUPONES ACTIVOS EN EL CARRITO
                    </span>
                    <div className="d-flex justify-content-center gap-2 my-1 flex-wrap">
                      <Badge bg="warning" text="dark">
                        CHOCO15 (15%)
                      </Badge>
                      <Badge bg="warning" text="dark">
                        DULCE20 (20%)
                      </Badge>
                      <Badge bg="light" text="dark">
                        UIS25 (25%)
                      </Badge>
                    </div>
                    <small className="opacity-75">
                      Aplícalos en la ruta privada del Carrito de Compras.
                    </small>
                  </div>
                </Fade>
              </div>
            </div>
          </Col>
        </Row>
      </section>

      {/* ====================================================================
          4. SECCIÓN CORPORATIVA: NUESTRA HISTORIA, EL CORAZÓN DEL CACAO
          ==================================================================== */}
      <section className="my-5 p-4 choco-card">
        <Row className="align-items-center g-4">
          <Col lg={6}>
            <Badge bg="dark" className="mb-2 text-warning">
              IDENTIDAD CORPORATIVA
            </Badge>
            <h2 className="serif-title mb-3">
              Nuestra Historia, El Corazón del Cacao
            </h2>
            <p className="drop-cap-choco">
              En ChocoArtisan fusionamos la herencia ancestral del cacao
              colombiano con las técnicas de alta chocolatería europea. Trabajamos
              mediante comercio directo con cacaocultores locales, pagando una
              prima superior al mercado internacional para garantizar cacaos finos
              de aroma libres de deforestación.
            </p>
            <Row className="g-3 mt-2">
              <Col sm={4}>
                <div
                  className="p-2 rounded text-center border"
                  style={{ backgroundColor: '#3E2723', color: '#FFF8E1' }}
                >
                  <strong className="text-warning d-block">#3E2723</strong>
                  <small>Café Profundo</small>
                </div>
              </Col>
              <Col sm={4}>
                <div
                  className="p-2 rounded text-center border"
                  style={{ backgroundColor: '#FFF8E1', color: '#3E2723' }}
                >
                  <strong className="d-block">#FFF8E1</strong>
                  <small>Crema Cacao</small>
                </div>
              </Col>
              <Col sm={4}>
                <div
                  className="p-2 rounded text-center border"
                  style={{ backgroundColor: '#D4AF37', color: '#261512' }}
                >
                  <strong className="d-block">#D4AF37</strong>
                  <small>Dorado Imperial</small>
                </div>
              </Col>
            </Row>
          </Col>
          <Col lg={6}>
            <Row className="g-3">
              <Col sm={6}>
                <img
                  src={MULTIMEDIA_ASSETS.origenCacaoImg}
                  alt="Origen del Cacao"
                  className="img-fluid rounded border border-warning shadow-sm"
                />
              </Col>
              <Col sm={6}>
                <img
                  src={MULTIMEDIA_ASSETS.procesoArtesanalImg}
                  alt="Proceso Artesanal"
                  className="img-fluid rounded border border-warning shadow-sm"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </section>

      {/* ====================================================================
          5. VITRINA DESTACADA DEL CATÁLOGO DE PRODUCTOS
          ==================================================================== */}
      <section className="my-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <h2 className="section-heading mb-1">
              Catálogo de Creaciones Exclusivas
            </h2>
            <p className="text-muted mb-0">
              Selección destacada de bombones de autor, barras de origen y trufas
            </p>
          </div>
          <Button
            className="btn-choco-dark"
            onClick={() => navigate('/catalogo')}
          >
            Ver las 8 Creaciones y Filtrar por Categoría →
          </Button>
        </div>

        <Row className="g-4">
          {PRODUCTOS_CATALOGO.slice(0, 6).map((prod) => (
            <Col lg={4} md={6} xs={12} key={prod.id}>
              <div className="choco-card h-100 d-flex flex-column">
                <div className="product-card-img-wrapper">
                  <img
                    src={prod.imagen}
                    alt={prod.nombre}
                    className="product-card-img"
                  />
                  <span className="cacao-percentage-badge">
                    {prod.cacao}% Cacao
                  </span>
                </div>
                <div className="p-3 d-flex flex-column flex-grow-1 justify-content-between">
                  <div>
                    <Badge bg="secondary" className="mb-2">
                      {prod.categoria}
                    </Badge>
                    <h5 className="serif-title mb-2">{prod.nombre}</h5>
                    <p className="small text-muted mb-3">{prod.descripcion}</p>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="fs-4 fw-bold" style={{ color: '#3E2723' }}>
                        ${prod.precio.toFixed(2)} USD
                      </span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => setSelectedQuickProduct(prod)}
                      >
                        🔍 Notas de Cata
                      </Button>
                    </div>
                    <Button
                      className="btn-choco-gold w-100"
                      onClick={() => onAddToCart(prod)}
                    >
                      🛒 Añadir al Carrito
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </section>

      {/* ====================================================================
          6. FORMULARIO CON `import Form from 'react-bootstrap/Form';`
          ==================================================================== */}
      <section className="my-5 p-4 choco-card">
        <div className="text-center mb-4">
          <Badge bg="warning" text="dark" className="mb-2">
            ATENCIÓN PERSONALIZADA Y DESPACHO
          </Badge>
          <h2 className="section-heading">
            Completa tu Solicitud de Información y Guía de Envío
          </h2>
          <div className="gold-divider" />
        </div>

        {contactSubmitted && (
          <Alert variant="success" className="border-success">
            <strong>✅ ¡Solicitud registrada con éxito!</strong> Nuestro equipo
            de logística gourmet de ChocoArtisan se comunicará contigo al correo{' '}
            <strong>{contactForm.correo}</strong>.
          </Alert>
        )}

        <Form onSubmit={handleContactSubmit}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group controlId="formNombreCompleto">
                <Form.Label className="fw-bold">Nombre Completo *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: María Fernanda Gómez"
                  value={contactForm.nombre}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, nombre: e.target.value })
                  }
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formDireccionEntrega">
                <Form.Label className="fw-bold">
                  Dirección de Entrega *
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Carrera 27 # 9-02, Barrio Universidad"
                  value={contactForm.direccion}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, direccion: e.target.value })
                  }
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="formCiudadDestino">
                <Form.Label className="fw-bold">Ciudad de Destino *</Form.Label>
                <Form.Select
                  value={contactForm.ciudad}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, ciudad: e.target.value })
                  }
                >
                  <option>Bucaramanga (Área Metropolitana)</option>
                  <option>Bogotá D.C.</option>
                  <option>Medellín</option>
                  <option>Cali</option>
                  <option>Cartagena / Costa Atlántica</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="formCodigoPostal">
                <Form.Label className="fw-bold">Código Postal *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: 680002"
                  value={contactForm.codigoPostal}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      codigoPostal: e.target.value
                    })
                  }
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="formTelefono">
                <Form.Label className="fw-bold">Teléfono Móvil *</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Ej: +57 315 000 0000"
                  value={contactForm.telefono}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, telefono: e.target.value })
                  }
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formCorreoElectronico">
                <Form.Label className="fw-bold">
                  Correo Electrónico *
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="cliente@dominio.com"
                  value={contactForm.correo}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, correo: e.target.value })
                  }
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formNotasEspeciales">
                <Form.Label className="fw-bold">
                  Notas Especiales de Entrega / Dedicatoria
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Incluir tarjeta de aniversario y empaque térmico de regalo"
                  value={contactForm.notas}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, notas: e.target.value })
                  }
                />
              </Form.Group>
            </Col>

            <Col xs={12} className="text-center mt-4">
              <Button type="submit" className="btn-choco-gold btn-lg px-5">
                📨 Enviar Solicitud / Registrar Guía de Despacho
              </Button>
            </Col>
          </Row>
        </Form>
      </section>

      {/* Modal de Ficha de Degustación Rápida */}
      <Modal
        show={Boolean(selectedQuickProduct)}
        onHide={() => setSelectedQuickProduct(null)}
        centered
      >
        {selectedQuickProduct && (
          <>
            <Modal.Header
              closeButton
              style={{ backgroundColor: '#3E2723', color: '#FFF8E1' }}
            >
              <Modal.Title className="serif-title text-warning">
                🍫 {selectedQuickProduct.nombre}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#FFF8E1' }}>
              <img
                src={selectedQuickProduct.imagen}
                alt={selectedQuickProduct.nombre}
                className="img-fluid rounded border border-warning mb-3 w-100"
              />
              <div className="d-flex justify-content-between mb-2">
                <Badge bg="dark">{selectedQuickProduct.categoria}</Badge>
                <Badge bg="warning" text="dark">
                  Pureza: {selectedQuickProduct.cacao}% Cacao
                </Badge>
              </div>
              <p className="mb-2">{selectedQuickProduct.descripcion}</p>
              <div className="p-2 rounded bg-white border mb-2 small">
                <strong>👅 Notas de Cata:</strong>{' '}
                {selectedQuickProduct.notasCata}
              </div>
              <div className="p-2 rounded bg-white border small">
                <strong>🍷 Maridaje Sugerido:</strong>{' '}
                {selectedQuickProduct.maridaje}
              </div>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#FFF8E1' }}>
              <Button
                variant="secondary"
                onClick={() => setSelectedQuickProduct(null)}
              >
                Cerrar
              </Button>
              <Button
                className="btn-choco-gold"
                onClick={() => {
                  onAddToCart(selectedQuickProduct);
                  setSelectedQuickProduct(null);
                }}
              >
                🛒 Añadir al Carrito (${selectedQuickProduct.precio.toFixed(2)})
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
}

export default HomePage;
