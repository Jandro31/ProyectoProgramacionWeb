const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const db = require('./config/db'); // Importación de la conexión a MySQL

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Servidor de contenidos estáticos para imágenes de Bucaramanga y área metropolitana
app.use('/public', express.static(path.join(__dirname, 'public')));

// Rutas de autenticación (Login, Registro y CRUD de usuarios)
app.use('/api/auth', authRoutes);

// Endpoint de ChocoBot impulsado por Groq (GPT-OSS 20B - Activo y Gratuito)
app.post('/api/chat-gemini', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "El mensaje es requerido" });
  }

  try {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [
          {
            role: 'system',
            content: 'Eres ChocoBot, un sumiller virtual experto en chocolatería artesanal colombiana y en la marca ChocoArtisan de Bucaramanga. Responde de forma amable, gourmet, breve y persuasiva.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7
      })
    });

    const data = await groqResponse.json();

    if (data.error) {
      console.error("Detalle del error devuelto por la API de Groq:", data.error);
      return res.status(400).json({ error: data.error.message || 'Error en la API de Groq' });
    }

    const reply = data.choices[0].message.content;
    return res.json({ reply });

  } catch (error) {
    console.error("Error de conexión con Groq:", error);
    
    // Respaldo inteligente local por seguridad ante cualquier fallo de red
    const msg = message.toLowerCase();
    let fallbackReply = "¡Hola! Como sumiller virtual de ChocoArtisan en Bucaramanga, te cuento que elaboramos chocolates finos con cacao colombiano. ¿Te gustaría conocer nuestras colecciones?";
    
    if (msg.includes('recomiendas') || msg.includes('chocolate') || msg.includes('catalogo') || msg.includes('comprar')) {
      fallbackReply = "¡Te recomiendo nuestras exclusivas Trufas de Cacao de Origen 70% y las cajas personalizadas gourmet! Son elaboradas artesanalmente en Bucaramanga.";
    } else if (msg.includes('bucaramanga') || msg.includes('ubicacion') || msg.includes('tienda') || msg.includes('donde')) {
      fallbackReply = "Nuestra sede principal y taller de chocolatería artesanal se encuentra en Bucaramanga, Santander. Hacemos envíos locales con total frescura.";
    } else if (msg.includes('precio') || msg.includes('cuesta') || msg.includes('valor')) {
      fallbackReply = "Nuestras barras artesanales oscilan entre $15.000 y $28.000 COP, y las cajas gourmet varían según los chocolates que elijas.";
    }

    return res.json({ reply: fallbackReply });
  }
});

// Función para asegurar la existencia del Administrador por defecto al iniciar
const asegurarAdminPorDefecto = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE usuario = ?', ['admin']);
    if (rows.length === 0) {
      await db.query(
        'INSERT INTO usuarios (usuario, password, rol) VALUES (?, ?, ?)',
        ['admin', 'admin123', 'admin']
      );
      console.log('🛡️ [AUTO-SETUP] Usuario administrador absoluto ("admin" / "admin123") creado automáticamente.');
    } else {
      console.log('🛡️ [AUTO-SETUP] El usuario administrador ya se encuentra registrado en la BD.');
    }
  } catch (error) {
    console.error('⚠️ [AUTO-SETUP] No se pudo verificar/crear el admin automático (¿La tabla usuarios existe?):', error.message);
  }
};

app.listen(PORT, async () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
  await asegurarAdminPorDefecto();
});