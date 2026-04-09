export default function ProfitCalc() {
  return (
    <section className="py-16 bg-bg-dark text-white overflow-hidden relative">
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display font-black text-3xl md:text-4xl mb-4">
            Calculadora de Rentabilidad: Waffle Burbuja
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Entiende por qué este negocio es uno de los más rentables del momento. Recupera tu inversión en menos de 3 meses.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
            <div className="flex flex-col gap-2">
              <span className="text-white/50 uppercase text-sm font-bold tracking-wider">Costo Producción</span>
              <span className="text-4xl font-black text-white/80">$0.60 USD</span>
              <span className="text-xs text-white/40">Masa + Toppings + Envase</span>
            </div>

            <div className="flex flex-col gap-2 bg-secondary/20 p-5 rounded-xl border border-secondary/50">
              <span className="text-white uppercase text-sm font-bold tracking-wider">Ganancia Neta</span>
              <span className="text-4xl font-black text-white">$3.90 USD</span>
              <span className="text-xs text-white/70">Por unidad vendida</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-accent uppercase text-sm font-bold tracking-wider">Precio de Venta</span>
              <span className="text-5xl font-black text-accent">$4.50 USD</span>
              <span className="text-xs text-accent/70">Precio promedio mercado</span>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-lg">
              Vende solo <span className="font-bold text-accent">20 unidades al día</span> y gana{" "}
              <span className="font-bold text-accent">$2,340 USD/mes</span>
            </p>
            <p className="text-xs text-white/40 mt-2">*Estimaciones basadas en promedios de mercado. Los resultados pueden variar.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
