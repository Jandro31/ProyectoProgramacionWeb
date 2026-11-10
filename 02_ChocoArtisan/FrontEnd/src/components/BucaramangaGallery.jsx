/**
 * @file BucaramangaGallery.jsx
 * @description Vista pública de la galería turística de Bucaramanga servida desde la carpeta 'images' del backend.
 */

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function BucaramangaGallery() {
  const images = [
    {
      id: 1,
      title: 'Bucaramanga y Chocolatería Artesanal 1',
      src: 'http://localhost:5000/public/images/choco_1.jpeg',
      desc: 'Imagen servida dinámicamente desde la carpeta pública del servidor backend (Express Static).'
    },
    {
      id: 2,
      title: 'Bucaramanga y Chocolatería Artesanal 2',
      src: 'http://localhost:5000/public/images/choco_2.jpeg',
      desc: 'Muestra representativa del área metropolitana y productos artesanales.'
    },
    {
      id: 3,
      title: 'Bucaramanga y Chocolatería Artesanal 3',
      src: 'http://localhost:5000/public/images/choco_3.jpeg',
      desc: 'Contenido estático de alta resolución gestionado con express.static.'
    }
  ];

  return (
    <Container className="my-5 pt-5" style={{ minHeight: '80vh' }}>
      <div className="text-center mb-4 pt-3">
        <h2 className="serif-title fw-bold" style={{ color: '#3E2723' }}>
          📍 Bucaramanga y Área Metropolitana
        </h2>
        <p className="text-muted">
          Galería de contenidos estáticos servidos desde el servidor Node.js/Express (Fase II)
        </p>
        <hr style={{ borderColor: '#D4AF37', width: '80px', margin: '0 auto', borderWidth: '3px' }} />
      </div>

      <Row className="g-4">
        {images.map((img) => (
          <Col key={img.id} xs={12} md={4}>
            <Card className="h-100 shadow-sm border-0" style={{ backgroundColor: '#FFF8E1' }}>
              <div style={{ height: '240px', overflow: 'hidden', backgroundColor: '#3E2723' }}>
                <Card.Img
                  variant="top"
                  src={img.src}
                  alt={img.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x300?text=Imagen+No+Encontrada';
                  }}
                />
              </div>
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="fw-bold fs-6" style={{ color: '#3E2723' }}>
                    {img.title}
                  </Card.Title>
                  <Card.Text className="small text-secondary">
                    {img.desc}
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default BucaramangaGallery;