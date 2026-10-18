/**
 * @file CatalogoPage.jsx
 * @description Catálogo interactivo de productos de ChocoArtisan.
 * Permite filtrar en tiempo real por las 5 categorías oficiales del proyecto:
 * Bombones de Autor, Barras Finitas de Origen, Cajas de Regalo, Trufas y
 * Ediciones Especiales, además de búsqueda por texto o porcentaje de cacao.
 */

import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  OverlayTrigger,
  Popover
} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { CATEGORIAS_CATALOGO, PRODUCTOS_CATALOGO } from '../data/chocoData';

function CatalogoPage({
  selectedCategory = 'Todas',
  onSelectCategory,
  onAddToCart
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [minCacao, setMinCacao] = useState(0);

  // Filtrado combinado por categoría, texto de búsqueda y porcentaje mínimo de cacao
  const productosFiltrados = PRODUCTOS_CATALOGO.filter((prod) => {
    const matchCategory =
      selectedCategory === 'Todas' || prod.categoria === selectedCategory;
    const matchSearch =
      prod.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCacao = prod.cacao >= minCacao;
    return matchCategory && matchSearch && matchCacao;
  });

  return (
    <Container className="py-4">
      <div className="text-center mb-4">
        <Badge bg="warning" text="dark" className="mb-2 px-3 py-2">
          BOUTIQUE EN LÍNEA CHOCOARTISAN
        </Badge>
        <h1 className="section-heading">Catálogo de Creaciones Exclusivas</h1>
        <div className="gold-divider" />
        <p className="text-muted">
          Filtra nuestras creaciones por categoría, notas sensoriales o pureza de
          cacao colombiano
        </p>
      </div>

      {/* Barra de botones de Categorías */}
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
        {CATEGORIAS_CATALOGO.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`category-pill-btn ${
              selectedCategory === cat ? 'active' : ''
            }`}
            onClick={() => onSelectCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Controles adicionales de búsqueda y filtro de porcentaje de cacao */}
      <div className="choco-card p-3 mb-4">
        <Row className="g-3 align-items-center">
          <Col md={7}>
            <Form.Control
              type="search"
              placeholder="🔍 Buscar por nombre, ingrediente o nota de cata (ej: oro, frambuesa, café, Chucurí)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Col>
          <Col md={5}>
            <div className="d-flex align-items-center gap-3">
              <Form.Label className="mb-0 fw-bold text-nowrap small">
                Pureza mín.: {minCacao}% Cacao
              </Form.Label>
              <Form.Range
                min={0}
                max={85}
                step={5}
                value={minCacao}
                onChange={(e) => setMinCacao(Number(e.target.value))}
              />
            </div>
          </Col>
        </Row>
      </div>

      {/* Rejilla responsiva de productos */}
      <Row className="g-4">
        {productosFiltrados.map((prod) => {
          const popoverNotas = (
            <Popover id={`popover-prod-${prod.id}`}>
              <Popover.Header
                as="h3"
                style={{ backgroundColor: '#3E2723', color: '#D4AF37' }}
              >
                🍷 Cata & Maridaje: {prod.nombre}
              </Popover.Header>
              <Popover.Body style={{ backgroundColor: '#FFF8E1' }}>
                <p className="mb-1 small">
                  <strong>Notas de cata:</strong> {prod.notasCata}
                </p>
                <p className="mb-0 small">
                  <strong>Maridaje:</strong> {prod.maridaje}
                </p>
              </Popover.Body>
            </Popover>
          );

          return (
            <Col lg={3} md={6} xs={12} key={prod.id}>
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
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fs-5 fw-bold" style={{ color: '#3E2723' }}>
                        ${prod.precio.toFixed(2)} USD
                      </span>
                      <OverlayTrigger
                        trigger={['hover', 'focus', 'click']}
                        placement="top"
                        overlay={popoverNotas}
                      >
                        <Button variant="outline-dark" size="sm">
                          🍷 Cata
                        </Button>
                      </OverlayTrigger>
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
          );
        })}
      </Row>
    </Container>
  );
}

export default CatalogoPage;
