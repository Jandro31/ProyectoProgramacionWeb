/**
 * @file chocoData.js
 * @description Base de datos local simulada para la Fase I de ChocoArtisan.
 * Contiene el catálogo de productos por categorías, opciones del configurador 3D/2D
 * de cajas personalizadas, cupones promocionales, tarifas de envío dinámico y la
 * información detallada de los integrantes del equipo de desarrollo.
 * @author Equipo ChocoArtisan - Universidad Industrial de Santander (UIS)
 */

// Importación de imágenes desde la carpeta organizada de Multimedia
import logoChoco from '../multimedia/imagenes/logo_chocoartisan.png';
import heroBanner from '../multimedia/imagenes/hero_banner.png';
import slideTemporada from '../multimedia/imagenes/slide_temporada.png';
import slideCupon from '../multimedia/imagenes/slide_cupon.png';
import slideLanzamiento from '../multimedia/imagenes/slide_lanzamiento.png';

import prodBombonOro from '../multimedia/imagenes/prod_bombon_oro.png';
import prodBarraOrigen from '../multimedia/imagenes/prod_barra_origen.png';
import prodCajaRegalo from '../multimedia/imagenes/prod_caja_regalo.png';
import prodTrufaAndina from '../multimedia/imagenes/prod_trufa_andina.png';
import prodBombonFrambuesa from '../multimedia/imagenes/prod_bombon_frambuesa.png';
import prodEdicion70 from '../multimedia/imagenes/prod_edicion_70.png';
import prodTrufaCafe from '../multimedia/imagenes/prod_trufa_cafe.png';
import prodBarraEsmeralda from '../multimedia/imagenes/prod_barra_esmeralda.png';

import origenCacaoImg from '../multimedia/imagenes/origen_cacao.png';
import procesoArtesanalImg from '../multimedia/imagenes/proceso_artesanal.png';

import fotoAlejandro from '../multimedia/imagenes/miembro_alejandro.jpeg';
import fotoJhon from '../multimedia/imagenes/miembro_jhon.jpeg';
import fotoJesus from '../multimedia/imagenes/miembro_jesus.jpg';
import fotoDeissy from '../multimedia/imagenes/miembro_deissy.jpeg';

// Exportación de recursos multimedia generales
export const MULTIMEDIA_ASSETS = {
  logo: logoChoco,
  heroBanner,
  origenCacaoImg,
  procesoArtesanalImg,
  carouselSlides: [
    {
      id: 1,
      image: slideTemporada,
      badge: 'OFERTAS DE TEMPORADA',
      title: 'El Arte del Chocolate Artesanal',
      subtitle: '25% DCTO en Bombones de Autor y Cajas Imperiales elaboradas con cacao fino de aroma santandereano.',
      ctaText: 'Explorar Catálogo',
      ctaLink: '/catalogo'
    },
    {
      id: 2,
      image: slideCupon,
      badge: 'CUPÓN EXCLUSIVO: CHOCO15',
      title: 'Experiencia Gourmet en Casa',
      subtitle: 'Usa el código CHOCO15 o DULCE20 en tu carrito de compras y recibe descuento directo sobre tu pedido.',
      ctaText: 'Ir al Carrito VIP',
      ctaLink: '/carrito-despacho'
    },
    {
      id: 3,
      image: slideLanzamiento,
      badge: 'NUEVOS LANZAMIENTOS',
      title: 'Crea tu Caja Personalizada 3D/2D',
      subtitle: 'Diseña tu propia selección de 6, 12 o 24 bombones y trufas artesanales en nuestro configurador interactivo.',
      ctaText: 'Personalizar Caja',
      ctaLink: '/caja-personalizada'
    }
  ]
};

// Categorías oficiales según especificación de requisitos
export const CATEGORIAS_CATALOGO = [
  'Todas',
  'Bombones de Autor',
  'Barras Finitas de Origen',
  'Cajas de Regalo',
  'Trufas',
  'Ediciones Especiales'
];

