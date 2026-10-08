import { useState, useEffect } from 'react';
import { ChevronRight, Pencil, Trash2, Check, X } from 'lucide-react'; 

const ListaDeArticulos = () => {
    const [articulos, setArticulos] = useState([]);
    const [cargando, setCargando] = useState(true); 
    const [error, setError] = useState(null);

    // 📝 NUEVO: Estados para controlar qué artículo se está editando y sus valores temporales
    const [idEditando, setIdEditando] = useState(null);
    const [descripcionEditando, setDescripcionEditando] = useState('');
    const [precioEditando, setPrecioEditando] = useState('');

    // Obtener artículos del backend
    useEffect(() => {
        fetch('http://localhost:3000/api/articulos')
        .then(response => {
            if (!response.ok) throw new Error('Error al traer los artículos.');
            return response.json(); 
        })
        .then(data => {
            setArticulos(data);
            setCargando(false);
            console.log(data)
        })
        .catch(err => {
            console.error(err);
            setError(err.message);
            setCargando(false);
        });
    }, []);

    // 🎬 NUEVO: Activar el modo edición guardando los valores actuales en el estado temporal
    const iniciarEdicion = (articulo) => {
        setIdEditando(articulo.id);
        setDescripcionEditando(articulo.descripcion);
        setPrecioEditando(articulo.precioUnitario);
    };

    // ❌ NUEVO: Cancelar edición limpia los estados
    const cancelarEdicion = () => {
        setIdEditando(null);
        setDescripcionEditando('');
        setPrecioEditando('');
    };

    // 💾 NUEVO: Petición PUT para guardar los cambios en el backend
    const guardarEdicion = (id) => {
        const precioNumerico = parseFloat(precioEditando) || 0;

        fetch(`http://localhost:3000/api/modificarArticulo/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                descripcion: descripcionEditando,
                precioUnitario: precioNumerico
            })
        })
        .then(response => {
            if (!response.ok) throw new Error('No se pudo actualizar el artículo.');
            return response.json();
        })
        .then(() => {
            // Actualizar la lista en el estado local sin recargar la página
            setArticulos(articulos.map(art => 
                art.id === id 
                    ? { ...art, descripcion: descripcionEditando, precioUnitario: precioNumerico } 
                    : art
            ));
            cancelarEdicion();
        })
        .catch(err => {
            console.error(err);
            alert('⚠️ Error al actualizar: ' + err.message);
        });
    };

    // 🗑️ NUEVO: Petición DELETE para eliminar el artículo del backend
    const eliminarArticulo = (id) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar este artículo?')) return;

        fetch(`http://localhost:3000/api/eliminarArticulo/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) throw new Error('No se pudo eliminar el artículo.');
            // Filtrar el estado local para removerlo visualmente de inmediato
            setArticulos(articulos.filter(art => art.id !== id));
        })
        .catch(err => {
            console.error(err);
            alert('⚠️ Error al eliminar: ' + err.message);
        });
    };

    if (cargando) return <div className="text-center p-4">Cargando artículos...</div>;
    if (error) return <div className="text-center text-red-500 p-4">⚠️ {error}</div>;

    return (
        <div className="max-w-xl mx-auto bg-gray-50 min-h-screen p-4">
            <div className="bg-cyan-800 border-b border-gray-200 px-4 py-3 flex items-center justify-around sticky top-0 z-10 rounded-t-lg">
                <button type="button" className="text-white hover:text-gray-200 text-xl font-bold">←</button>
                <h1 className="text-lg font-semibold text-white">Lista de Artículos</h1>
                <div className="w-5"></div> {/* Espaciador para centrar el título */}
            </div>

            <div className="bg-white rounded-b-lg shadow-sm border border-gray-100 overflow-hidden">
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
                                /* 🔄 FORMULARIO DE EDICIÓN EN LÍNEA */
                                <div className="flex-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 mr-2">
                                    <input 
                                        type="text"
                                        value={descripcionEditando}
                                        onChange={(e) => setDescripcionEditando(e.target.value)}
                                        className="flex-1 text-sm border rounded px-2 py-1 focus:ring-1 focus:ring-cyan-500 focus:outline-none font-medium text-gray-800"
                                        placeholder="Descripción"
                                    />
                                    <div className="flex items-center border rounded bg-white px-2 py-1 w-28">
                                        <span className="text-gray-400 text-sm">$</span>
                                        <input 
                                            type="number"
                                            step="0.01"
                                            value={precioEditando}
                                            onChange={(e) => setPrecioEditando(e.target.value)}
                                            className="w-full text-sm font-medium text-gray-700 focus:outline-none pl-1"
                                            placeholder="Precio"
                                        />
                                    </div>
                                </div>
                            ) : (
                                /* 👁️ VISTA NORMAL DEL ARTÍCULO */
                                <div className="flex flex-col flex-1 min-w-0 pr-4">
            <h5 className='text-xl font-semibold text-gray-900'>{articulo.nombre}</h5>
            <span className="text-gray-500 text-sm font-normal max-w-[90%] leading-tight mt-1 truncate">
                {articulo.descripcion}
            </span>
        </div>
                            )}

                            {/* PANEL DE ACCIONES (ACCIONES DINÁMICAS DEPENDIENDO DEL ESTADO) */}
                            <div className="flex items-center justify-end gap-3 mt-2 sm:mt-0">
                                {estaEditando ? (
                                    <>
                                        {/* Botones modo edición */}
                                        <button 
                                            onClick={() => guardarEdicion(articulo.id)}
                                            className="p-1 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors"
                                            title="Guardar"
                                        >
                                            <Check className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={cancelarEdicion}
                                            className="p-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                                            title="Cancelar"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {/* Precio y controles modo lectura */}
                                        <span className="bg-gray-100 text-gray-600 font-semibold px-3 py-1 rounded text-sm min-w-[70px] text-center">
                                            ${typeof articulo.precioUnitario === 'number' ? articulo.precioUnitario.toFixed(2) : articulo.precioUnitario}
                                        </span>
                                        <button 
                                            onClick={() => iniciarEdicion(articulo)}
                                            className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                                            title="Editar artículo"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => eliminarArticulo(articulo.id)}
                                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                                            title="Eliminar artículo"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <ChevronRight className="text-gray-300 w-4 h-4 hidden sm:block" />
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )}

    export default ListaDeArticulos;    
