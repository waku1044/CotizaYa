import { useState, useEffect } from 'react';

export default function DocumentForm({ type = 'factura' }) {
  const isInvoice = type === 'factura';
  const prefix = isInvoice ? 'FAC' : 'PRE';
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({
    number: `${prefix}${currentYear}/1`,
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    company: 'WalTech',
    client: '',
    items: [],
    terms: true,
    paymentMethod: '',
  });

  const [total, setTotal] = useState(0);

  const availableArticles = [
    { id: 1, name: 'Servicio Técnico Alistado', price: 150.00 },
    { id: 2, name: 'Licencia de Software Anual', price: 1200.00 },
  ];

  const addArticle = (article) => {
    const newItem = { ...article, quantity: 1, id_line: Date.now() };
    setFormData({ ...formData, items: [...formData.items, newItem] });
  };

  useEffect(() => {
    const calculatedTotal = formData.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
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
        <button type="button" className="text-gray-600 hover:text-gray-900 text-xl font-bold">←</button>
        <h1 className="text-lg font-semibold text-gray-800 capitalize">Crear {type}</h1>
        {/* CORRECCIÓN 1: El botón ahora tiene type="submit" y apunta al id del formulario */}
        <button type="submit" form="doc-form" className="text-emerald-400 hover:text-blue-800 text-xl font-bold">✓</button>
      </div>

      {/* CORRECCIÓN 2: Se agregó id="doc-form" y onSubmit ejecuta la función directamente */}
      <form id="doc-form" onSubmit={handleSubmit} className="p-4 space-y-3">
        {/* Bloque: Número */}
        <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3 w-full">
            <span className="text-gray-400 text-lg">📄</span>
            <div className="w-full">
              <label className="block text-xs font-medium text-gray-500">Número</label>
              <input 
                type="text" 
                value={formData.number}
                onChange={(e) => setFormData({...formData, number: e.target.value})}
                className="w-full text-sm font-semibold text-gray-800 bg-transparent focus:outline-none"
              />
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
              <input 
                type="date" 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full text-sm text-gray-800 bg-transparent focus:outline-none"
              />
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
              <input 
                type="date" 
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                className="w-full text-sm text-gray-800 bg-transparent focus:outline-none"
              />
            </div>
          </div>
          <span className="text-gray-400">➔</span>
        </div>

        {/* Bloque: Emisor Empresa */}
        <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3 w-full">
            <span className="text-gray-400 text-lg">💼</span>
            <div className="w-full">
              <input 
                type="text" 
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full text-sm font-medium text-gray-800 bg-transparent focus:outline-none"
              />
            </div>
          </div>
          <span className="text-blue-500 text-sm">✓</span>
        </div>

        {/* Bloque: Seleccionar Cliente */}
        <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3 w-full">
            <span className="text-gray-400 text-lg">👤</span>
            <div className="w-full">
              <select 
                value={formData.client} 
                onChange={(e) => setFormData({...formData, client: e.target.value})}
                className="w-full text-sm text-gray-700 bg-transparent focus:outline-none appearance-none"
              >
                <option value="">Seleccionar cliente</option>
                <option value="Cliente 1">Juan Pérez (Insumos S.A.)</option>
                <option value="Cliente 2">María Gómez</option>
              </select>
            </div>
          </div>
          <span className="text-gray-400">➔</span>
        </div>

        {/* Botón: Añadir Artículo */}
        <div className="pt-2">
          <button 
            type="button"
            onClick={() => addArticle(availableArticles[0])} 
            className="w-full bg-white hover:bg-gray-100 text-blue-600 text-sm font-medium py-3 rounded-lg border border-dashed border-gray-300 transition-colors"
          >
            ⊕ Añadir artículo
          </button>
        </div>

        {/* Listado de artículos añadidos */}
        {formData.items.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-2 space-y-2">
            {formData.items.map((item) => (
              <div key={item.id_line} className="flex justify-between items-center text-xs p-2 bg-gray-50 rounded">
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  {/* CORRECCIÓN 3: Eliminadas las barras invertidas en el signo de dólar */}
                  <p className="text-gray-500">{item.quantity} x \${item.price.toFixed(2)}</p>
                </div>
                <span className="font-bold text-gray-700">\${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Bloque: Totalizador */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-center">
          <span className="text-lg font-bold text-gray-800">Total</span>
          {/* CORRECCIÓN 4: Eliminada barra invertida aquí también */}
          <span className="text-xl font-black text-gray-900">\${total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
        </div>

        {/* Opciones Adicionales Extendidas */}
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100 text-sm text-gray-700">
          <div className="p-3 flex justify-between cursor-pointer hover:bg-gray-50">
            <span>📎 Adjuntos</span> <span className="text-gray-400">➔</span>
          </div>
          <div className="p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50">
            <span>📋 Términos y condiciones</span>
          </div>
        </div>
      </form>
    </div>
  );
}
