'use client';

export default function PagoEnLineaPage() {
  return (
    <div className="py-20 bg-slate-50 min-h-screen flex items-center justify-center pt-28">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200/60 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Portal de Pagos</h1>
          <p className="text-sm text-slate-500 mt-2">Osmas TV S.A.S.</p>
        </div>
        
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="documento" className="block text-sm font-medium text-slate-700">
              Número de Cédula o Contrato
            </label>
            <input
              type="text"
              name="documento"
              id="documento"
              className="mt-2 block w-full rounded-xl border-slate-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-3 border"
              placeholder="Ej. 123456789"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
          >
            Consultar Factura
          </button>
        </form>

        <div className="mt-6 border-t border-slate-100 pt-6">
          <p className="text-xs text-center text-slate-400">
            Los pagos se procesan de forma segura. Al continuar aceptas nuestros términos y condiciones.
          </p>
        </div>
      </div>
    </div>
  );
}
