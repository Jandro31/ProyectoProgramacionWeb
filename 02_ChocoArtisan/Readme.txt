================================================================================
PROYECTO DE PROGRAMACIÓN WEB — FASE I (REACT JS)
APLICATIVO: 02_ChocoArtisan (Plataforma Web Corporativa y Tienda en Línea)
UNIVERSIDAD INDUSTRIAL DE SANTANDER (UIS) — FACULTAD DE INGENIERÍA
DOCENTE: Ing. Manuel Florez
================================================================================

INTEGRANTES DEL EQUIPO (GRUPO 02):
1. Alejandro Sanabria Zúñiga (Líder de Grupo)
2. Jhon Bayron Cárdenas Camacho
3. Jesús David Parada Palencia
4. Deissy Liliana Romero Prada

--------------------------------------------------------------------------------
1. REQUISITOS PREVIOS DEL SISTEMA
--------------------------------------------------------------------------------
Para ejecutar este aplicativo React en un computador local o servidor, asegúrese
de tener instalado:
- Node.js (versión 18.0.0 o superior recomendada). Verificar con:
    node -v
- Gestor de paquetes npm (incluido con Node.js). Verificar con:
    npm -v
- Navegador web moderno (Google Chrome, Mozilla Firefox, Microsoft Edge o Safari).

--------------------------------------------------------------------------------
2. PASO A PASO PARA IMPLEMENTAR Y EJECUTAR EL APP EN EL COMPUTADOR LOCAL
--------------------------------------------------------------------------------

PASO 1: Descomprimir o ubicar la carpeta del aplicativo
Abra una terminal (Consola / PowerShell / Bash) e ingrese a la carpeta del
proyecto React:

    cd ProyectoProgramacionWeb
    (o cd 02_App / 02_ChocoArtisan según el nombre de la carpeta descomprimida)

PASO 2: Instalar las dependencias del proyecto (node_modules)
Dado que la entrega Fase-I se distribuye sin la carpeta "node_modules", ejecute
el siguiente comando para descargar e instalar automáticamente React, React Router,
React-Bootstrap y Bootstrap desde el archivo package.json:

    npm install

PASO 3: Iniciar el servidor de desarrollo local
Una vez finalizada la instalación de los paquetes, inicie el entorno de ejecución
con Vite ejecutando:

    npm run dev

PASO 4: Abrir la aplicación en el navegador
La consola mostrará una URL local (por defecto http://localhost:5173/). Abra dicha
dirección en su navegador web preferido.

--------------------------------------------------------------------------------
3. PASO A PASO PARA DESPLEGAR EN UN SERVIDOR WEB DE PRODUCCIÓN
--------------------------------------------------------------------------------

PASO 1: Generar el compilado optimizado de producción
Ejecute el comando:

    npm run build

Esto creará la carpeta "dist/" con todos los archivos HTML, CSS, JavaScript y
recursos Multimedia empaquetados y minificados.

PASO 2: Previsualizar el servidor de producción localmente (Opcional)
Puede probar la versión compilada ejecutando:

    npm run preview

PASO 3: Subir al servidor web (Apache, Nginx, Vercel, Netlify o Render)
Copie el contenido de la carpeta "dist/" al directorio público de su servidor web
(por ejemplo, /var/www/html/ en Nginx/Apache) y configure la redirección SPA hacia
index.html para el soporte de rutas de React Router.

--------------------------------------------------------------------------------
4. CREDENCIALES DE PRUEBA PARA EL MODAL DE LOGIN Y RUTAS PRIVADAS (FASE I)
--------------------------------------------------------------------------------
Para verificar la protección de rutas privadas y desplegar el "Menú de Rutas
Privadas" en la barra de navegación superior fija:

1. Haga clic en el botón dorado "Login (Admin | 1234)" ubicado en la esquina
   superior derecha de la barra de navegación fija.
2. En la ventana Modal de Bootstrap ingrese:
   - Login (Usuario): Admin
   - Passwd (Contraseña): 1234
   (También puede pulsar el botón "Autocompletar Admin | 1234").
3. Haga clic en "Verificar y Desplegar Rutas Privadas".
4. Inmediatamente aparecerá en la barra de menús el desplegable:
   "Menú Rutas Privadas", desde el cual podrá acceder a:
   - /caja-personalizada : Configurador Interactivo 3D/2D de Cajas de Bombones
   - /carrito-despacho   : Carrito de Compras Interactivo (IVA 19%, Envío, Cupones)
   - /panel-admin        : Panel Administrativo de Órdenes e Inventario

* NOTA SOBRE CUPONES PROMOCIONALES EN EL CARRITO:
  Puede utilizar cualquiera de los siguientes códigos en el carrito de compras:
  - CHOCO15 (15% de descuento)
  - DULCE20 (20% de descuento)
  - UIS25   (25% de descuento)
================================================================================
