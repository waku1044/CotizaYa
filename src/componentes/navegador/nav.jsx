import { useNavigate, useLocation } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Detecta en qué página estás para iluminar el icono activo

  // Función de navegación basada en la pestaña clickeada
  const navegarA = (ruta) => {
    switch (ruta) {
      case 'factura':
        navigate('/facturas');
        break;
      case 'presupuesto':
        navigate('/presupuestos');
        break;
      case 'cliente':
        navigate('/clientes');
        break;
      case 'articulo':
        navigate('/articulos');
        break;
      default:
        navigate('/');
    }
  };

  // Función auxiliar para saber si el botón está activo (compara la URL actual)
  const estaActivo = (path) => location.pathname.startsWith(path);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-xl mx-auto bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        
        {/* BOTÓN FACTURAS */}
        <button
          onClick={() => navegarA('factura')}
          className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
            estaActivo('/facturas') ? 'text-cyan-700 font-semibold' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          <span className="text-[11px]">Facturas</span>
        </button>

        {/* BOTÓN PRESUPUESTOS */}
        <button
          onClick={() => navegarA('presupuesto')}
          className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
            estaActivo('/presupuestos') ? 'text-cyan-700 font-semibold' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.375M9 18h3.375m-6.375 3h15a2.25 2.25 0 0 0 2.25-2.25V5.25A2.25 2.25 0 0 0 17.625 3h-12A2.25 2.25 0 0 0 3.25 5.25v13.5A2.25 2.25 0 0 0 5.5 21Z" />
          </svg>
          <span className="text-[11px]">Presupuestos</span>
        </button>

        {/* BOTÓN CLIENTES */}
        <button
          onClick={() => navegarA('cliente')}
          className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
            estaActivo('/clientes') ? 'text-cyan-700 font-semibold' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-2.533-3.076l-1.408-.39m-4.783 4.418A9.043 9.043 0 0 1 12 15.75c1.49 0 2.89.36 4.128.997m-4.128-4.418V9.375c0-.621.504-1.125 1.125-1.125h1.25c.621 0 1.125.504 1.125 1.125v3.5m-7.5 4v-3.5c0-.621.504-1.125 1.125-1.125h1.25c.621 0 1.125.504 1.125 1.125v3.5m7.5-4h-7.5" />
          </svg>
          <span className="text-[11px]">Clientes</span>
        </button>

        {/* BOTÓN ARTÍCULOS */}
        <button
          onClick={() => navegarA('articulo')}
          className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
            estaActivo('/articulos') ? 'text-cyan-700 font-semibold' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
          <span className="text-[11px]">Artículos</span>
        </button>

      </div>
    </nav>
  );
};

export default Nav;
