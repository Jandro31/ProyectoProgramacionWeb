/**
 * @file CarritoDespachoPage.jsx
 * @description RUTA PRIVADA — Carrito de Compras Interactivo y Formulario de Despacho.
 * Implementa modificación de cantidades y eliminación en tiempo real, así como el
 * cálculo automatizado de:
 * - Subtotal de productos
 * - Códigos de descuento promocionales (CHOCO15, DULCE20, UIS25)
 * - Impuestos (IVA 19%)
 * - Costo de envío dinámico según ciudad de destino
 * - Formulario de Guía de Envío con `import Form from 'react-bootstrap/Form';`
 */

import React, { useState } from 'react';
import { Container, Row, Col, Button, Table, Badge, Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { CUPONES_DESCUENTO, TARIFAS_ENVIO } from '../data/chocoData';

function CarritoDespachoPage({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onRegisterOrder,
  currentUser
}) {
  // Estados para cupón promocional y destino de envío
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState(null);
  const [selectedCity, setSelectedCity] = useState(TARIFAS_ENVIO[0].ciudad);

  // Estado del Formulario de Contacto y Despacho
  const [shippingData, setShippingData] = useState({
    nombre: currentUser?.username || '',
    direccion: '',
    codigoPostal: '680002',
    telefono: '',
    correo: '',
    notas: ''
  });
  const [orderCompleted, setOrderCompleted] = useState(null);
  const [orderSeq, setOrderSeq] = useState(840193);

  // 1. Cálculo automático del Subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  // 2. Cálculo del Descuento por Cupón
  const discountAmount = appliedCoupon
    ? subtotal * appliedCoupon.porcentaje
    : 0;
  const subtotalWithDiscount = Math.max(0, subtotal - discountAmount);

  // 3. Cálculo automático de Impuestos (IVA 19%)
  const ivaTax = subtotalWithDiscount * 0.19;

  // 4. Costo de envío dinámico según ciudad de destino
  const shippingInfo =
    TARIFAS_ENVIO.find((t) => t.ciudad === selectedCity) || TARIFAS_ENVIO[0];
  const shippingCost = cartItems.length > 0 ? shippingInfo.costo : 0;

  // 5. Total final a pagar
  const totalPagar = subtotalWithDiscount + ivaTax + shippingCost;

  // Validar y aplicar código de cupón promocional
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (CUPONES_DESCUENTO[code]) {
      setAppliedCoupon(CUPONES_DESCUENTO[code]);
      setCouponMessage({
        type: 'success',
        text: `¡Cupón ${code} aplicado! (${CUPONES_DESCUENTO[code].descripcion})`
      });
    } else {
      setAppliedCoupon(null);
      setCouponMessage({
        type: 'danger',
        text: 'Código no válido. Prueba con CHOCO15 (15%), DULCE20 (20%) o UIS25 (25%).'
      });
    }
  };

  // Procesar y registrar la orden completa de compra
  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    const newOrder = {
      idOrden: `ORD-${orderSeq}`,
      fecha: '18/10/2026 - Registro en línea',
      cliente: shippingData.nombre,
      correo: shippingData.correo,
      direccion: `${shippingData.direccion}, ${selectedCity} (CP: ${shippingData.codigoPostal})`,
      items: cartItems,
      subtotal: Number(subtotal.toFixed(2)),
      descuento: Number(discountAmount.toFixed(2)),
      iva: Number(ivaTax.toFixed(2)),
      envio: Number(shippingCost.toFixed(2)),
      total: Number(totalPagar.toFixed(2)),
      estado: 'Confirmada — En Preparación Térmica'
    };

    setOrderSeq((s) => s + 1);
    onRegisterOrder(newOrder);
    setOrderCompleted(newOrder);
    onClearCart();
  };

  return (
    <Container className="py-4">
      <div className="text-center mb-4">
        <Badge bg="warning" text="dark" className="mb-2 px-3 py-2">
          🔓 RUTA PRIVADA • GESTIÓN DE COMPRA Y ENVÍO
        </Badge>
        <h1 className="section-heading">
          Carrito de Compras Interactivo y Guía de Despacho
        </h1>
        <div className="gold-divider" />
      </div>

      {orderCompleted && (
        <Alert variant="success" className="p-4 mb-4 border-success shadow-sm">
          <h4 className="serif-title text-success">
            🎉 ¡Orden {orderCompleted.idOrden} Procesada Exitosamente!
          </h4>
          <p className="mb-2">
            Gracias por tu compra, <strong>{orderCompleted.cliente}</strong>. Tu
            pedido será despachado a <strong>{orderCompleted.direccion}</strong>.
          </p>
          <div className="small bg-white p-3 rounded border">
            <strong>Resumen Financiero:</strong> Subtotal: $
            {orderCompleted.subtotal.toFixed(2)} | Descuento: -$
            {orderCompleted.descuento.toFixed(2)} | IVA (19%): $
            {orderCompleted.iva.toFixed(2)} | Envío: $
            {orderCompleted.envio.toFixed(2)} |{' '}
            <strong className="text-dark">
              Total Pagado: ${orderCompleted.total.toFixed(2)} USD
            </strong>
          </div>
        </Alert>
      )}

      <Row className="g-4">
        {/* Tabla interactiva del Carrito */}
        <Col lg={7}>
          <div className="choco-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="serif-title mb-0">
                🛒 Productos Seleccionados ({cartItems.length})
              </h4>
              {cartItems.length > 0 && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={onClearCart}
                >
                  Vaciar Carrito
                </Button>
              )}
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-muted mb-3">
                  Tu carrito de compras se encuentra vacío en este momento.
                </p>
                <div className="d-flex justify-content-center gap-2">
                  <Button as={Link} to="/catalogo" className="btn-choco-gold">
                    🍫 Ir al Catálogo
                  </Button>
                  <Button
                    as={Link}
                    to="/caja-personalizada"
                    className="btn-choco-dark"
                  >
                    🎁 Crear Caja 3D/2D
                  </Button>
                </div>
              </div>
            ) : (
              <Table responsive hover className="align-middle">
                <thead style={{ backgroundColor: '#3E2723', color: '#FFF8E1' }}>
                  <tr>
                    <th>Producto</th>
                    <th>Precio Unit.</th>
                    <th className="text-center">Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={item.imagen}
                            alt={item.nombre}
                            style={{
                              width: '48px',
                              height: '48px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                              border: '1px solid #D4AF37'
                            }}
                          />
                          <div>
                            <div className="fw-bold small">{item.nombre}</div>
                            <Badge bg="secondary" style={{ fontSize: '0.7rem' }}>
                              {item.cacao}% Cacao
                            </Badge>
                          </div>
                        </div>
                      </td>
                      <td>${item.precio.toFixed(2)}</td>
                      <td>
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          <Button
                            variant="outline-dark"
                            size="sm"
                            onClick={() =>
                              onUpdateQuantity(item.id, item.cantidad - 1)
                            }
                          >
                            −
                          </Button>
                          <span className="fw-bold px-2">{item.cantidad}</span>
                          <Button
                            variant="outline-dark"
                            size="sm"
                            onClick={() =>
                              onUpdateQuantity(item.id, item.cantidad + 1)
                            }
                          >
                            +
                          </Button>
                        </div>
                      </td>
                      <td className="fw-bold">
                        ${(item.precio * item.cantidad).toFixed(2)}
                      </td>
                      <td>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          ✕
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            {/* Aplicación de Cupón de Descuento */}
            <div
              className="p-3 rounded border mt-3"
              style={{ backgroundColor: '#FFF8E1', borderColor: '#D4AF37' }}
            >
              <Form onSubmit={handleApplyCoupon}>
                <Form.Label className="fw-bold small mb-1">
                  🏷️ Cupón de Descuento Promocional (CHOCO15, DULCE20 o UIS25):
                </Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    placeholder="Ingresa tu código promocional"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                  />
                  <Button type="submit" className="btn-choco-dark text-nowrap">
                    Aplicar Cupón
                  </Button>
                </div>
              </Form>
              {couponMessage && (
                <div className={`small mt-2 text-${couponMessage.type} fw-semibold`}>
                  {couponMessage.text}
                </div>
              )}
            </div>
          </div>
        </Col>

        {/* Liquidación Financiera y Formulario de Despacho */}
        <Col lg={5}>
          <div className="choco-card p-4">
            <h4 className="serif-title mb-3">
              📦 Liquidación & Guía de Despacho
            </h4>

            {/* Desglose automático: Subtotal, Descuento, IVA 19%, Envío y Total */}
            <div
              className="p-3 rounded border mb-4"
              style={{ backgroundColor: '#261512', color: '#FFF8E1' }}
            >
              <div className="d-flex justify-content-between small mb-1">
                <span>Subtotal Productos:</span>
                <span>${subtotal.toFixed(2)} USD</span>
              </div>
              <div className="d-flex justify-content-between small mb-1 text-warning">
                <span>
                  Descuento Cupón{' '}
                  {appliedCoupon ? `(${appliedCoupon.codigo})` : ''}:
                </span>
                <span>-${discountAmount.toFixed(2)} USD</span>
              </div>
              <div className="d-flex justify-content-between small mb-1">
                <span>Impuesto (IVA 19%):</span>
                <span>${ivaTax.toFixed(2)} USD</span>
              </div>
              <div className="d-flex justify-content-between small mb-2">
                <span>Costo de Envío ({selectedCity.split(' ')[0]}):</span>
                <span>${shippingCost.toFixed(2)} USD</span>
              </div>
              <hr className="border-warning my-2" />
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold text-warning">TOTAL A PAGAR:</span>
                <span className="fs-4 fw-bold text-warning">
                  ${totalPagar.toFixed(2)} USD
                </span>
              </div>
            </div>

            {/* Formulario con import Form from 'react-bootstrap/Form' */}
            <Form onSubmit={handleCheckoutSubmit}>
              <Form.Group className="mb-2" controlId="checkoutNombre">
                <Form.Label className="small fw-bold mb-1">
                  Nombre Completo del Destinatario *
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={shippingData.nombre}
                  onChange={(e) =>
                    setShippingData({ ...shippingData, nombre: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="checkoutCiudad">
                <Form.Label className="small fw-bold mb-1">
                  Ciudad de Destino (Recalcula Envío Dinámico) *
                </Form.Label>
                <Form.Select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  {TARIFAS_ENVIO.map((tarifa) => (
                    <option key={tarifa.ciudad} value={tarifa.ciudad}>
                      {tarifa.ciudad} — ${tarifa.costo.toFixed(2)} USD (
                      {tarifa.tiempo})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Row className="g-2 mb-2">
                <Col sm={8}>
                  <Form.Group controlId="checkoutDireccion">
                    <Form.Label className="small fw-bold mb-1">
                      Dirección de Entrega *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Calle / Carrera / Edificio / Apto"
                      required
                      value={shippingData.direccion}
                      onChange={(e) =>
                        setShippingData({
                          ...shippingData,
                          direccion: e.target.value
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Form.Group controlId="checkoutCP">
                    <Form.Label className="small fw-bold mb-1">
                      Cód. Postal *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={shippingData.codigoPostal}
                      onChange={(e) =>
                        setShippingData({
                          ...shippingData,
                          codigoPostal: e.target.value
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="g-2 mb-2">
                <Col sm={6}>
                  <Form.Group controlId="checkoutTelefono">
                    <Form.Label className="small fw-bold mb-1">
                      Teléfono *
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="+57 300 000 0000"
                      required
                      value={shippingData.telefono}
                      onChange={(e) =>
                        setShippingData({
                          ...shippingData,
                          telefono: e.target.value
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="checkoutCorreo">
                    <Form.Label className="small fw-bold mb-1">
                      Correo Electrónico *
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="cliente@correo.com"
                      required
                      value={shippingData.correo}
                      onChange={(e) =>
                        setShippingData({
                          ...shippingData,
                          correo: e.target.value
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="checkoutNotas">
                <Form.Label className="small fw-bold mb-1">
                  Notas Especiales de Entrega
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Instrucciones de portería o mensaje para tarjeta de regalo..."
                  value={shippingData.notas}
                  onChange={(e) =>
                    setShippingData({ ...shippingData, notas: e.target.value })
                  }
                />
              </Form.Group>

              <Button
                type="submit"
                className="btn-choco-gold w-100 btn-lg"
                disabled={cartItems.length === 0}
              >
                ✅ Confirmar Pedido (${totalPagar.toFixed(2)} USD)
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CarritoDespachoPage;
