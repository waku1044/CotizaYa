import { useState } from 'react';
import { ServicioArticulos } from '../service/ServicioArticulos.jsx'; 
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';


export default function CrearArticulo() {
  const [articulo, setArticulo] = useState({
    nombre: '', descripcion: '', precio: ''
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);  
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    setServerError(null);

    // 1. Validaciones locales del Frontend
    if (!articulo.nombre.trim() || !articulo.precio || parseFloat(articulo.precio) < 0) {
      setErrors({
        nombre: !articulo.nombre.trim() ? 'Campo obligatorio' : null,
        precio: !articulo.precio ? 'Campo obligatorio' : parseFloat(articulo.precio) < 0 ? 'Debe ser mayor o igual a 0' : null,
      });
      return;
    }

    setLoading(true);

    try {
      // ✨ SOLUCIÓN: Creamos un objeto directo con los datos listos
      const datosAEnviar = {
        nombre: articulo.nombre.trim(),
        descripcion: articulo.descripcion.trim(),
        precio: parseFloat(articulo.precio)
      };

      // ✨ SOLUCIÓN: Pasamos el objeto limpio y usamos 'await'
      await ServicioArticulos.guardarArticulo(datosAEnviar);       
        
      alert("Artículo añadido al catálogo de Waltech correctamente.");
    
      setErrors({});
      setArticulo({ nombre: '', descripcion: '', precio: '' });

    } catch (err) {
      console.error("Error al guardar:", err);
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-slate-50 min-h-screen pb-24 shadow-md sm:border sm:border-gray-100 sm:rounded-2xl sm:my-4 overflow-hidden">
      {/* Header / Navbar */}
      <div className="bg-cyan-800 px-5 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm border-b border-cyan-900">
        <button 
          type="button" 
          onClick={() => navigate(-1)}
          className="text-white hover:bg-cyan-700/50 p-2 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-white tracking-wide">Añadir Artículo</h1>
        
        <button 
          onClick={handleSave} 
          disabled={loading}
          className={`p-2 rounded-full transition-all ${
            loading 
              ? 'text-cyan-600 animate-pulse' 
              : 'text-emerald-400 hover:bg-cyan-700/50 hover:text-emerald-300 active:scale-90'
          }`}
        >
          {loading ? (
            <span className="text-sm font-bold text-white">...</span>
          ) : (
            <Check className="w-6 h-6 stroke-[3]" />
          )}
        </button>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSave} className="p-6 space-y-6">
        {/* Banner de error del servidor */}
        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-3 animate-fade-in">
            <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="text-sm font-medium">{serverError}</div>
          </div>
        )}

        {/* Nombre */}
        <div className="space-y-1.5">
          <label className={`block text-xs font-semibold uppercase tracking-wider ${errors.nombre ? 'text-red-600' : 'text-slate-500'}`}>
            Nombre del artículo
          </label>
          <input 
            type="text" 
            placeholder="Ej. Cafetera Espresso Italiana" 
            value={articulo.nombre} 
            onChange={(e)=>setArticulo({...articulo, nombre: e.target.value})} 
            className={`w-full text-sm px-4 py-3 rounded-xl border bg-white transition-all duration-200 focus:outline-none focus:ring-4 ${
              errors.nombre 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-50' 
                : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-50 text-slate-800'
            }`} 
          />
          {errors.nombre && (
            <p className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
              ⚠️ {errors.nombre}
            </p>
          )}
        </div>

        {/* Descripción */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Descripción detallada
          </label>
          <textarea 
            rows="3" 
            placeholder="Describe las características principales del artículo..." 
            value={articulo.descripcion} 
            onChange={(e)=>setArticulo({...articulo, descripcion: e.target.value})} 
            className="w-full text-sm px-4 py-3 rounded-xl border border-slate-200 bg-white transition-all duration-200 focus:outline-none focus:ring-4 focus:border-emerald-500 focus:ring-emerald-50 text-slate-800 resize-none" 
          />
        </div>

        {/* Precio */}
        <div className="space-y-1.5">
          <label className={`block text-xs font-semibold uppercase tracking-wider ${errors.precio ? 'text-red-600' : 'text-slate-500'}`}>
            Precio de venta
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 text-sm font-medium pointer-events-none">
              $
            </span>
            <input 
              type="number" 
              step="0.01" 
              placeholder="0.00" 
              value={articulo.precio} 
              onChange={(e)=>setArticulo({...articulo, precio: e.target.value})} 
              className={`w-full text-sm pl-8 pr-4 py-3 rounded-xl border bg-white transition-all duration-200 focus:outline-none focus:ring-4 ${
                errors.precio 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-50' 
                  : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-50 text-slate-800'
              }`} 
            />
          </div>
          {errors.precio && (
            <p className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
              ⚠️ {errors.precio}
            </p>
          )}
        </div>

        {/* Botón de envío inferior */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3.5 rounded-xl text-white font-bold text-xs uppercase tracking-widest shadow-md transition-all mt-4 ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed shadow-none' 
              : 'bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] shadow-emerald-100 hover:shadow-lg'
          }`}
        >
          {loading ? 'Guardando...' : 'Guardar Articulo'}
        </button>
      </form>
    </div>
  );
}
