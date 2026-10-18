import BotonAgregar from "../componentes/boton_agregar/BotonAgregar";



const ListaDeClientes = ()=>{
    return(
        <div className="max-w-xl mx-auto bg-gray-50 min-h-screen p-4 flex flex-col justify-between">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col flex-1">
        {/* Encabezado Superior */}
                <div className="bg-cyan-800 border-b border-gray-200 px-4 py-3 flex items-center justify-around sticky top-0 z-10">
                    <button type="button" className="text-white hover:text-gray-200 text-xl font-bold">←</button>
                    <h1 className="text-lg font-semibold text-white">Lista de Clientes</h1>
                    <div className="w-5">

                    {/* 📌 Contenedor del Botón en la parte inferior de la lista */}
                            <div className="contenedor-boton-inferior">
                                <BotonAgregar className="btn-flotante" tipo='crearCliente' />
                            </div>
                    </div>
                </div>



            
            </div>
        </div>
            );
};

export default ListaDeClientes;