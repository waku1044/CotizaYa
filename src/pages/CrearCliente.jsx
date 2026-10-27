import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Building2, Phone, Mail, ArrowLeft, Check, AlertTriangle } from 'lucide-react'; // [NUEVO] Iconos modernos
import { ServicioClientes } from '../service/ServicioClientes';

export default function ClientForm() {
  const navigate = useNavigate();
  const [client, setClient] = useState({
    nombre: '', direccion: '', ciudad: '', telefono: '', email: ''
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setServerError(null);

    if (!client.nombre.trim()) {
      setErrors({ nombre: 'Este campo es obligatorio' });
      return;
    }

    setLoading(true);

    try {
      const cliente = {
        nombre: client.nombre,
        ciudad: client.ciudad,
        direccion: client.direccion,
        telefono: client.telefono,
        email: client.email
      }
      console.log(cliente)
      await ServicioClientes.guardarCliente(cliente);
      

      alert("Cliente registrado exitosamente en Waltech.");
      setClient({
        nombre: '',  direccion: '', ciudad: '', telefono: '', email: ''
      });
      setErrors({});

    } catch (err) {
      console.error("Error al guardar cliente:", err);
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-slate-50 min-h-screen pb-24 shadow-md sm:border sm:border-gray-100 sm:rounded-2xl sm:my-4 overflow-hidden">
      
      {/* Header Superior Estilo App Premium */}
      <div className="bg-cyan-800 px-5 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm border-b border-cyan-900">
        <button 
          type="button" 
          onClick={() => navigate(-1)}
          className="text-white hover:bg-cyan-700/50 p-2 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-white tracking-wide">Añadir Cliente</h1>
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
            <span className="text-sm font-bold">...</span>
          ) : (
            <Check className="w-6 h-6 stroke-[3]" />
          )}
        </button>
      </div>

      <form onSubmit={handleSave} className="p-5 space-y-5 bg-white m-4 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Banner de error del servidor elegante */}
        {serverError && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded-r-xl text-sm font-medium flex items-center gap-2 animate-fade-in">
            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        {/* Input: Nombre Obligatorio */}
        <div className="relative">
          <div className={`flex items-center border rounded-xl px-3 py-2.5 bg-gray-50/50 transition-all focus-within:bg-white focus-within:ring-2 ${
            errors.nombre 
              ? 'border-red-400 focus-within:ring-red-100 focus-within:border-red-500' 
              : 'border-gray-200 focus-within:ring-cyan-100 focus-within:border-cyan-600'
          }`}>
            <User className={`w-5 h-5 mr-3 shrink-0 ${errors.nombre ? 'text-red-400' : 'text-gray-400'}`} />
            <div className="flex-1">
              <label className={`block text-[10px] font-bold uppercase tracking-wider ${errors.nombre ? 'text-red-500' : 'text-gray-400'}`}>
                Nombre Completo *
              </label>
              <input 
                type="text" 
                placeholder="Ej. Juan Pérez"
                value={client.nombre}
                onChange={(e) => { setClient({...client, nombre: e.target.value}); setErrors({}); }}
                className="w-full text-sm text-gray-800 focus:outline-none pt-0.5 bg-transparent placeholder-gray-300 font-medium"
              />
            </div>
          </div>
          {errors.nombre && (
            <span className="text-xs font-semibold text-red-500 mt-1 block pl-2 animate-slide-in">
              ⚠️ {errors.nombre}
            </span>
          )}
        </div>

        {/* Input: Dirección (Corregido el error de client.ciudad a client.direccion) */}
        <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50/50 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-cyan-100 focus-within:border-cyan-600">
          <MapPin className="w-5 h-5 mr-3 text-gray-400 shrink-0" />
          <div className="flex-1">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Dirección</label>
            <input 
              type="text" 
              placeholder="Calle, Número, Piso" 
              value={client.direccion} 
              onChange={(e) => setClient({...client, direccion: e.target.value})} 
              className="w-full text-sm text-gray-800 focus:outline-none pt-0.5 bg-transparent placeholder-gray-300 font-medium" 
            />
          </div>
        </div>

        {/* Input: Ciudad */}
        <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50/50 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-cyan-100 focus-within:border-cyan-600">
          <Building2 className="w-5 h-5 mr-3 text-gray-400 shrink-0" />
          <div className="flex-1">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ciudad</label>
            <input 
              type="text" 
              placeholder="Ej. Campana" 
              value={client.ciudad} 
              onChange={(e) => setClient({...client, ciudad: e.target.value})} 
              className="w-full text-sm text-gray-800 focus:outline-none pt-0.5 bg-transparent placeholder-gray-300 font-medium" 
            />
          </div>
        </div>

        {/* Input: Teléfono */}
        <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50/50 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-cyan-100 focus-within:border-cyan-600">
          <Phone className="w-5 h-5 mr-3 text-gray-400 shrink-0" />
          <div className="flex-1">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Teléfono</label>
            <input 
              type="tel" 
              placeholder="Ej. +54 11 1234-5678" 
              value={client.telefono} 
              onChange={(e) => setClient({...client, telefono: e.target.value})} 
              className="w-full text-sm text-gray-800 focus:outline-none pt-0.5 bg-transparent placeholder-gray-300 font-medium" 
            />
          </div>
        </div>

        {/* Input: Email */}
        <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50/50 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-cyan-100 focus-within:border-cyan-600">
          <Mail className="w-5 h-5 mr-3 text-gray-400 shrink-0" />
          <div className="flex-1">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email</label>
            <input 
              type="email" 
              placeholder="correo@ejemplo.com" 
              value={client.email} 
              onChange={(e) => setClient({...client, email: e.target.value})} 
              className="w-full text-sm text-gray-800 focus:outline-none pt-0.5 bg-transparent placeholder-gray-300 font-medium" 
            />
          </div>
        </div>

        {/* Botón de envío inferior para mejorar usabilidad móvil */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3.5 rounded-xl text-white font-bold text-xs uppercase tracking-widest shadow-md transition-all mt-4 ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed shadow-none' 
              : 'bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] shadow-emerald-100 hover:shadow-lg'
          }`}
        >
          {loading ? 'Guardando...' : 'Guardar Cliente'}
        </button>
      </form>
    </div>
  );
}
