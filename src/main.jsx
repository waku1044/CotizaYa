import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; // <-- Esto debe importar App, no LayoutPrincipal
import './index.css'; // Tus estilos de Tailwind

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
