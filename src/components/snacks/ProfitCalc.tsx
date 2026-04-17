export default function ProfitCalc() {
  return (
    <section className="py-16 bg-bg-dark text-white overflow-hidden relative">
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display font-black text-3xl md:text-4xl mb-4">
            Calculadora de Rentabilidad: Waffle Burbuja
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Datos reales del mercado colombiano. Números honestos, sin exageraciones — así sabes exactamente qué esperar.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
            <div className="flex flex-col gap-2">
              <span className="text-white/50 uppercase text-sm font-bold tracking-wider">Costo por Waffle</span>
              <span className="text-4xl font-black text-white/80">$5.090</span>
              <span className="text-xs text-white/40">Masa + empaque + topping con helado</span>
            </div>

            <div className="flex flex-col gap-2 bg-secondary/20 p-5 rounded-xl border border-secondary/50">
              <span className="text-white uppercase text-sm font-bold tracking-wider">Ganancia Bruta</span>
              <span className="text-4xl font-black text-white">$7.910</span>
              <span className="text-xs text-white/70">Por unidad vendida (margen 61%)</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-accent uppercase text-sm font-bold tracking-wider">Precio de Venta</span>
              <span className="text-5xl font-black text-accent">$13.000</span>
              <span className="text-xs text-accent/70">Promedio en Colombia</span>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10">
            <h3 className="text-center text-xl font-display font-bold mb-6">Proyección mensual según escenario</h3>
            <p className="text-center text-white/60 text-sm mb-6">
              Basado en 26 días/mes, 6 horas de operación, 1 wafflera y 1 operario.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="text-white/70 uppercase text-xs font-bold tracking-wider">Pesimista</span>
                </div>
                <div className="text-xs text-white/50 mb-1">15 waffles / día</div>
                <div className="text-2xl font-black text-white">$454.900</div>
                <div className="text-xs text-white/40 mt-1">neto al mes (con local)</div>
              </div>

              <div className="bg-secondary/15 rounded-xl p-5 border border-secondary/40 md:scale-105">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-yellow-400" />
                  <span className="text-white uppercase text-xs font-bold tracking-wider">Realista</span>
                </div>
                <div className="text-xs text-white/60 mb-1">30 waffles / día</div>
                <div className="text-3xl font-black text-white">$3.539.800</div>
                <div className="text-xs text-white/60 mt-1">neto al mes (con local)</div>
              </div>

              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-accent uppercase text-xs font-bold tracking-wider">Optimista</span>
                </div>
                <div className="text-xs text-white/50 mb-1">50 waffles / día</div>
                <div className="text-2xl font-black text-accent">$7.653.000</div>
                <div className="text-xs text-white/40 mt-1">neto al mes (con local)</div>
              </div>
            </div>

            <div className="mt-6 bg-accent/10 border border-accent/30 rounded-xl p-5 text-center">
              <div className="text-accent text-xs uppercase font-bold tracking-wider mb-1">Modelo ambulante / eventos / domicilios</div>
              <div className="text-xl md:text-2xl font-black text-white">
                Hasta <span className="text-accent">$5.569.800</span> netos / mes
              </div>
              <div className="text-xs text-white/60 mt-1">Sin arriendo de local. Inversión inicial desde $1.700.000.</div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="text-white/50 uppercase text-xs font-bold tracking-wider">Producción real</div>
                <div className="text-white font-bold mt-1">8–10 waffles / hora</div>
              </div>
              <div>
                <div className="text-white/50 uppercase text-xs font-bold tracking-wider">Inversión en equipo</div>
                <div className="text-white font-bold mt-1">$600.000 – $1.500.000</div>
              </div>
              <div>
                <div className="text-white/50 uppercase text-xs font-bold tracking-wider">ROI equipo</div>
                <div className="text-white font-bold mt-1">3 a 8 semanas</div>
              </div>
            </div>

            <p className="text-xs text-white/40 mt-8 text-center max-w-3xl mx-auto">
              *Cifras netas mensuales calculadas descontando insumos, arriendo ($1.5M–$3.5M), servicios, impuestos régimen simple y gastos operativos. El modelo ambulante descuenta solo permisos y servicios mínimos (~$600.000/mes). Los resultados dependen de ubicación, temporada y volumen real de clientes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
