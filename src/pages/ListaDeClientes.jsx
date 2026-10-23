import BotonAgregar from "../componentes/boton_agregar/BotonAgregar";
import { useState, useEffect } from 'react';
import { ServicioClientes } from "../service/ServicioClientes";
import { Pencil, Trash2 } from 'lucide-react';
import CardCliente from '../componentes/CardCliente'

const ListaDeClientes = () => {


    const [clientes, setClientes] = useState([]);


    useEffect(() => {
        ServicioClientes.obtenerClientes()
            .then(data => {
                setClientes(data);
                console.log(clientes)
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [clientes]);

    return (
       <div className="max-w-xl mx-auto bg-gray-50 min-h-screen p-4 flex flex-col justify-between">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col flex-1">
                
                {/* Encabezado Superior */}
                <div className="bg-cyan-800 border-b border-gray-200 px-4 py-3 flex items-center justify-around sticky top-0 z-10">
                    
                    <h1 className="text-lg font-semibold text-white">Lista de Clientes</h1>
                    <div className="w-5"></div>
                </div>
                <div className="flex-1 overflow-y-auto mb-16">

                    { clientes.map((cliente) =>{
                        return (
                            <CardCliente cliente={cliente}/>
                                

                        )
                    }) }
                        
                                {/* 📌 Contenedor del Botón en la parte inferior de la lista */}
                            <div className="contenedor-boton-inferior">
                                <BotonAgregar className="btn-flotante" tipo='crearCliente' />
                            </div>
                
                        </div>
                </div>
            </div>
    );
};

export default ListaDeClientes;
