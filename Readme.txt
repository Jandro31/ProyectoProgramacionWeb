========================================================================
         PROYECTO ACADÉMICO: CHOCOARTISAN — FASE II
     Plataforma Web Full-Stack para Chocolatería Artesanal
========================================================================

INTEGRANTES DEL EQUIPO (GRUPO 02):
1. Alejandro Sanabria Zúñiga (Líder de Grupo)
2. Jhon Bayron Cárdenas Camacho
3. Jesús David Parada Palencia
4. Deissy Liliana Romero Prada

------------------------------------------------------------------------
1. DESCRIPCIÓN GENERAL DEL SISTEMA
------------------------------------------------------------------------
ChocoArtisan es una aplicación web full-stack diseñada para la gestión 
integral de una empresa de chocolatería artesanal. Cuenta con un catálogo
interactivo, un configurador de cajas 3D/2D, un asistente virtual inteligente
(ChocoBot integrado con Groq/IA), un carrito de compras con cálculo dinámico
de IVA (19%), cupones de descuento y tarifas de envío por ciudades, además 
de un panel administrativo con rutas protegidas y control CRUD completo 
conectado a una base de datos relacional MySQL.

------------------------------------------------------------------------
2. TECNOLOGÍAS UTILIZADAS
------------------------------------------------------------------------
- Frontend: React.js, React Router, Vite, Bootstrap, React-Bootstrap.
- Backend: Node.js, Express.js, RESTful API.
- Base de Datos: MySQL (XAMPP Server).
- Inteligencia Artificial: API de Groq (Modelo GPT-OSS 20B).

------------------------------------------------------------------------
3. CREDENCIALES DE ACCESO (ADMINISTRADOR)
------------------------------------------------------------------------
El sistema cuenta con auto-aprovisionamiento de seguridad al arrancar.
- Usuario por defecto: admin
- Contraseña:          admin123
- Rol en el Sistema:   admin (Acceso total al Panel Administrativo y CRUD)

------------------------------------------------------------------------
4. INSTRUCTIVO DE INSTALACIÓN Y EJECUCIÓN (DESDE CERO O EN NUEVA PC)
------------------------------------------------------------------------

PASO A PASO PARA LEVANTAR EL PROYECTO:

1. CONFIGURACIÓN DE LA BASE DE DATOS (XAMPP):
   - Abre el panel de control de XAMPP e inicia los servicios de Apache y MySQL.
   - Abre tu navegador y accede a phpMyAdmin: http://localhost/phpmyadmin/
   - Crea una base de datos nueva con el nombre exacto: choco_artisan_db
   - Selecciona la base de datos creada, ve a la pestaña "Importar", selecciona 
     el archivo de respaldo proporcionado (`choco_artisan_db.sql`) ubicado en la 
     raíz del proyecto o carpeta de respaldos, y haz clic en "Continuar". 
     (Esto montará automáticamente las tablas de usuarios y órdenes con sus 
     datos iniciales).

2. CONFIGURACIÓN Y EJECUCIÓN DEL BACKEND:
   - Abre una terminal en la carpeta del servidor (backend).
   - Instala las dependencias necesarias ejecutando:
     npm install
   - ejecutar en phpmyadmin:
	CREATE USER IF NOT EXISTS 'un_usr'@'localhost' IDENTIFIED BY 'una_clave';
	GRANT ALL PRIVILEGES ON choco_artisan_db.* TO 'un_usr'@'localhost';
	FLUSH PRIVILEGES;
   - Inicia el servidor backend ejecutando:
     node index.js
   - El servidor correrá por defecto en: http://localhost:5000

3. CONFIGURACIÓN Y EJECUCIÓN DEL FRONTEND:
   - Abre una nueva terminal en la carpeta del cliente (frontend).
   - Instala las dependencias ejecutando:
     npm install
   - Inicia el entorno de desarrollo ejecutando:
     npm run dev
   - Abre en tu navegador el enlace local generado por Vite (ej: http://localhost:5173).

------------------------------------------------------------------------
5. MÓDULOS Y FUNCIONALIDADES PRINCIPALES (RÚBRICA FASE II)
------------------------------------------------------------------------
- [x] Estructura modular limpia separando Cliente y Servidor.
- [x] Conexión real a base de datos relacional MySQL (XAMPP).
- [x] Autenticación de usuarios y control de acceso basado en roles (RBAC).
- [x] CRUD completo de gestión de cuentas de usuario desde el panel admin.
- [x] Registro, consulta y eliminación de órdenes de compra conectadas a la BD.
- [x] Servidor de contenido estático para recursos visuales y galería.
- [x] Integración de Inteligencia Artificial (ChocoBot).
========================================================================
