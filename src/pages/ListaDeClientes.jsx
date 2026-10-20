import BotonAgregar from "../componentes/boton_agregar/BotonAgregar";
import { useState, useEffect } from 'react';
import { ServicioClientes } from "../service/ServicioClientes";
import { Pencil, Trash2, Check, X } from 'lucide-react';

const ListaDeClientes = () => {
const [clientes, setClientes] = useState([]);

    useEffect(() => {
        ServicioClientes.obtenerClientes()
            .then(data => {
                setClientes(data);
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
       <div className="max-w-xl mx-auto bg-gray-50 min-h-screen p-4 flex flex-col justify-between">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col flex-1">
                
                {/* Encabezado Superior */}
                <div className="bg-cyan-800 border-b border-gray-200 px-4 py-3 flex items-center justify-around sticky top-0 z-10">
                    
                    <h1 className="text-lg font-semibold text-white">Lista de Clientes</h1>
                    <div className="w-5"></div>
                </div>
            <div className="flex-1 overflow-y-auto mb-16">

                {clientes.map((cliente, index) => {
    return (
        <div 
            key={cliente.id || index} 
            className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
        >
            {/* Línea decorativa superior sutil */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-600 to-cyan-700"></div>

            {/* Fila Principal: Avatar y Nombre */}
            <div className="flex items-center gap-4 mt-2">
                {/* Avatar con inicial */}
                <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-700 font-bold text-lg uppercase shadow-inner shrink-0">
                    {cliente.nombre ? cliente.nombre.charAt(0) : '?'}
                </div>
                
                {/* Nombre e información secundaria */}
                <div className="overflow-hidden">
                    <h3 className="font-bold text-slate-800 text-base group-hover:text-cyan-800 transition-colors truncate">
                        {cliente.nombre}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                        Activo
                    </span>
                </div>
            </div>

            {/* Fila Inferior: Botones de Acción (Editar / Eliminar) */}
            <div className="mt-5 pt-3 border-t border-slate-50 flex items-center justify-between gap-2">
                <button className="flex-1 py-2 px-3 bg-slate-50 hover:bg-cyan-800 text-slate-600 hover:text-white font-semibold text-xs rounded-xl transition-all duration-200 text-center">
                    Ver Detalles
                </button>
                
                {/* Botón Editar (Descomentar Lucide si usás Pencil) */}
                <button className="p-2 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-xl transition-colors" title="Editar">
                    <span className="text-xs font-medium">Editar</span>
                    <Pencil className="w-4 h-4" /> 
                </button>

                {/* Botón Eliminar (Descomentar Lucide si usás Trash2) */}
                <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors" title="Eliminar">
                    {//<span className="text-xs font-medium">Borrar</span>}
                     <Trash2 className="w-4 h-4" /> 
                </button>
            </div>
        </div>
    );
})}


            </div>

            {/* 📌 Contenedor del Botón Flotante Fijo abajo a la derecha */}
            <div className="fixed bottom-6 right-6 z-50 unique-btn-container">
                <BotonAgregar className="btn-flotante shadow-lg" tipo='crearCliente' />
            </div>

        </div>
        </div>
    );
};

export default ListaDeClientes;
