import  { useState } from 'react';

export default function ClientForm() {
  const [client, setClient] = useState({
    name: '', taxId: '', address: '', city: '', zipCode: '', province: '', country: '', phone: '', email: ''
  });

  const [errors, setErrors] = useState({});

  const handleSave = (e) => {
    e.preventDefault();
    if (!client.name.trim()) {
      setErrors({ name: 'Campo obligatorio' });
      return;
    }
    console.log("Cliente guardado:", client);
    alert("Cliente registrado exitosamente.");
  };

  return (
    <div className="max-w-xl mx-auto bg-white min-h-screen pb-12 shadow-sm border border-gray-200">
      <div className="bg-cyan-800 border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0">
        <button className="text-gray-600 text-xl font-bold">←</button>
        <h1 className="text-lg font-semibold text-gray-800">Añadir cliente</h1>
        <button onClick={handleSave} className="text-emerald-400 text-xl font-bold">✓</button>
      </div>

      <form className="p-4 space-y-4">
        <button type="button" className="w-full border-2 border-blue-500 text-blue-600 rounded-md py-2 font-medium text-sm hover:bg-blue-50 transition-colors uppercase tracking-wide">
          👤 Importar desde contactos
        </button>

        {/* Input Nombre Obligatorio */}
        <div className="relative border border-red-300 rounded px-3 py-1.5 focus-within:ring-1 focus-within:ring-red-400">
          <label className="block text-xs font-semibold text-red-500">Nombre</label>
          <input 
            type="text" 
            placeholder="Nombre"
            value={client.name}
            onChange={(e) => { setClient({...client, name: e.target.value}); setErrors({}); }}
            className="w-full text-sm text-gray-800 focus:outline-none pt-0.5"
          />
          {errors.name && <span className="text-[10px] text-red-500 absolute bottom-[-16px] left-1">{errors.name}</span>}
        </div>

        {/* Identificación Fiscal */}
        <div className="border border-gray-300 rounded px-3 py-1.5 mt-4">
          <label className="block text-xs font-medium text-gray-500">Nº de identificación fiscal</label>
          <input type="text" placeholder="NIF, RFC, CUIT, RUT, RUC, NIT, RIF" value={client.taxId} onChange={(e)=>setClient({...client, taxId: e.target.value})} className="w-full text-sm focus:outline-none" />
        </div>

        {/* Dirección */}
        <div className="border border-gray-300 rounded px-3 py-1.5">
          <label className="block text-xs font-medium text-gray-500">Dirección</label>
          <input type="text" placeholder="Dirección" value={client.address} onChange={(e)=>setClient({...client, address: e.target.value})} className="w-full text-sm focus:outline-none" />
        </div>

        {/* Fila Ciudad / Código Postal */}
        <div className="grid grid-cols-2 gap-3">
          <div className="border border-gray-300 rounded px-3 py-1.5">
            <label className="block text-xs font-medium text-gray-500">Ciudad</label>
            <input type="text" placeholder="Ciudad" value={client.city} onChange={(e)=>setClient({...client, city: e.target.value})} className="w-full text-sm focus:outline-none" />
          </div>
          <div className="border border-gray-300 rounded px-3 py-1.5">
            <label className="block text-xs font-medium text-gray-500">Código postal</label>
            <input type="text" placeholder="Código post" value={client.zipCode} onChange={(e)=>setClient({...client, zipCode: e.target.value})} className="w-full text-sm focus:outline-none" />
          </div>
        </div>

        {/* Provincia */}
        <div className="border border-gray-300 rounded px-3 py-1.5">
          <label className="block text-xs font-medium text-gray-500">Provincia</label>
          <input type="text" placeholder="Provincia" value={client.province} onChange={(e)=>setClient({...client, province: e.target.value})} className="w-full text-sm focus:outline-none" />
        </div>

        {/* País */}
        <div className="border border-gray-300 rounded px-3 py-1.5">
          <label className="block text-xs font-medium text-gray-500">País</label>
          <input type="text" placeholder="País" value={client.country} onChange={(e)=>setClient({...client, country: e.target.value})} className="w-full text-sm focus:outline-none" />
        </div>

        {/* Teléfono */}
        <div className="border border-gray-300 rounded px-3 py-1.5">
          <label className="block text-xs font-medium text-gray-500">Teléfono</label>
          <input type="tel" placeholder="Teléfono" value={client.phone} onChange={(e)=>setClient({...client, phone: e.target.value})} className="w-full text-sm focus:outline-none" />
        </div>

        {/* Email */}
        <div className="border border-gray-300 rounded px-3 py-1.5">
          <label className="block text-xs font-medium text-gray-500">Email</label>
          <input type="email" placeholder="Email" value={client.email} onChange={(e)=>setClient({...client, email: e.target.value})} className="w-full text-sm focus:outline-none" />
        </div>
      </form>
    </div>
  );
}
