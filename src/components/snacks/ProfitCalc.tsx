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
            Uno de los snacks con mayor margen en Colombia. Con una sola wafflera puedes recuperar tu inversión en menos de 3 días de venta.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
            <div className="flex flex-col gap-2">
              <span className="text-white/50 uppercase text-sm font-bold tracking-wider">Costo Producción</span>
              <span className="text-4xl font-black text-white/80">$4.200</span>
              <span className="text-xs text-white/40">Masa + Helado + Topping + Empaque</span>
            </div>

            <div className="flex flex-col gap-2 bg-secondary/20 p-5 rounded-xl border border-secondary/50">
              <span className="text-white uppercase text-sm font-bold tracking-wider">Ganancia Bruta</span>
              <span className="text-4xl font-black text-white">$18.800</span>
              <span className="text-xs text-white/70">Por unidad vendida (82% margen)</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-accent uppercase text-sm font-bold tracking-wider">Precio de Venta</span>
              <span className="text-5xl font-black text-accent">$23.000</span>
              <span className="text-xs text-accent/70">Precio promedio Colombia</span>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-6">
              <div className="flex flex-col gap-1">
                <span className="text-white/50 text-xs uppercase font-bold tracking-wider">Producción / hora</span>
                <span className="text-2xl font-black text-white">10–12 unidades</span>
                <span className="text-xs text-white/40">Con 1 wafflera comercial</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/50 text-xs uppercase font-bold tracking-wider">Ganancia neta / día</span>
                <span className="text-2xl font-black text-white">$900.000 – $1.400.000</span>
                <span className="text-xs text-white/40">7 horas operación (descontando gastos)</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-accent text-xs uppercase font-bold tracking-wider">Ganancia neta / mes</span>
                <span className="text-2xl font-black text-accent">$22.500.000+</span>
                <span className="text-xs text-accent/70">25 días de operación</span>
              </div>
            </div>
            <p className="text-center text-lg">
              Recupera la inversión del equipo en{" "}
              <span className="font-bold text-accent">1 a 3 días de venta</span> — el resto es ganancia pura.
            </p>
            <p className="text-xs text-white/40 mt-2 text-center">*Datos basados en precios reales de mercado colombiano 2025–2026. Los resultados pueden variar según ubicación y volumen.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
