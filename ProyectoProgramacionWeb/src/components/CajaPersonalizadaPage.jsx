/**
 * @file CajaPersonalizadaPage.jsx
 * @description RUTA PRIVADA — Aporte Novedoso del Grupo:
 * "Crea tu Caja de Chocolates Personalizada" (Configurador Interactivo 3D/2D).
 * Permite elegir el tamaño de la caja (6, 12 o 24 piezas), alternar entre
 * previsualización 3D isométrica y 2D cenital, colocar cada bombón o trufa
 * individualmente, recalcular el valor total en tiempo real y añadir la caja
 * personalizada al Carrito de Compras.
 */

import React, { useState } from 'react';
import { Container, Row, Col, Button, Badge, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PIEZAS_CONFIGURADOR, MULTIMEDIA_ASSETS } from '../data/chocoData';
import '../styles/configurador.css';

// Costo base del cofre de madera y empaque de lujo según capacidad
const COSTO_BASE_COFRE = {
  6: 6.00,
  12: 10.50,
  24: 18.00
};

function CajaPersonalizadaPage({ onAddToCart }) {
  const navigate = useNavigate();

  // Tamaño seleccionado de la caja: 6, 12 o 24 piezas
  const [boxSize, setBoxSize] = useState(12);
  // Modo de visualización: '3d' o '2d'
  const [viewMode, setViewMode] = useState('3d');
  // Pieza activa para insertar al hacer clic en una cavidad
  const [activePiece, setActivePiece] = useState(PIEZAS_CONFIGURADOR[0]);
  // Arreglo de cavidades de la caja (inicializado con una combinación sugerida)
  const [slots, setSlots] = useState(() =>
    Array.from({ length: 12 }, (_, idx) => PIEZAS_CONFIGURADOR[idx % PIEZAS_CONFIGURADOR.length])
  );
  const [addedAlert, setAddedAlert] = useState(false);
  const [boxCounter, setBoxCounter] = useState(1);

  // Cambia la capacidad de la caja (6, 12 o 24 piezas) preservando las piezas actuales
  const handleSizeChange = (newSize) => {
    setBoxSize(newSize);
    setSlots((prev) => {
      if (newSize <= prev.length) {
        return prev.slice(0, newSize);
      }
      const extra = Array.from(
        { length: newSize - prev.length },
        (_, i) => PIEZAS_CONFIGURADOR[i % PIEZAS_CONFIGURADOR.length]
      );
      return [...prev, ...extra];
    });
  };

  // Coloca o reemplaza el bombón en la cavidad seleccionada
  const handleSlotClick = (index) => {
    setSlots((prev) => {
      const copy = [...prev];
      copy[index] = activePiece;
      return copy;
    });
  };

  // Vacía todas las cavidades para armar desde cero
  const handleClearBox = () => {
    setSlots(Array.from({ length: boxSize }, () => null));
  };

  // Rellena automáticamente con una selección equilibrada del maestro chocolatero
  const handleAutoFill = () => {
    setSlots(
      Array.from(
        { length: boxSize },
        (_, i) => PIEZAS_CONFIGURADOR[i % PIEZAS_CONFIGURADOR.length]
      )
    );
  };

  // Cálculo en tiempo real del precio total según piezas seleccionadas
  const filledPieces = slots.filter(Boolean);
  const totalPiecesCost = filledPieces.reduce(
    (acc, item) => acc + item.precioUnitario,
    0
  );
  const baseBoxCost = COSTO_BASE_COFRE[boxSize];
  const totalBoxPrice = baseBoxCost + totalPiecesCost;

  // Agrega la caja personalizada armada al carrito de compras
  const handleAddCustomBoxToCart = () => {
    if (filledPieces.length < boxSize) {
      return;
    }
    const customProduct = {
      id: `custom-box-${boxSize}-${boxCounter}`,
      nombre: `Caja Personalizada 3D (${boxSize} Piezas de Autor #${boxCounter})`,
      categoria: 'Cajas de Regalo',
      cacao: 75,
      precio: Number(totalBoxPrice.toFixed(2)),
      imagen: MULTIMEDIA_ASSETS.carouselSlides[2].image,
      descripcion: `Cofre personalizado de ${boxSize} piezas: ${filledPieces
        .slice(0, 4)
        .map((p) => p.nombre)
        .join(', ')}...`
    };
    onAddToCart(customProduct);
    setBoxCounter((c) => c + 1);
    setAddedAlert(true);
    setTimeout(() => setAddedAlert(false), 5000);
  };

  return (
    <Container className="py-4">
      <div className="text-center mb-4">
        <Badge bg="warning" text="dark" className="mb-2 px-3 py-2">
          🔓 RUTA PRIVADA • APORTE NOVEDOSO DEL GRUPO
        </Badge>
        <h1 className="section-heading">
          Crea tu Caja de Chocolates Personalizada (Configurador 3D/2D)
        </h1>
        <div className="gold-divider" />
        <p className="text-muted">
          Elige el tamaño del cofre (6, 12 o 24 piezas), selecciona cada bombón
          o trufa y observa la previsualización y el precio en tiempo real
        </p>
      </div>

      {addedAlert && (
        <Alert variant="success" className="d-flex justify-content-between align-items-center">
          <span>
            ✅ <strong>¡Tu Caja Personalizada de {boxSize} piezas ha sido añadida al Carrito!</strong>
          </span>
          <Button
            size="sm"
            className="btn-choco-gold"
            onClick={() => navigate('/carrito-despacho')}
          >
            🛒 Ir al Carrito a Finalizar Compra →
          </Button>
        </Alert>
      )}

      <Row className="g-4">
        {/* Panel Izquierdo: Selector de tamaño y catálogo de bombones individuales */}
        <Col lg={5}>
          <div className="choco-card p-4 h-100">
            <h5 className="serif-title mb-3">
              1. Elige la Capacidad del Cofre
            </h5>
            <div className="d-flex gap-2 mb-4">
              {[6, 12, 24].map((size) => (
                <Button
                  key={size}
                  className={
                    boxSize === size
                      ? 'btn-choco-gold flex-grow-1'
                      : 'btn-choco-dark flex-grow-1'
                  }
                  onClick={() => handleSizeChange(size)}
                >
                  🎁 {size} Piezas
                </Button>
              ))}
            </div>

            <h5 className="serif-title mb-2">
              2. Selecciona un Bombón o Trufa Activa
            </h5>
            <p className="small text-muted mb-3">
              Haz clic en un sabor abajo y luego toca cualquier cavidad de la
              caja a la derecha para colocarlo:
            </p>

            <Row className="g-2 mb-4">
              {PIEZAS_CONFIGURADOR.map((pieza) => (
                <Col sm={6} key={pieza.id}>
                  <button
                    type="button"
                    className={`piece-selector-btn ${
                      activePiece.id === pieza.id ? 'selected' : ''
                    }`}
                    onClick={() => setActivePiece(pieza)}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <span
                        className="d-inline-flex align-items-center justify-content-center rounded-circle fw-bold"
                        style={{
                          width: '34px',
                          height: '34px',
                          backgroundColor: pieza.colorHex,
                          color: '#FFF8E1',
                          border: `2px solid ${pieza.bordeHex}`
                        }}
                      >
                        {pieza.icono}
                      </span>
                      <div>
                        <div className="fw-bold small">{pieza.nombre}</div>
                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                          {pieza.cacao} Cacao • ${pieza.precioUnitario.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </button>
                </Col>
              ))}
            </Row>

            {/* Resumen financiero en tiempo real */}
            <div
              className="p-3 rounded border"
              style={{ backgroundColor: '#FFF8E1', borderColor: '#D4AF37' }}
            >
              <div className="d-flex justify-content-between small mb-1">
                <span>Piezas colocadas:</span>
                <strong>
                  {filledPieces.length} / {boxSize} unidades
                </strong>
              </div>
              <div className="d-flex justify-content-between small mb-1">
                <span>Cofre de lujo ({boxSize} cavidades):</span>
                <span>${baseBoxCost.toFixed(2)} USD</span>
              </div>
              <div className="d-flex justify-content-between small mb-2">
                <span>Suma de bombones seleccionados:</span>
                <span>${totalPiecesCost.toFixed(2)} USD</span>
              </div>
              <hr className="my-2" />
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold">Valor Total Calculado:</span>
                <span className="fs-4 fw-bold" style={{ color: '#3E2723' }}>
                  ${totalBoxPrice.toFixed(2)} USD
                </span>
              </div>
            </div>

            <Button
              className="btn-choco-gold w-100 mt-3 btn-lg"
              disabled={filledPieces.length < boxSize}
              onClick={handleAddCustomBoxToCart}
            >
              {filledPieces.length < boxSize
                ? `Completa las ${boxSize - filledPieces.length} piezas restantes`
                : `🛒 Añadir Caja Personalizada ($${totalBoxPrice.toFixed(2)})`}
            </Button>
          </div>
        </Col>

        {/* Panel Derecho: Escenario Interactivo 3D / 2D */}
        <Col lg={7}>
          <div className="choco-card p-4 h-100 d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
              <div>
                <h5 className="serif-title mb-0">
                  Previsualización en Tiempo Real ({boxSize} Piezas)
                </h5>
                <small className="text-muted">
                   Bombón activo en pincel:{' '}
                  <strong style={{ color: '#3E2723' }}>
                    {activePiece.icono} {activePiece.nombre} ({activePiece.relleno})
                  </strong>
                </small>
              </div>
              <div className="d-flex gap-2">
                <Button
                  size="sm"
                  variant={viewMode === '3d' ? 'warning' : 'outline-dark'}
                  onClick={() => setViewMode('3d')}
                >
                  📐 Vista 3D Isométrica
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === '2d' ? 'warning' : 'outline-dark'}
                  onClick={() => setViewMode('2d')}
                >
                  🔍 Vista 2D Superior
                </Button>
              </div>
            </div>

            {/* Escenario 3D/2D de la Caja de Bombones */}
            <div className="box-stage-container">
              <div
                className={`choco-box-tray ${
                  viewMode === '3d' ? 'view-3d' : 'view-2d'
                } box-grid-${boxSize}`}
              >
                {slots.map((slotPiece, idx) => (
                  <div
                    key={idx}
                    className="bonbon-cavity"
                    onClick={() => handleSlotClick(idx)}
                    title={
                      slotPiece
                        ? `Cavidad #${idx + 1}: ${slotPiece.nombre} (${slotPiece.relleno}) — Clic para reemplazar con ${activePiece.nombre}`
                        : `Cavidad #${idx + 1} vacía — Clic para colocar ${activePiece.nombre}`
                    }
                  >
                    {slotPiece ? (
                      <div
                        className="bonbon-piece-3d"
                        style={{
                          backgroundColor: slotPiece.colorHex,
                          border: `2px solid ${slotPiece.bordeHex}`
                        }}
                      >
                        <span style={{ fontSize: boxSize === 24 ? '0.9rem' : '1.15rem' }}>
                          {slotPiece.icono}
                        </span>
                        <span style={{ fontSize: '0.62rem' }}>
                          {slotPiece.cacao}
                        </span>
                      </div>
                    ) : (
                      <span className="text-warning small opacity-50">+</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
              <span className="small text-muted">
                💡 Haz clic sobre cualquier cavidad de la caja para cambiar su bombón.
              </span>
              <div className="d-flex gap-2">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={handleClearBox}
                >
                  🗑️ Vaciar Caja
                </Button>
                <Button
                  variant="outline-dark"
                  size="sm"
                  onClick={handleAutoFill}
                >
                  ✨ Selección Surtida Maestra
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CajaPersonalizadaPage;