// Catálogo de productos de ChocoArtisan
export const PRODUCTOS_CATALOGO = [
  {
    id: 1,
    nombre: 'Bombón Trufa Café & Oro 24K',
    categoria: 'Bombones de Autor',
    cacao: 78,
    precio: 24.99,
    stock: 25,
    imagen: prodBombonOro,
    descripcion: 'Bombón artesanal relleno de ganache de café espresso santandereano, cubierto con chocolate oscuro al 78% y lámina de oro comestible de 24 quilates.',
    maridaje: 'Ideal con café filtrado de origen, brandy añejo o vino oporto.',
    notasCata: 'Aroma intenso a cacao tostado, notas de avellana, caramelo oscuro y final prolongado de espresso.'
  },
  {
    id: 2,
    nombre: 'Barra Finita de Origen Chucurí',
    categoria: 'Barras Finitas de Origen',
    cacao: 85,
    precio: 18.50,
    stock: 40,
    imagen: prodBarraOrigen,
    descripcion: 'Tableta ultra delgada temperada en piedra de granito, elaborada con granos seleccionados de San Vicente de Chucurí con tueste lento a baja temperatura.',
    maridaje: 'Marida perfectamente con vino tinto Cabernet Sauvignon o té negro Earl Grey.',
    notasCata: 'Notas florales, madera noble, frutos secos y acidez cítrica equilibrada.'
  },
  {
    id: 3,
    nombre: 'Caja Regalo Gourmet Imperial (16 Pzs)',
    categoria: 'Cajas de Regalo',
    cacao: 75,
    precio: 68.00,
    stock: 15,
    imagen: prodCajaRegalo,
    descripcion: 'Cofre de lujo con acabado en dorado y cinta de seda que reúne 16 creaciones maestras entre bombones diamantados, trufas y pralinés.',
    maridaje: 'Diseñada para degustaciones compartidas con champaña Brut o espumoso rosado.',
    notasCata: 'Sinfonía de texturas: desde ganache sedosa hasta praliné crocante de macadamia.'
  },
  {
    id: 4,
    nombre: 'Trufas Andinas de Mora Silvestre',
    categoria: 'Trufas',
    cacao: 65,
    precio: 22.00,
    stock: 30,
    imagen: prodTrufaAndina,
    descripcion: 'Esferas aterciopeladas de cacao al 65% espolvoreadas con cacao alcalino puro y corazón fundente de reducción de mora silvestre de los Andes.',
    maridaje: 'Excelente con infusiones de frutos rojos, Pinot Noir o café suave.',
    notasCata: 'Contraste vibrante entre la dulzura frutal silvestre y el amargor elegante del cacao.'
  },
  {
    id: 5,
    nombre: 'Bombón Rubí & Frambuesa Liofilizada',
    categoria: 'Bombones de Autor',
    cacao: 70,
    precio: 26.00,
    stock: 22,
    imagen: prodBombonFrambuesa,
    descripcion: 'Pieza de alta joyería gastronómica pintada a mano con manteca de cacao natural color rubí y relleno doble de frambuesa y vainilla de Madagascar.',
    maridaje: 'Acompañar con Prosecco frío, ginebra botánica o té blanco.',
    notasCata: 'Frescura frutal inmediata seguida de notas cremosas de manteca de cacao pura.'
  },
  {
    id: 6,
    nombre: 'Edición Especial Sin Azúcar 70% Cacao',
    categoria: 'Ediciones Especiales',
    cacao: 70,
    precio: 35.00,
    stock: 18,
    imagen: prodEdicion70,
    descripcion: 'Selección saludable endulzada naturalmente con alulosa orgánica, conservando todos los antioxidantes y flavanoles del cacao puro colombiano.',
    maridaje: 'Ideal con leche de almendras tibia, matcha o espresso corto.',
    notasCata: 'Sabor limpio y profundo a cacao puro sin regusto artificial.'
  },
  {
    id: 7,
    nombre: 'Trufas Mocaccino & Cardamomo Real',
    categoria: 'Trufas',
    cacao: 72,
    precio: 23.50,
    stock: 28,
    imagen: prodTrufaCafe,
    descripcion: 'Trufas artesanales infusionadas con semillas de cardamomo verde recién molidas y crema tibia de café orgánico de altura.',
    maridaje: 'Combina de maravilla con licor de café, ron añejo de 12 años o cappuccino.',
    notasCata: 'Toque especiado exótico y refrescante con cuerpo achocolatado persistente.'
  },
  {
    id: 8,
    nombre: 'Barra Esmeralda Pistacho & Sal Marina',
    categoria: 'Ediciones Especiales',
    cacao: 60,
    precio: 21.00,
    stock: 35,
    imagen: prodBarraEsmeralda,
    descripcion: 'Barra gourmet al 60% cacao incrustada con pistachos tostados enteros y escamas de sal marina de Manaure que realzan los matices dulces.',
    maridaje: 'Perfecta con cerveza artesanal tipo Stout, whisky single malt o vino blanco seco.',
    notasCata: 'Textura crujiente con destellos salinos que despiertan el paladar.'
  }
];

