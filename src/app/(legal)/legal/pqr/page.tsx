'use client';

export default function PqrPage() {
  return (
    <div className="py-24 bg-white min-h-[80vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">
          Radicación de PQR
        </h1>
        <p className="text-slate-600 mb-8">
          En Osmas TV S.A.S. tu opinión es muy importante. Diligencia el siguiente formulario para presentar tu Petición, Queja o Reclamo.
        </p>
        
        <form className="space-y-6 bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nombres" className="block text-sm font-medium text-slate-700">Nombres Completos</label>
              <input type="text" id="nombres" className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-3 border" />
            </div>
            <div>
              <label htmlFor="documento" className="block text-sm font-medium text-slate-700">Documento de Identidad</label>
              <input type="text" id="documento" className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-3 border" />
            </div>
          </div>

          <div>
            <label htmlFor="tipo" className="block text-sm font-medium text-slate-700">Tipo de Solicitud</label>
            <select id="tipo" className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-3 border bg-white">
              <option>Petición</option>
              <option>Queja</option>
              <option>Reclamo</option>
              <option>Sugerencia</option>
            </select>
          </div>

          <div>
            <label htmlFor="mensaje" className="block text-sm font-medium text-slate-700">Detalle de la Solicitud</label>
            <textarea id="mensaje" rows={4} className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-3 border"></textarea>
          </div>

          <button type="submit" className="w-full md:w-auto px-8 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20">
            Enviar Solicitud
          </button>
        </form>
      </div>
    </div>
  );
}