import { useState, useEffect } from 'react';

export default function DocumentForm({ type = 'factura' }) {
  const isInvoice = type === 'factura';
  const prefix = isInvoice ? 'FAC' : 'PRE';
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({
    number: `${prefix}${currentYear}/1`,
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    company: 'WalTech Refrigeración / Electricidad Domiciliaria',
    client: '', 
    items: [],
    terms: true,
    paymentMethod: '',
  });

  const [total, setTotal] = useState(0);
  const [clientes, setClientes] = useState([]);
  const [articulos, setArticulos] = useState([]); 
  const [errorClientes, setErrorClientes] = useState(null);
  const [errorArticulos, setErrorArticulos] = useState(null); 

  useEffect(() => {
    fetch('http://localhost:3000/api/clientes')
      .then(response => {
        if (!response.ok) throw new Error('Error al traer los clientes.');
        return response.json();
      })
      .then(data => {
        setClientes(data);
        setErrorClientes(null);
      })
      .catch(err => {
        console.error(err);
        setClientes([]);
        setErrorClientes('No se pudieron cargar los clientes.');
      });

    fetch('http://localhost:3000/api/articulos')
      .then(response => {
        if (!response.ok) throw new Error('Error al traer los artículos.');
        return response.json();
      })
      .then(data => {
        setArticulos(data);
        setErrorArticulos(null);
      })
      .catch(err => {
        console.error(err);
        setArticulos([]);
        setErrorArticulos('No se pudieron cargar los artículos.');
      });
  }, []);

  const addArticle = (articulo) => {
    const newItem = {
      articuloId: articulo.id,
      name: articulo.descripcion || articulo.nombre,
      price: articulo.precioUnitario || articulo.precio || 0,
      quantity: 1,
      id_line: Date.now()
    };
    setFormData({ ...formData, items: [...formData.items, newItem] });
  };

  // ✅ CORREGIDO: Permite dejar el campo temporalmente vacío mientras se escribe
  const updateItem = (id_line, field, value) => {
    const updatedItems = formData.items.map((item) => {
      if (item.id_line === id_line) {
        return { 
          ...item, 
          [field]: value === '' ? '' : (field === 'quantity' ? parseInt(value) : parseFloat(value))
        };
      }
      return item;
    });
    setFormData({ ...formData, items: updatedItems });
  };

  const removeItem = (id_line) => {
    const filteredItems = formData.items.filter(item => item.id_line !== id_line);
    setFormData({ ...formData, items: filteredItems });
  };

  useEffect(() => {
    const calculatedTotal = formData.items.reduce((acc, item) => {
      const q = item.quantity === '' ? 0 : item.quantity;
      const p = item.price === '' ? 0 : item.price;
      return acc + (p * q);
    }, 0);
    setTotal(calculatedTotal);
  }, [formData.items]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Guardando ${type}:`, formData, "Total:", total);
    alert(`${isInvoice ? 'Factura' : 'Presupuesto'} guardado con éxito localmente.`);
  };

  return (
    <div className="max-w-xl mx-auto bg-gray-50 min-h-screen pb-24 shadow-sm border border-gray-200">
      {/* Cabecera superior fija */}
      <div className="bg-cyan-800 border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button type="button" className="text-white hover:text-gray-200 text-xl font-bold">←</button>
        <h1 className="text-lg font-semibold text-white capitalize">Crear {type}</h1>
        <button type="submit" form="doc-form" className="text-emerald-400 hover:text-emerald-300 text-xl font-bold">✓</button>
      </div>

      <form id="doc-form" onSubmit={handleSubmit} className="p-4 space-y-3">
        {/* Bloque: Número */}
        <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3 w-full">
            <span className="text-gray-400 text-lg">📄</span>
            <div className="w-full">
              <label className="block text-xs font-medium text-gray-500">Número</label>
              <input type="text" value={formData.number} onChange={(e) => setFormData({...formData, number: e.target.value})} className="w-full text-sm font-semibold text-gray-800 bg-transparent focus:outline-none" />
            </div>
          </div>
          <span className="text-blue-500 text-sm">✓</span>
        </div>

        {/* Bloque: Fecha Emisión */}
        <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3 w-full">
            <span className="text-gray-400 text-lg">📅</span>
            <div className="w-full">
              <label className="block text-xs font-medium text-gray-500">Fecha</label>
              <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full text-sm text-gray-800 bg-transparent focus:outline-none" />
            </div>
          </div>
          <span className="text-blue-500 text-sm">✓</span>
        </div>

        {/* Bloque: Fecha Vencimiento */}
        <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3 w-full">
            <span className="text-gray-400 text-lg">📅</span>
            <div className="w-full">
              <label className="block text-xs font-medium text-gray-500">Fecha de vencimiento</label>
              <input type="date" value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} className="w-full text-sm text-gray-800 bg-transparent focus:outline-none" />
            </div>
          </div>
          <span className="text-gray-400">➔</span>
        </div>

        {/* Bloque: Emisor Empresa */}
        <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3 w-full">
            <span className="text-gray-400 text-lg">💼</span>
            <div className="w-full">
              <input type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full text-sm font-medium text-gray-800 bg-transparent focus:outline-none" />
            </div>
          </div>
          <span className="text-blue-500 text-sm">✓</span>
        </div>

        {/* Bloque: Seleccionar Cliente */}
        <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3 w-full">
            <span className="text-gray-400 text-lg">👤</span>
            <div className="w-full">
              <label className="block text-xs font-medium text-gray-500">Cliente</label>
              <select value={formData.client} onChange={(e) => setFormData({...formData, client: e.target.value})} className="w-full text-sm text-gray-700 bg-transparent focus:outline-none appearance-none" >
                <option value="">{errorClientes ? errorClientes : 'Seleccionar cliente'}</option>
                {clientes.map(cliente => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nombre} {cliente.email ? `(${cliente.email})` : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <span className="text-gray-400">➔</span>
        </div>

        {/* Bloque Seleccionador de Artículos */}
        <div className="bg-white p-3 rounded-lg border border-gray-200">
          <label className="block text-xs font-medium text-gray-500 mb-1">Catálogo de Artículos disponibles</label>
          <select onChange={(e) => {
            if (e.target.value) {
              const seleccionado = articulos.find(a => a.id === e.target.value);
              if (seleccionado) addArticle(seleccionado);
              e.target.value = "";
            }
          }} className="w-full text-sm text-gray-700 bg-transparent border-0 focus:outline-none p-1 bg-gray-50 rounded" >
            <option value="">{errorArticulos ? errorArticulos : '➕ Elegir artículo para añadir...'}</option>
            {articulos.map(articulo => {
              const precioExhibido = articulo.precioUnitario || articulo.precio || 0;
              return (
                <option key={articulo.id} value={articulo.id}>
                  {articulo.descripcion || articulo.nombre} - \${precioExhibido.toFixed(2)}
                </option>
              );
            })}
          </select>
        </div>
        {/* 🔄 Listado interactivo con Modificación y Eliminación */}
        {formData.items.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-2 space-y-2">
            {formData.items.map((item) => {
              const priceSafe = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
              const quantitySafe = typeof item.quantity === 'number' ? item.quantity : parseInt(item.quantity) || 0;
              return (
                <div key={item.id_line} className="flex justify-between items-center text-xs p-2 bg-gray-50 rounded space-x-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">{item.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {/* Input Cantidad */}
                      <input 
                        type="number" 
                        min="1"
                        value={item.quantity} 
                        onChange={(e) => updateItem(item.id_line, 'quantity', e.target.value)}
                        className="w-12 text-center border rounded bg-white p-0.5 font-medium text-gray-700 focus:ring-1 focus:ring-cyan-500 focus:outline-none"
                      />
                      <span className="text-gray-400">x</span>
                      {/* Input Precio Unitario */}
                      <div className="flex items-center border rounded bg-white px-1">
                        <span className="text-gray-400 mr-0.5">$</span>
                        <input 
                          type="number" 
                          step="0.01"
                          min="0"
                          value={item.price} 
                          onChange={(e) => updateItem(item.id_line, 'price', e.target.value)}
                          className="w-16 text-left p-0.5 font-medium text-gray-700 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Total de Línea y Botón de Borrar */}
                  <div className="flex items-center space-x-3">
                    <span className="font-bold text-gray-700">${(priceSafe * quantitySafe).toFixed(2)}</span>
                    <button 
                      type="button" 
                      onClick={() => removeItem(item.id_line)}
                      className="text-red-500 hover:text-red-700 p-1 font-bold text-sm"
                      title="Eliminar artículo"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bloque: Totalizador */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">Total Neto</span>
          <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
        </div>
      </form>
    </div>
  );
}
