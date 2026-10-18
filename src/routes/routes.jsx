import { Routes, Route } from 'react-router-dom';
import Layout from '../pages/LayOut/LayOut';

// 🧭 Importación de tus componentes/vistas
import ListaDeArticulos from '../pages/ListaDeArticulos';
import CrearArticulo from '../pages/CrearArticulo'; 
import ListaDeClientes from '../pages/ListaDeClientes';
import CrearCliente from '../pages/CrearCliente';
import ListaDePresupuestos from '../pages/ListaDePresupuestos';
import CrearFacPre from '../pages/CrearFacPre';
import ListaDeFacturas from '../pages/ListaDeFacturas';

const AppRouter = () => {
    return (
        <Routes>
            {/* 1. Definimos el Layout en el elemento de la Ruta Padre */}
            <Route path="/" element={<Layout />}>
                
                {/* 2. Todas tus páginas van aquí ADENTRO como rutas hijas */}
                {/* Al usar 'index', ListaDeFacturas será lo primero que se vea en el "/" */}
                <Route index  element={<ListaDeFacturas />} />

                {/* 📦 Rutas de Artículos */}
                <Route path="articulos" element={<ListaDeArticulos />} />
                <Route path="articulos/nuevo" element={<CrearArticulo />} />

                {/* 👥 Rutas de Clientes */}
                <Route path="clientes" element={<ListaDeClientes />} />
                <Route path="clientes/nuevo" element={<CrearCliente />} />

                {/* 📝 Rutas de Presupuestos */}
                <Route index path="presupuestos" element={<ListaDePresupuestos />} />
                <Route path="presupuestos/nuevo" element={<CrearFacPre type='presupuesto' />} />

                {/* 🧾 Rutas de Facturas */}
                <Route path="facturas" element={<ListaDeFacturas />} />
                <Route path="facturas/nuevo" element={<CrearFacPre type='factura' />} />

                {/* ⚠️ Captura de error 404 dentro del diseño del Layout */}
                <Route path="*" element={<div className="p-8 text-center text-gray-500">404 - Página no encontrada</div>} />
            </Route>
        </Routes>
    );
};

export default AppRouter;
