import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const CardCliente = ({ cliente }) => {
  // Desestructuración de las propiedades del cliente con valores por defecto
  const { 
    nombre = "", 
    direccion = "", 
    email = "", 
    telefono = "", 
    activo = true 
  } = cliente || {};

  return (
    <div className="max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      {/* Encabezado con Inicial y Estado */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
            {nombre.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{nombre}</h3>
          </div>
        </div>
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {activo ? 'Activo' : 'Inactivo'}
        </span>
      </div>

      {/* Cuerpo con Información de Contacto */}
      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
  <span className="text-gray-400">📍</span>
  <span className="truncate">{direccion}</span>
</div>

        <div className="flex items-center space-x-2">
          <span className="text-gray-400">📞</span>
          <span>{telefono}</span>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="mt-6 flex space-x-2">
        
        <button className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-center text-xs font-medium text-gray-700 transition-colors hover:border-green-200 hover:bg-green-50 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Pencil className="w-4 h-4" /> 
        </button>

        <button className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-center text-xs font-medium text-gray-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
            <Trash2 className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};

export default CardCliente;
