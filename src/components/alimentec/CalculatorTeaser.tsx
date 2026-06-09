import Link from "next/link";

// Teaser de "Arma tu negocio" en la landing → /alimentec/arma-tu-negocio.
// No se inventan cifras: utilidad neta con insumos y costos fijos descontados.

const STEPS = [
  { icon: "storefront", label: "Tu negocio" },
  { icon: "shopping_cart", label: "Tu kit de máquinas" },
  { icon: "sell", label: "Precio de venta" },
  { icon: "receipt_long", label: "Costo de insumos" },
  { icon: "payments", label: "Utilidad y payback" },
];

export default function CalculatorTeaser() {
  return (
    <section
      id="calculadora"
      className="py-20 md:py-28 bg-gradient-to-br from-bg-dark to-slate-900 text-white scroll-mt-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-accent font-bold tracking-[0.2em] uppercase text-xs mb-5 bg-accent/10 border border-accent/25 px-5 py-2 rounded-full">
              <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                rocket_launch
              </span>
              Arma tu negocio
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black leading-tight mb-4">
              Calcula tu negocio con{" "}
              <span className="text-gradient-accent">tus propios números</span>
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Elige un negocio, arma tu kit de máquinas y estima tu utilidad neta
              al mes y en cuántos meses recuperas la inversión. Con tus supuestos,
              no una promesa de rentabilidad — si el retorno son 14 meses, decimos 14.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {STEPS.map((s, i) => (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-white/80 text-xs font-medium px-3 py-2 rounded-full"
                >
                  <span className="text-accent font-bold">{i + 1}</span>
                  <span className="material-symbols-outlined text-accent" style={{ fontSize: "15px" }}>
                    {s.icon}
                  </span>
                  {s.label}
                </span>
              ))}
            </div>

            <Link
              href="/alimentec/arma-tu-negocio"
              data-zocam-event="alimentec-calc-cta"
              className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold text-sm px-7 py-4 rounded-full transition-all duration-200 hover:scale-[1.03]"
            >
              Arma tu negocio ahora
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                arrow_forward
              </span>
            </Link>
          </div>

          {/* Tarjeta-enlace a la herramienta */}
          <Link
            href="/alimentec/arma-tu-negocio"
            className="block rounded-3xl border border-white/10 bg-white/5 p-8 text-center hover:border-accent/40 transition group"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
              <span className="material-symbols-outlined text-accent" style={{ fontSize: "32px" }}>
                rocket_launch
              </span>
            </div>
            <p className="font-display font-black text-2xl mb-2 group-hover:text-accent transition">
              Arma tu negocio
            </p>
            <p className="text-white/60 text-sm leading-relaxed">
              Elige negocio, configura tu kit y mira tu utilidad y payback. También
              te lo armamos en el stand con un asesor.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
