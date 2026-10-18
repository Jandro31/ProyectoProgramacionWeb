/**
 * @file App.jsx
 * @description Componente raíz de la plataforma web ChocoArtisan (Fase I).
 * Implementa el enrutador principal con `react-router-dom`, separando
 * estrictamente las Rutas Públicas de las Rutas Privadas mediante el guardia
 * `ProtectedRoute` para impedir accesos no autorizados por puertas traseras.
 * Gestiona el estado global del Carrito de Compras, Login Modal (Admin | 1234),
 * Registro de Clientes con Captcha y Órdenes de Despacho.
 */

import React, { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toast, ToastContainer } from 'react-bootstrap';

import NavbarChoco from './components/NavbarChoco';
import LoginModal from './components/LoginModal';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './components/HomePage';
import CatalogoPage from './components/CatalogoPage';
import NosotrosPage from './components/NosotrosPage';
import RegistroPage from './components/RegistroPage';
import CajaPersonalizadaPage from './components/CajaPersonalizadaPage';
import CarritoDespachoPage from './components/CarritoDespachoPage';
import PanelAdminPage from './components/PanelAdminPage';
import FooterChoco from './components/FooterChoco';

import { PRODUCTOS_CATALOGO } from './data/chocoData';

function App() {
  // Estado de autenticación (simulación Fase I con Admin | 1234)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [authNotice, setAuthNotice] = useState('');

  // Categoría activa del catálogo seleccionada desde el menú o la página
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  // Carrito de compras inicializado con 2 creaciones gourmet de muestra
  const [cartItems, setCartItems] = useState([
    { ...PRODUCTOS_CATALOGO[0], cantidad: 1 },
    { ...PRODUCTOS_CATALOGO[1], cantidad: 2 }
  ]);

  // Usuarios registrados en el módulo con validación de contraseña y Captcha
  const [registeredUsers, setRegisteredUsers] = useState([]);

  // Historial de órdenes procesadas en la sesión
  const [orders, setOrders] = useState([
    {
      idOrden: 'ORD-840192',
      fecha: '18/10/2026, 10:30:00 a. m.',
      cliente: 'Alejandro Sanabria Zúñiga',
      correo: 'alejandro.sanabria@correo.uis.edu.co',
      direccion: 'Carrera 27 Calle 9 UIS, Bucaramanga (CP: 680002)',
      subtotal: 61.99,
      descuento: 0,
      iva: 11.78,
      envio: 4.50,
      total: 78.27,
      estado: 'Despachada — Transporte Refrigerado'
    }
  ]);

  // Notificación flotante al añadir productos al carrito
  const [toastMsg, setToastMsg] = useState('');

  // Abre el Modal de Login con un mensaje opcional (ej: bloqueo de puerta trasera)
  const handleOpenLoginModal = useCallback((notice = '') => {
    setAuthNotice(notice);
    setShowLoginModal(true);
  }, []);

  // Se ejecuta cuando el usuario ingresa credenciales válidas (Ej: Admin | 1234)
  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
    setShowLoginModal(false);
    setAuthNotice('');
    setToastMsg(
      `🔓 ¡Bienvenido, ${userData.username}! Se ha desplegado el Menú de Rutas Privadas en la barra superior.`
    );
  };

  // Cierra la sesión actual y oculta las rutas privadas
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setToastMsg('🔒 Sesión finalizada. Las rutas privadas han sido protegidas.');
  };

  // Añade un producto o caja personalizada al carrito de compras
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...product, cantidad: 1 }];
    });
    setToastMsg(`🍫 "${product.nombre}" añadido al Carrito de Compras.`);
  };

  // Actualiza la cantidad de un ítem en el carrito en tiempo real
  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, cantidad: newQty } : item
      )
    );
  };

  // Elimina un producto del carrito
  const handleRemoveItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // Vacía el carrito tras confirmar una orden
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Registra un nuevo cliente verificado con Captcha
  const handleRegisterUser = (newUser) => {
    setRegisteredUsers((prev) => [...prev, newUser]);
  };

  // Registra una nueva orden confirmada
  const handleRegisterOrder = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <BrowserRouter>
      {/* Barra de Navegación Fija independiente de la página invocada */}
      <NavbarChoco
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
        cartCount={totalCartCount}
        onOpenLoginModal={handleOpenLoginModal}
        onLogout={handleLogout}
        onSelectCategory={setSelectedCategory}
      />

      {/* Contenido Principal con Enrutamiento Público y Privado */}
      <main>
        <Routes>
          {/* ================= RUTAS PÚBLICAS ================= */}
          <Route
            path="/"
            element={
              <HomePage
                onAddToCart={handleAddToCart}
                isAuthenticated={isAuthenticated}
                onOpenLoginModal={handleOpenLoginModal}
              />
            }
          />
          <Route
            path="/catalogo"
            element={
              <CatalogoPage
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route
            path="/registro"
            element={
              <RegistroPage
                onRegisterUser={handleRegisterUser}
                onOpenLoginModal={handleOpenLoginModal}
              />
            }
          />

          {/* ================= RUTAS PRIVADAS (SIN PUERTAS TRASERAS) ================= */}
          <Route
            path="/caja-personalizada"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                onRequireLogin={handleOpenLoginModal}
              >
                <CajaPersonalizadaPage onAddToCart={handleAddToCart} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/carrito-despacho"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                onRequireLogin={handleOpenLoginModal}
              >
                <CarritoDespachoPage
                  cartItems={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onClearCart={handleClearCart}
                  onRegisterOrder={handleRegisterOrder}
                  currentUser={currentUser}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/panel-admin"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                onRequireLogin={handleOpenLoginModal}
              >
                <PanelAdminPage
                  currentUser={currentUser}
                  orders={orders}
                  registeredUsers={registeredUsers}
                />
              </ProtectedRoute>
            }
          />

          {/* Cualquier URL desconocida o intento inválido redirige a la portada */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Modal de Login con patrón usuario: Admin | passwd: 1234 */}
      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
        authNotice={authNotice}
        registeredUsers={registeredUsers}
      />

      {/* Notificaciones flotantes de retroalimentación visual */}
      <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 1080 }}>
        <Toast
          show={Boolean(toastMsg)}
          onClose={() => setToastMsg('')}
          delay={3800}
          autohide
          bg="dark"
        >
          <Toast.Header
            style={{ backgroundColor: '#3E2723', color: '#D4AF37' }}
          >
            <strong className="me-auto">ChocoArtisan Boutique</strong>
            <small>Ahora</small>
          </Toast.Header>
          <Toast.Body className="text-light">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Pie de Página con Contáctenos (4 integrantes con Modal + Foto) y Redes Sociales */}
      <FooterChoco />
    </BrowserRouter>
  );
}

export default App;
