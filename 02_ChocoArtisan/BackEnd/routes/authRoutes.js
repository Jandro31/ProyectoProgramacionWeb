const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const db = require('../config/db'); // Asegúrate de que esta sea la ruta de tu conexión MySQL/Pool

// Rutas de autenticación existentes
router.post('/login', authController.login);
router.post('/register', authController.register);

// --- ENDPOINTS CRUD PARA GESTIÓN DE USUARIOS (ADMIN) ---

// GET: Listar todos los usuarios
router.get('/usuarios', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, usuario, rol FROM usuarios');
    res.json({ success: true, usuarios: rows });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ success: false, message: 'Error al obtener usuarios de la base de datos' });
  }
});

// POST: Crear un nuevo usuario desde el panel admin
router.post('/usuarios', async (req, res) => {
  const { usuario, password, rol } = req.body;
  if (!usuario || !password) {
    return res.status(400).json({ success: false, message: 'Usuario y contraseña son requeridos' });
  }
  try {
    await db.query(
      'INSERT INTO usuarios (usuario, password, rol) VALUES (?, ?, ?)', 
      [usuario, password, rol || 'cliente']
    );
    res.json({ success: true, message: 'Usuario creado exitosamente' });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ success: false, message: 'Error al registrar el usuario en la BD' });
  }
});

// DELETE: Eliminar un usuario por su ID
router.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
    res.json({ success: true, message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ success: false, message: 'Error al eliminar el usuario' });
  }
});


// --- NUEVOS ENDPOINTS CRUD PARA GESTIÓN DE ÓRDENES DE COMPRA ---

// GET: Listar todas las órdenes registradas en la Base de Datos
router.get('/ordenes', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM ordenes ORDER BY id DESC');
    res.json({ success: true, ordenes: rows });
  } catch (error) {
    console.error("Error al obtener órdenes:", error);
    res.status(500).json({ success: false, message: 'Error al obtener órdenes de la base de datos' });
  }
});

// POST: Registrar una nueva orden de compra desde el carrito / despacho
router.post('/ordenes', async (req, res) => {
  const { idOrden, fecha, cliente, correo, direccion, subtotal, iva, envio, total, estado } = req.body;
  
  if (!idOrden || !cliente || !total) {
    return res.status(400).json({ success: false, message: 'Faltan datos obligatorios de la orden' });
  }

  try {
    await db.query(
      'INSERT INTO ordenes (idOrden, fecha, cliente, correo, direccion, subtotal, iva, envio, total, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [idOrden, fecha, cliente, correo, direccion, subtotal, iva, envio, total, estado || 'Despachada — Transporte Refrigerado']
    );
    res.json({ success: true, message: 'Orden registrada con éxito en la base de datos' });
  } catch (error) {
    console.error("Error al guardar la orden:", error);
    res.status(500).json({ success: false, message: 'Error al guardar la orden en la BD' });
  }
});

// DELETE: Eliminar una orden por su ID numérico de la Base de Datos
router.delete('/ordenes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM ordenes WHERE id = ?', [id]);
    res.json({ success: true, message: 'Orden eliminada correctamente' });
  } catch (error) {
    console.error("Error al eliminar orden:", error);
    res.status(500).json({ success: false, message: 'Error al eliminar la orden' });
  }
});

module.exports = router;