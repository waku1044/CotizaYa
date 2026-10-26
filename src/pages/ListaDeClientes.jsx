import BotonAgregar from "../componentes/boton_agregar/BotonAgregar";
import { useState, useEffect } from "react";
import { ServicioClientes } from "../service/ServicioClientes";
import { Pencil, Trash2, Check, X } from "lucide-react";

const ListaDeClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [idEditando, setIdEditando] = useState(null); // Corregido para controlar cuál se edita
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Estados temporales para el formulario de edición local
  const [nombreEditando, setNombreEditando] = useState("");
  const [direccionEditando, setDireccionEditando] = useState("");
  const [telefonoEditando, setTelefonoEditando] = useState("");
  const [activoEditando, setActivoEditando] = useState(true);

  useEffect(() => {
    ServicioClientes.obtenerClientes()
      .then((data) => {
        setClientes(data);
        setCargando(false);
      })
      .catch((err) => { 
        setError(err.message);
        setCargando(false);
      });
  }, []);

  // Funciones para controlar la edición
  const iniciarEdicion = (cliente) => {
    setIdEditando(cliente.id);
    setNombreEditando(cliente.nombre || "");
    setDireccionEditando(cliente.direccion || "");
    setTelefonoEditando(cliente.telefono || "");
    setActivoEditando(cliente.activo ?? true);
  };

  const cancelarEdicion = () => {
    setIdEditando(null);
  };

  const guardarEdicion = (id) => {
    const clienteActualizado = {
      id: id,
      nombre: nombreEditando,
      direccion: direccionEditando,
      telefono: telefonoEditando,
      activo: activoEditando
    };

    // Aquí llamarías a tu servicio, por ejemplo:
     ServicioClientes.actualizarCliente(id, clienteActualizado)
     .then(()=>{
       setClientes(clientes.map(c => c.id === id ? { ...c, ...clienteActualizado } : c));
       
       cancelarEdicion();
     })
     .catch(err=>{
      alert(err.message)
     })
    
  };

  const eliminarCliente = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
       ServicioClientes.eliminarCliente(id)
         .then(()=>{
           setClientes(clientes.filter((c)=> c.id !== id))
           alert('Cliente eliminado')
         })
      .catch(err=>alert(err.message))
      
    }
  };

  if(cargando)
    return <div className="text-center p-4">Cargando clientes...</div>;
  if(error)
    return <div className="text-center text-red-500 p-4">⚠️ {error}</div>;  

  return (
    <div className="max-w-xl mx-auto bg-gray-50 min-h-screen p-4 flex flex-col justify-between">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col flex-1">
        
        {/* Encabezado Superior */}
        <div className="bg-cyan-800 border-b border-gray-200 px-4 py-3 flex items-center justify-around sticky top-0 z-10">
          <h1 className="text-lg font-semibold text-white">
            Lista de Clientes
          </h1>
          <div className="w-5"></div>
        </div>

        {/* Cuerpo de la lista */}
        <div className="flex-1 overflow-y-auto mb-16 p-4 space-y-4 bg-cyan-900">
          {clientes.map((cliente, index) => {
            const estaEditando = idEditando === cliente.id;
            
            // Añadido el RETURN requerido por el .map()
            return (
              <div
                key={cliente.id || index}
                className="w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                {estaEditando ? ( 
                  /* MODO EDICIÓN */
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 border-b border-gray-100 pb-2">
                      <input 
                        type='text'
                        placeholder='Nombre'
                        value={nombreEditando}
                        onChange={(e) => setNombreEditando(e.target.value)}
                        className="w-full text-sm font-semibold text-gray-900 border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                      />
                      <label className="flex items-center text-xs space-x-1 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={activoEditando} 
                          onChange={(e) => setActivoEditando(e.target.checked)}
                        />
                        <span>Activo</span>
                      </label>
                    </div>

                    <div className="space-y-2 text-sm">
                      <input 
                        type='text'
                        placeholder='📍 Dirección'
                        value={direccionEditando}
                        onChange={(e) => setDireccionEditando(e.target.value)}
                        className="w-full text-xs border rounded px-2 py-1 focus:outline-none"
                      />
                      <input 
                        type='text'
                        placeholder='📞 Teléfono'
                        value={telefonoEditando}
                        onChange={(e) => setTelefonoEditando(e.target.value)}
                        className="w-full text-xs border rounded px-2 py-1 focus:outline-none"
                      />
                    </div>

                    {/* Botones Modo Edición */}
                    <div className="mt-4 flex space-x-2 justify-end">
                      <button 
                        onClick={() => guardarEdicion(cliente.id)}
                        className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-600"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={cancelarEdicion}
                        className="rounded-lg bg-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : ( 
                  /* MODO VISTA */
                  <>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                          {cliente.nombre ? cliente.nombre.charAt(0).toUpperCase() : "?"}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {cliente.nombre}
                          </h3>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          cliente.activo
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {cliente.activo ? "Activo" : "Inactivo"}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">📍</span>
                        <span className="truncate">{cliente.direccion || "Sin dirección"}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">📞</span>
                        <span>{cliente.telefono || "Sin teléfono"}</span>
                      </div>
                    </div> 

                    {/* Botones Modo Vista */}
                    <div className="mt-6 flex space-x-2 justify-end">
                      <button 
                        onClick={() => iniciarEdicion(cliente)}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:border-green-200 hover:bg-green-50 hover:text-green-600"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => eliminarCliente(cliente.id)}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        {/* Contenedor alineado a la izquierda para el botón de agregar */}
          <div className="fixed bottom-20 right-60 z-50 unique-btn-container">
            <BotonAgregar tipo="crearCliente" />
          </div>
        
        </div>


      </div>
    </div>
  );
};

export default ListaDeClientes;