// Piezas individuales para la Funcionalidad Novedosa: "Crea tu Caja de Chocolates Personalizada" (3D/2D)
export const PIEZAS_CONFIGURADOR = [
  { id: 'p1', nombre: 'Trufa Oro 24K', cacao: '78%', precioUnitario: 3.20, colorHex: '#D4AF37', bordeHex: '#FFF8E1', icono: '✦', relleno: 'Ganache Espresso & Oro' },
  { id: 'p2', nombre: 'Corazón Rubí', cacao: '70%', precioUnitario: 2.90, colorHex: '#9E2A3B', bordeHex: '#F7C6CE', icono: '♥', relleno: 'Reducción de Frambuesa' },
  { id: 'p3', nombre: 'Domo Chucurí', cacao: '85%', precioUnitario: 2.80, colorHex: '#3E2723', bordeHex: '#D4AF37', icono: '◆', relleno: 'Cacao Puro de Origen' },
  { id: 'p4', nombre: 'Esfera Esmeralda', cacao: '60%', precioUnitario: 3.10, colorHex: '#4E6E48', bordeHex: '#D8F3DC', icono: '●', relleno: 'Praliné de Pistacho' },
  { id: 'p5', nombre: 'Perla Caramelo', cacao: '65%', precioUnitario: 2.75, colorHex: '#B87333', bordeHex: '#FFE5B4', icono: '❖', relleno: 'Caramelo Salado de Manaure' },
  { id: 'p6', nombre: 'Trufa Andina', cacao: '72%', precioUnitario: 2.95, colorHex: '#5A2A42', bordeHex: '#E0B0FF', icono: '✿', relleno: 'Mora Silvestre & Cardamomo' }
];

// Cupones promocionales válidos en el Carrito de Compras
export const CUPONES_DESCUENTO = {
  CHOCO15: { codigo: 'CHOCO15', porcentaje: 0.15, descripcion: '15% de descuento de bienvenida' },
  DULCE20: { codigo: 'DULCE20', porcentaje: 0.20, descripcion: '20% de descuento promocional de temporada' },
  UIS25: { codigo: 'UIS25', porcentaje: 0.25, descripcion: '25% de descuento exclusivo Comunidad UIS' }
};

// Costos de envío dinámicos según ciudad de destino
export const TARIFAS_ENVIO = [
  { ciudad: 'Bucaramanga (Área Metropolitana)', costo: 4.50, tiempo: '24 horas (Transporte Refrigerado)' },
  { ciudad: 'Bogotá D.C.', costo: 8.00, tiempo: '24 a 48 horas (Empaque Térmico VIP)' },
  { ciudad: 'Medellín', costo: 8.50, tiempo: '24 a 48 horas (Empaque Térmico VIP)' },
  { ciudad: 'Cali', costo: 9.50, tiempo: '48 horas (Empaque Térmico VIP)' },
  { ciudad: 'Cartagena / Costa Atlántica', costo: 12.00, tiempo: '48 a 72 horas (Cápsula Fría Especial)' }
];

// Información de los 4 integrantes del equipo para el Footer interactivo (Modal con foto y datos básicos)
export const EQUIPO_DESARROLLO = [
  {
    id: 1,
    nombre: 'Alejandro Sanabria Zúñiga',
    rol: 'Líder de Grupo & Arquitecto Backend',
    codigo: '2240051',
    programa: 'Ingeniería de Sistemas e Informática - UIS',
    semestre: 'Sexto Semestre',
    correo: 'alejandro2240051@correo.uis.edu.co',
    telefono: '+57 315 489 2011',
    foto: fotoAlejandro,
    aportes: 'Coordinación general del proyecto ChocoArtisan, gestión del repositorio en GitHub, diseño de la arquitectura de rutas protegidas, modelo de datos y estructura de órdenes.'
  },
  {
    id: 2,
    nombre: 'Jhon Bayron Cárdenas Camacho',
    rol: 'Diseñador UI/UX & Maquetación Responsiva',
    codigo: '2244677',
    programa: 'Ingeniería de Sistemas e Informática - UIS',
    semestre: 'Sexto Semestre',
    correo: 'jhon2244677@correo.uis.edu.co',
    telefono: '+57 316 742 8830',
    foto: fotoJhon,
    aportes: 'Maquetación HTML5/CSS3 con paleta corporativa inspirada en el cacao (#3E2723, #FFF8E1, #D4AF37), diseño a tres columnas, Responsive Design y formulario de despacho.'
  },
  {
    id: 3,
    nombre: 'Jesús David Parada Palencia',
    rol: 'Desarrollador Frontend React & Carrito Dinámico',
    codigo: '2240090',
    programa: 'Ingeniería de Sistemas e Informática - UIS',
    semestre: 'Sexto Semestre',
    correo: 'jesus2240090@correo.uis.edu.co',
    telefono: '+57 318 591 4402',
    foto: fotoJesus,
    aportes: 'Desarrollo de componentes interactivos en React, lógica del Carrito de Compras en tiempo real, cálculo automatizado de Subtotal, IVA (19%), envío dinámico y cupones.'
  },
  {
    id: 4,
    nombre: 'Deissy Liliana Romero Prada',
    rol: 'Especialista en Seguridad, Captcha & Configurador 3D/2D',
    codigo: '2235603',
    programa: 'Ingeniería de Sistemas e Informática - UIS',
    semestre: 'Sexto Semestre',
    correo: 'deissy2235603@correo.uis.edu.co',
    telefono: '+57 317 620 9155',
    foto: fotoDeissy,
    aportes: 'Implementación del módulo de Registro de Clientes con validación de complejidad de contraseñas, filtro Captcha anti-bots y el configurador novedoso "Crea tu Caja de Chocolates Personalizada".'
  }
];
