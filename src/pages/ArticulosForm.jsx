import { useState } from 'react';

export default function ArticleForm() {
  const [article, setArticle] = useState({
    name: '', description: '', price: '', cost: '', unit: 'unidades', barcode: '', taxes: '0'
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null); // NUEVO: Estado para capturar errores del backend
  const [loading, setLoading] = useState(false);        // NUEVO: Estado para evitar doble envío

    const handleSave = async (e) => {
    e.preventDefault();
    setServerError(null);

    // 1. Validaciones locales del Frontend (Corregido a article.price)
    if (!article.name.trim() || !article.price || parseFloat(article.price) < 0) {
      setErrors({
        name: !article.name.trim() ? 'Campo obligatorio' : null,
        price: !article.price ? 'Campo obligatorio' : parseFloat(article.price) < 0 ? 'Debe ser mayor o igual a 0' : null,
      });
      return;
    }

    setLoading(true);

    try {
      // 2. Petición POST real al backend conectado a Prisma
      const response = await fetch('http://localhost:3000/api/articulos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Mapeamos los nombres de tus estados locales a los nombres esperados por el schema de Prisma
        body: JSON.stringify({
          nombre: article.name,
          descripcion: article.description,
          precio: parseFloat(article.price), // 👈 ¡CORREGIDO!: Antes decía article.precio
          coste: article.cost ? parseFloat(article.cost) : 0.0,
          unidad: article.unit,
          codigoBarras: article.barcode || null,
          imagenUrl: null 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ocurrió un error al guardar en la base de datos.');
      }

      // 3. Resetear el formulario si se guardó con éxito
      alert("Artículo añadido al catálogo de Waltech correctamente.");
      setArticle({
        name: '', description: '', price: '', cost: '', unit: 'unidades', barcode: '', taxes: '0'
      });
      setErrors({});

    } catch (err) {
      console.error("Error al guardar:", err);
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-xl mx-auto bg-gray-100 min-h-screen pb-12 shadow-sm border border-gray-200">
      <div className="bg-cyan-800 border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button type="button" className="text-white hover:text-gray-200 text-xl font-bold">←</button>
        {/* Cambié el texto a blanco para mejorar contraste sobre el fondo cian */}
        <h1 className="text-lg font-semibold text-white">Añadir artículo</h1>
        <button 
          onClick={handleSave} 
          disabled={loading} 
          className={`${loading ? 'text-gray-400' : 'text-emerald-400 hover:text-emerald-300'} text-xl font-bold`}
        >
          {loading ? '...' : '✓'}
        </button>
      </div>

      <form onSubmit={handleSave} className="p-4 space-y-4">
        {/* Banner de error del servidor si llegara a fallar */}
        {serverError && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded text-xs font-medium">
            ⚠️ {serverError}
          </div>
        )}

        {/* Nombre */}
        <div className={`bg-white border rounded px-3 py-1.5 ${errors.name ? 'border-red-300' : 'border-gray-300'}`}>
          <label className={`block text-xs ${errors.name ? 'text-red-500' : 'text-gray-500'}`}>Nombre</label>
          <input type="text" placeholder="Introduce el nombre" value={article.name} onChange={(e)=>setArticle({...article, name: e.target.value})} className="w-full text-sm focus:outline-none bg-transparent" />
          {errors.name && <p className="text-[10px] text-red-500 mt-0.5">{errors.name}</p>}
        </div>

        {/* Descripción */}
        <div className="bg-white border border-gray-300 rounded px-3 py-1.5">
          <label className="block text-xs font-medium text-gray-500">Descripción</label>
          <textarea rows="2" placeholder="Introduce la descripción" value={article.description} onChange={(e)=>setArticle({...article, description: e.target.value})} className="w-full text-sm focus:outline-none resize-none bg-transparent" />
        </div>

        {/* Precio */}
        <div className={`bg-white border rounded px-3 py-1.5 ${errors.price ? 'border-red-300' : 'border-gray-300'}`}>
          <label className={`block text-xs ${errors.price ? 'text-red-500' : 'text-gray-500'}`}>Precio</label>
          <input type="number" step="0.01" placeholder="Introduce el precio" value={article.price} onChange={(e)=>setArticle({...article, price: e.target.value})} className="w-full text-sm focus:outline-none bg-transparent" />
          {errors.price && <p className="text-[10px] text-red-500 mt-0.5">{errors.price}</p>}
        </div>

        {/* Coste */}
        <div className="bg-white border border-gray-300 rounded px-3 py-1.5">
          <label className="block text-xs font-medium text-gray-500">Coste (opcional)</label>
          <input type="number" step="0.01" placeholder="Introduce el coste" value={article.cost} onChange={(e)=>setArticle({...article, cost: e.target.value})} className="w-full text-sm focus:outline-none bg-transparent" />
        </div>

        {/* Unidad */}
        <div className="bg-white border border-gray-300 rounded px-3 py-1.5">
          <label className="block text-xs font-medium text-gray-500">Unidad</label>
          <input type="text" placeholder="unidades, horas, kg" value={article.unit} onChange={(e)=>setArticle({...article, unit: e.target.value})} className="w-full text-sm focus:outline-none bg-transparent" />
        </div>

        {/* Código de barras */}
        <div className="bg-white border border-gray-300 rounded px-3 py-1.5 flex items-center justify-between">
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-500">Código de barras</label>
            <input type="text" placeholder="Introduce o escanea el código" value={article.barcode} onChange={(e)=>setArticle({...article, barcode: e.target.value})} className="w-full text-sm focus:outline-none bg-transparent" />
          </div>
          <span className="text-blue-500 text-lg cursor-pointer select-none">║▌║</span>
        </div>

        {/* Impuestos Selector */}
        <div className="bg-white border border-gray-300 rounded px-3 py-2 flex justify-between items-center">
          <div>
            <label className="block text-xs font-medium text-gray-400">Impuestos</label>
            <select value={article.taxes} onChange={(e)=>setArticle({...article, taxes: e.target.value})} className="text-sm text-gray-800 bg-transparent focus:outline-none appearance-none">
              <option value="0">0 impuestos seleccionados</option>
              <option value="21">IVA (21%)</option>
              <option value="10.5">IVA (10.5%)</option>
            </select>
          </div>
          <span className="text-gray-400 text-xs">▼</span>
        </div>

        {/* Botón Imagen */}
        <div className="pt-2 flex justify-center">
          <div className="w-32 h-32 border border-gray-300 bg-gray-50 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
            <span className="text-gray-400 text-2xl">📷</span>
            <span className="text-xs text-gray-600 mt-1 font-medium">Añadir imagen</span>
          </div>
        </div>
      </form>
    </div>
  );
}
