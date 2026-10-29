import BotonAgregar from '../componentes/boton_agregar/BotonAgregar';
import { ServicioFacturas } from '../service/ServicioFacturas';
import { useState, useEffect } from 'react';
const ListaDeFacturas = ()=>{


    const [facturas, setFacturas ] = useState([]);

useEffect(()=>{
    ServicioFacturas.obtenerFacturas()
    .then(data=>{
        console.log(data)
        setFacturas([data])
    })
    .catch(err=>{
        alert(err.message);
    })
},[])
    return(
        <div className="max-w-xl mx-auto bg-gray-50 min-h-screen p-4 flex flex-col justify-between">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col flex-1">
        {/* Encabezado Superior */}
                <div className="bg-cyan-800 border-b border-gray-200 px-4 py-3 flex items-center justify-around sticky top-0 z-10">
                    
                    <h1 className="text-lg font-semibold text-white">Lista de Facturas</h1>
                    <div className="w-5"></div>
                </div>

                    <ol>
                            {facturas.map(fac => (
                                
                                <li key={fac.id}>Total: {fac.total}</li>
                                
                            ))}
                    </ol>



            </div>
            {/* 📌 Contenedor del Botón en la parte inferior de la lista */}
                            <div className="contenedor-boton-inferior">
                                <BotonAgregar className="btn-flotante" tipo='crearFactura' />
                            </div>
        </div>
    );
};

export default ListaDeFacturas;