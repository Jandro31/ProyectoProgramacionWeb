/**
 * @file main.jsx
 * @description Punto de entrada principal de la aplicación React ChocoArtisan.
 * Importa la hoja de estilos de Bootstrap 5 y la hoja de estilos global corporativa.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
