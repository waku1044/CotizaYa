import  { useState } from 'react';

export default function ArticleForm() {
  const [article, setArticle] = useState({
    name: '', description: '', price: '', cost: '', unit: 'unidades', barcode: '', taxes: '0'
  });
  const [errors, setErrors] = useState({});

  const handleSave = (e) => {
    e.preventDefault();
    if (!article.name.trim() || !article.price) {
      setErrors({
        name: !article.name.trim() ? 'Campo obligatorio' : null,
        price: !article.price ? 'Campo obligatorio' : null,
      });
      return;
    }
    console.log("Artículo guardado:", article);
    alert("Artículo añadido al catálogo.");
  };

  return (
    <div className="max-w-xl mx-auto bg-gray-100 min-h-screen pb-12 shadow-sm border border-gray-200">
      <div className="bg-cyan-800 border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0">
        <button className="text-gray-600 text-xl font-bold">←</button>
        <h1 className="text-lg font-semibold text-gray-900">Añadir artículo</h1>
        <button onClick={handleSave} className="text-emerald-400 text-xl font-bold">✓</button>
      </div>

      <form className="p-4 space-y-4">
        {/* Nombre */}
        <div className={`border rounded px-3 py-1.5 ${errors.name ? 'border-red-300' : 'border-gray-300'}`}>
          <label className={`block text-xs ${errors.name ? 'text-red-500' : 'text-gray-500'}`}>Nombre</label>
          <input type="text" placeholder="Introduce el nombre" value={article.name} onChange={(e)=>setArticle({...article, name: e.target.value})} className="w-full text-sm focus:outline-none" />
          {errors.name && <p className="text-[10px] text-red-500 mt-0.5">{errors.name}</p>}
        </div>

        {/* Descripción */}
        <div className="border border-gray-300 rounded px-3 py-1.5">
          <label className="block text-xs font-medium text-gray-500">Descripción</label>
          <textarea rows="2" placeholder="Introduce la descripción" value={article.description} onChange={(e)=>setArticle({...article, description: e.target.value})} className="w-full text-sm focus:outline-none resize-none" />
        </div>

        {/* Precio */}
        <div className={`border rounded px-3 py-1.5 ${errors.price ? 'border-red-300' : 'border-gray-300'}`}>
          <label className={`block text-xs ${errors.price ? 'text-red-500' : 'text-gray-500'}`}>Precio</label>
          <input type="number" placeholder="Introduce el precio" value={article.price} onChange={(e)=>setArticle({...article, price: e.target.value})} className="w-full text-sm focus:outline-none" />
          {errors.price && <p className="text-[10px] text-red-500 mt-0.5">{errors.price}</p>}
        </div>

        {/* Coste */}
        <div className="border border-gray-300 rounded px-3 py-1.5">
          <label className="block text-xs font-medium text-gray-500">Coste (opcional)</label>
          <input type="number" placeholder="Introduce el coste" value={article.cost} onChange={(e)=>setArticle({...article, cost: e.target.value})} className="w-full text-sm focus:outline-none" />
        </div>

        {/* Unidad */}
        <div className="border border-gray-300 rounded px-3 py-1.5">
          <label className="block text-xs font-medium text-gray-500">Unidad</label>
          <input type="text" placeholder="unidades, horas, kg" value={article.unit} onChange={(e)=>setArticle({...article, unit: e.target.value})} className="w-full text-sm focus:outline-none" />
        </div>

        {/* Código de barras */}
        <div className="border border-gray-300 rounded px-3 py-1.5 flex items-center justify-between">
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-500">Código de barras</label>
            <input type="text" placeholder="Introduce o escanea el código" value={article.barcode} onChange={(e)=>setArticle({...article, barcode: e.target.value})} className="w-full text-sm focus:outline-none" />
          </div>
          <span className="text-blue-500 text-lg cursor-pointer">║▌║</span>
        </div>

        {/* Impuestos Selector */}
        <div className="border border-gray-300 rounded px-3 py-2 flex justify-between items-center">
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
          <div className="w-32 h-32 border border-gray-300 bg-gray-50 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100">
            <span className="text-gray-400 text-2xl">📷</span>
            <span className="text-xs text-gray-600 mt-1 font-medium">Añadir imagen</span>
          </div>
        </div>
      </form>
    </div>
  );
}
