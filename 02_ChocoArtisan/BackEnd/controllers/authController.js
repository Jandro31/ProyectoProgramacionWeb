const db = require('../config/db');

exports.login = async (req, res) => {
  const { usuario, password } = req.body;
  try {
    const [rows] = await db.query(
      'SELECT * FROM usuarios WHERE usuario = ? AND password = ?',
      [usuario, password]
    );
    if (rows.length > 0) {
      res.json({
        success: true,
        message: 'Login exitoso',
        user: { id: rows[0].id, usuario: rows[0].usuario, rol: rows[0].rol }
      });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.register = async (req, res) => {
  const { nombre, username, email, password, fechaRegistro } = req.body;
  
  try {
    const query = `
      INSERT INTO usuarios (nombre, usuario, email, password, fecha_registro) 
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const [result] = await db.query(query, [nombre, username, email, password, fechaRegistro]);

    res.status(201).json({ 
      success: true, 
      message: 'Usuario registrado exitosamente',
      userId: result.insertId 
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error en el servidor al registrar el usuario: ' + error.message 
    });
  }
};