/**
 * @file NavbarChoco.jsx
 * @description Barra de navegación superior fija (fixed="top") de ChocoArtisan.
 * Implementa menús principales, submenús desplegables (Dropdown de React-Bootstrap)
 * y despliega dinámicamente el "Menú de Rutas Privadas" únicamente cuando el
 * usuario se ha autenticado exitosamente en el Modal de Login (Ej: Admin | 1234).
 */

import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Badge, Button } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MULTIMEDIA_ASSETS, CATEGORIAS_CATALOGO } from '../data/chocoData';
import '../styles/navbar.css';

function NavbarChoco({
  isAuthenticated,
  currentUser,
  cartCount,
  onOpenLoginModal,
  onLogout,
  onSelectCategory
}) {
  const navigate = useNavigate();

  // Maneja la selección de una subcategoría desde el Dropdown del menú fijo
  const handleCategoryClick = (categoria) => {
    if (onSelectCategory) {
      onSelectCategory(categoria);
    }
    navigate('/catalogo');
  };

  return (
    <Navbar expand="lg" fixed="top" variant="dark" className="navbar-choco">
      <Container>
        {/* Logo y Título Corporativo */}
        <Navbar.Brand as={Link} to="/" className="navbar-brand-choco">
          <img
            src={MULTIMEDIA_ASSETS.logo}
            alt="Logo ChocoArtisan"
            className="navbar-logo-img"
          />
          <div>
            <span className="brand-title-main">ChocoArtisan</span>
            <span className="brand-subtitle">Chocolatería Artesanal</span>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="chocoartisan-navbar-nav" />

        <Navbar.Collapse id="chocoartisan-navbar-nav">
          {/* Menú de Rutas Públicas */}
          <Nav className="me-auto align-items-lg-center gap-1">
            <Nav.Link as={NavLink} to="/" end className="nav-link-choco">
              Inicio
            </Nav.Link>

            {/* Efecto Dropdown (Sub-menú de Categorías del Catálogo) */}
            <NavDropdown
              title="Catálogo & Colecciones"
              id="catalogo-dropdown"
              className="nav-link-choco"
            >
              <NavDropdown.Item as={Link} to="/catalogo" onClick={() => handleCategoryClick('Todas')}>
                🍫 Ver Todo el Catálogo
              </NavDropdown.Item>
              <NavDropdown.Divider />
              {CATEGORIAS_CATALOGO.filter((c) => c !== 'Todas').map((cat) => (
                <NavDropdown.Item
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                >
                  ✦ {cat}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <Nav.Link as={NavLink} to="/nosotros" className="nav-link-choco">
              Nosotros
            </Nav.Link>

            <Nav.Link as={NavLink} to="/registro" className="nav-link-choco">
              Registro (Captcha)
            </Nav.Link>

            {/* ====================================================================
                REQUISITO: Menú de Rutas Privadas (Se despliega SOLO tras Login exitoso)
                ==================================================================== */}
            {isAuthenticated && (
              <NavDropdown
                title="🔓 Menú Rutas Privadas"
                id="private-routes-dropdown"
                className="private-menu-dropdown ms-lg-2"
              >
                <NavDropdown.Header className="text-warning fw-bold">
                  Zona Exclusiva Autenticada ({currentUser?.username})
                </NavDropdown.Header>
                <NavDropdown.Item as={Link} to="/caja-personalizada">
                  🎁 Configurador Caja 3D/2D (Novedoso)
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/carrito-despacho">
                  🛒 Carrito Interactivo y Despacho ({cartCount})
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/panel-admin">
                  📊 Panel de Órdenes e Inventario (Admin)
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>

          {/* Controles de Usuario, Carrito y Login Modal */}
          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            {/* Botón de acceso al Carrito (Ruta Privada protegida) */}
            <Button
              variant="outline-warning"
              size="sm"
              className="d-flex align-items-center gap-2"
              onClick={() => {
                if (isAuthenticated) {
                  navigate('/carrito-despacho');
                } else {
                  onOpenLoginModal('Para acceder al Carrito y Guía de Despacho debes autenticarte primero (Ej: Admin | 1234).');
                }
              }}
            >
              <span>🛒 Carrito</span>
              <Badge bg="warning" text="dark" pill>
                {cartCount}
              </Badge>
            </Button>

            {isAuthenticated ? (
              <div className="d-flex align-items-center gap-2">
                <Badge bg="success" className="py-2 px-3">
                  👤 {currentUser?.username}
                </Badge>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    onLogout();
                    navigate('/');
                  }}
                >
                  Salir
                </Button>
              </div>
            ) : (
              <Button
                className="btn-choco-gold btn-sm"
                onClick={() => onOpenLoginModal()}
              >
                🔐 Login (Admin | 1234)
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarChoco;
