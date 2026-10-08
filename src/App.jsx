import  { useState } from 'react';
import DocumentForm from './pages/DocumentForm';
import ClientForm from './pages/ClienteForm';
import ArticleForm from './pages/ArticulosForm';
import ListaDeArticulos from './componentes/ListaDeArticulos';

export default function App() {
  // Estado para controlar la pantalla activa: 'facturas' | 'presupuestos' | 'clientes' | 'articulos'
  const [currentScreen, setCurrentScreen] = useState('facturas');

  // Renderizado condicional de las pantallas creadas
  const renderScreen = () => {
    switch (currentScreen) {
      case 'facturas':
        return <DocumentForm type="factura" />;
      case 'presupuestos':
        return <DocumentForm type="presupuesto" />;
      case 'clientes':
        return <ClientForm />;
      case 'creararticulos':
        return <ArticleForm />;
      case 'articulos':
        return <ListaDeArticulos />;
      default:
        return <DocumentForm type="factura" />;
    }
  };

  return (
    <div className="bg-cyan-800 min-h-screen font-sans">
      {/* Contenedor principal de la vista actual */}
      <div className="pb-16">
        {renderScreen()}
      </div>

      {/* 📱 Barra de Navegación Inferior Fija */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg max-w-xl mx-auto z-50">
        <div className="flex justify-around items-center h-16">
          
          {/* Botón Facturas */}
          <button 
            onClick={() => setCurrentScreen('facturas')}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
              currentScreen === 'facturas' ? 'text-blue-600 font-semibold' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className="text-xl">📄</span>
            <span className="text-[11px] mt-0.5">Facturas</span>
          </button>

          {/* Botón Presupuestos */}
          <button 
            onClick={() => setCurrentScreen('presupuestos')}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
              currentScreen === 'presupuestos' ? 'text-blue-600 font-semibold' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className="text-xl">📋</span>
            <span className="text-[11px] mt-0.5">Presupuestos</span>
          </button>

          {/* Botón Clientes */}
          <button 
            onClick={() => setCurrentScreen('clientes')}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
              currentScreen === 'clientes' ? 'text-blue-600 font-semibold' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className="text-xl">👤</span>
            <span className="text-[11px] mt-0.5">Clientes</span>
          </button>

          {/* Botón Artículos */}
          <button 
            onClick={() => setCurrentScreen('articulos')}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
              currentScreen === 'articulos' ? 'text-blue-600 font-semibold' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className="text-xl">📦</span>
            <span className="text-[11px] mt-0.5">Artículos</span>
          </button>

          {/* Botón Crear Artículos */}
          <button 
            onClick={() => setCurrentScreen('creararticulos')}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
              currentScreen === 'articulos' ? 'text-blue-600 font-semibold' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className="text-xl">📦</span>
            <span className="text-[11px] mt-0.5"> Crear Artículos</span>
          </button>

        </div>
      </nav>
    </div>
  );
}
