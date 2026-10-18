import { useState, useEffect } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react'; 
import { ServicioArticulos } from '../service/ServicioArticulos.jsx'; 
import BotonAgregar from '/src/componentes/boton_agregar/BotonAgregar.jsx'; 

const ListaDeArticulos = () => {
    const [articulos, setArticulos] = useState([]);
    const [cargando, setCargando] = useState(true); 
    const [error, setError] = useState(null);

    const [idEditando, setIdEditando] = useState(null);
    const [descripcionEditando, setDescripcionEditando] = useState('');
    const [precioEditando, setPrecioEditando] = useState('');

    useEffect(() => {
        ServicioArticulos.obtenerArticulos()
            .then(data => {
                setArticulos(data);
                setCargando(false);
            })
            .catch(err => {
                setError(err.message);
                setCargando(false);
            });
    }, []);

    const iniciarEdicion = (articulo) => {
        setIdEditando(articulo.id);
        setDescripcionEditando(articulo.descripcion || '');
        setPrecioEditando(articulo.precioUnitario || '');
    };

    const cancelarEdicion = () => {
        setIdEditando(null);
        setDescripcionEditando('');
        setPrecioEditando('');
    };

    const guardarEdicion = (id) => {
        const precioNumerico = parseFloat(precioEditando) || 0;
        ServicioArticulos.actualizarArticulo(id, descripcionEditando, precioNumerico)
            .then(() => {
                setArticulos(articulos.map(art => 
                    art.id === id 
                        ? { ...art, descripcion: descripcionEditando, precioUnitario: precioNumerico } 
                        : art
                ));
                cancelarEdicion();
            })
            .catch(err => alert('⚠️ ' + err.message));
    };

    const eliminarArticulo = (id) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar este artículo?')) return;
        ServicioArticulos.eliminarArticulo(id)
            .then(() => {
                setArticulos(articulos.filter(art => art.id !== id));
            })
            .catch(err => alert('⚠️ ' + err.message));
    };

    if (cargando) return <div className="text-center p-4">Cargando artículos...</div>;
    if (error) return <div className="text-center text-red-500 p-4">⚠️ {error}</div>;

    return (
        <div className="max-w-xl mx-auto bg-gray-50 min-h-screen p-4 flex flex-col justify-between">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col flex-1">
                
                {/* Encabezado Superior */}
                <div className="bg-cyan-800 border-b border-gray-200 px-4 py-3 flex items-center justify-around sticky top-0 z-10">
                    <button type="button" className="text-white hover:text-gray-200 text-xl font-bold">←</button>
                    <h1 className="text-lg font-semibold text-white">Lista de Artículos</h1>
                    <div className="w-5"></div>
                </div>

                {/* Cuerpo de la Lista */}
                <div className="flex-1 overflow-y-auto mb-16"> 
                    {articulos.map((articulo, index) => {
                        const estaEditando = idEditando === articulo.id;
                        return (
                            <div
                                key={articulo.id}
                                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 transition-colors ${
                                    index !== articulos.length - 1 ? 'border-b border-gray-100' : ''
                                } ${estaEditando ? 'bg-cyan-50/50' : 'hover:bg-gray-50'}`}
                            >
                                {estaEditando ? (
                                    <div className="flex-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 mr-2">
                                        <input 
                                            type="text"
                                            value={descripcionEditando}
                                            onChange={(e) => setDescripcionEditando(e.target.value)}
                                            className="flex-1 text-sm border rounded px-2 py-1 focus:ring-1 focus:ring-cyan-500 focus:outline-none font-medium text-gray-800"
                                        />
                                        <div className="flex items-center border rounded bg-white px-2 py-1 w-28">
                                            <span className="text-gray-400 text-sm">\$</span>
                                            <input 
                                                type="number"
                                                step="0.01"
                                                value={precioEditando}
                                                onChange={(e) => setPrecioEditando(e.target.value)}
                                                className="w-full text-sm font-medium text-gray-700 focus:outline-none pl-1"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col flex-1 min-w-0 pr-4">
                                        <h5 className='text-xl font-semibold text-gray-900'>
                                            {articulo.nombre || articulo.descripcion}
                                        </h5>
                                        <span className="text-gray-500 text-sm font-normal max-w-[90%] leading-tight mt-1 truncate">
                                            {articulo.descripcion}
                                        </span>
                                        <span className="text-cyan-700 text-sm font-semibold mt-1">
                                            ${articulo.precio}
                                        </span>
                                    </div>
                                )}

                                <div className="flex items-center justify-end gap-3 mt-2 sm:mt-0">
                                    {estaEditando ? (
                                        <>
                                            <button onClick={() => guardarEdicion(articulo.id)} className="p-1 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors">
                                                <Check className="w-4 h-4" />
                                            </button>
                                            <button onClick={cancelarEdicion} className="p-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => iniciarEdicion(articulo)} className="p-1 text-gray-400 hover:text-cyan-600 rounded hover:bg-gray-100 transition-colors">
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => eliminarArticulo(articulo.id)} className="p-1 text-gray-400 hover:text-red-600 rounded hover:bg-gray-100 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 📌 Contenedor del Botón en la parte inferior de la lista */}
                <div className="contenedor-boton-inferior">
                    <BotonAgregar className="btn-flotante" tipo='crearArticulo' />
                </div>

            </div>
        </div>
    );
};

export default ListaDeArticulos;
