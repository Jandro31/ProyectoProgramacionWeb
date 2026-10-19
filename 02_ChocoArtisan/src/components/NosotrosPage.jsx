/**
 * @file NosotrosPage.jsx
 * @description Sección Corporativa (Nosotros) de ChocoArtisan.
 * Presenta la historia de la chocolatería, el origen del cacao santandereano,
 * los procesos artesanales de elaboración y los valores corporativos, aplicando
 * el estilo de primera letra grande y a color (::first-letter) y multimedia.
 */

import React from 'react';
import { Container, Row, Col, Badge, Accordion } from 'react-bootstrap';
import { MULTIMEDIA_ASSETS } from '../data/chocoData';

function NosotrosPage() {
  return (
    <Container className="py-4">
      <div className="text-center mb-4">
        <Badge bg="warning" text="dark" className="mb-2 px-3 py-2">
          TRADICIÓN Y EXCELENCIA ARTESANAL
        </Badge>
        <h1 className="section-heading">
          Nuestra Historia, El Corazón del Cacao
        </h1>
        <div className="gold-divider" />
      </div>

      {/* Bloque principal de Historia con Primera Letra Grande y a Color */}
      <div className="choco-card p-4 mb-4">
        <Row className="g-4 align-items-center">
          <Col lg={6}>
            <h3 className="serif-title mb-3">
              Del Bosque Tropical de Santander a la Alta Joyería Gastronómica
            </h3>
            <p className="drop-cap-choco">
              Nacimos en Bucaramanga con la visión de transformar el cacao fino
              de aroma de las montañas de San Vicente de Chucurí y El Carmen de
              Chucurí en piezas de chocolatería de autor capaces de competir con
              las casas más prestigiosas de Bélgica y Suiza.
            </p>
            <p className="drop-cap-gold">
              Trabajamos directamente con más de 45 familias productoras bajo un
              modelo de trazabilidad total y comercio justo, garantizando que
              cada grano sea fermentado en cajones de madera noble y secado al
              sol de montaña antes de llegar a nuestro taller maestro.
            </p>
          </Col>
          <Col lg={6}>
            <img
              src={MULTIMEDIA_ASSETS.origenCacaoImg}
              alt="Origen del Cacao ChocoArtisan"
              className="img-fluid rounded border border-warning shadow"
            />
          </Col>
        </Row>
      </div>

      {/* Tres Pilares Corporativos */}
      <Row className="g-4 mb-4">
        <Col md={4}>
          <div className="choco-card p-4 h-100">
            <Badge bg="dark" className="text-warning mb-2">
              PILAR 01
            </Badge>
            <h4 className="serif-title">Origen Sostenible</h4>
            <p className="small text-muted mb-0">
              Cacao 100% agroforestal cultivado bajo sombrío nativo que protege
              las cuencas hídricas y la biodiversidad de los Andes orientales
              colombianos.
            </p>
          </div>
        </Col>
        <Col md={4}>
          <div className="choco-card p-4 h-100">
            <Badge bg="dark" className="text-warning mb-2">
              PILAR 02
            </Badge>
            <h4 className="serif-title">Tostado & Conchado Lento</h4>
            <p className="small text-muted mb-0">
              Micro-lotes tostados a curva específica según la cosecha y
              refinados en piedra de granito durante 48 horas sin aditivos ni
              grasas vegetales hidrogenadas.
            </p>
          </div>
        </Col>
        <Col md={4}>
          <div className="choco-card p-4 h-100">
            <Badge bg="dark" className="text-warning mb-2">
              PILAR 03
            </Badge>
            <h4 className="serif-title">Innovación Digital</h4>
            <p className="small text-muted mb-0">
              Pioneros en experiencias interactivas con nuestro configurador
              3D/2D de cajas personalizadas y empaques isotérmicos inteligentes.
            </p>
          </div>
        </Col>
      </Row>

      {/* Acordeón de Preguntas Frecuentes Corporativas */}
      <div className="choco-card p-4">
        <h3 className="serif-title mb-3">
          Preguntas Frecuentes sobre Nuestro Proceso
        </h3>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              ¿Qué significa que el cacao sea &quot;Fino de Aroma&quot;?
            </Accordion.Header>
            <Accordion.Body>
              Es una clasificación otorgada por la Organización Internacional del
              Cacao (ICCO) a menos del 8% de la producción mundial, caracterizada
              por notas frutales, florales y de nuez excepcionales. Colombia y
              específicamente Santander son referentes mundiales de esta genética.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              ¿Cómo garantizan que los chocolates lleguen intactos en climas cálidos?
            </Accordion.Header>
            <Accordion.Body>
              Todos nuestros despachos utilizan cápsulas térmicas eco-amigables
              con geles refrigerantes de cambio de fase que mantienen la
              temperatura interna entre 15 °C y 18 °C hasta por 72 horas.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </Container>
  );
}

export default NosotrosPage;
