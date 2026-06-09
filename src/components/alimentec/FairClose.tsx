import { FAIR } from "@/content/alimentec";

export default function FairClose() {
  const details = [
    { icon: "apartment", label: "Pabellón", value: FAIR.pavilion.replace("Pabellón ", "") },
    { icon: "storefront", label: "Stand", value: FAIR.stand.replace("Stand ", "") },
    { icon: "event", label: "Fechas", value: FAIR.datesLabel },
    { icon: "location_on", label: "Lugar", value: `${FAIR.venue}, ${FAIR.city}` },
  ];

  return (
    <section className="py-20 md:py-28 bg-bg-dark text-white overflow-hidden relative">
      <div className="absolute -top-32 -right-24 w-[420px] h-[420px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black leading-tight mb-4">
            Nos vemos en {FAIR.name}
          </h2>
          <p className="text-white/70 text-lg leading-relaxed">
            Pasa por nuestro stand, calculamos tu negocio y te llevas una
            cotización real. Y si no alcanzas a venir, la feria sigue contigo por
            WhatsApp.
          </p>
        </div>

        {/* Detalles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {details.map((d) => (
            <div
              key={d.label}
              className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center"
            >
              <span className="material-symbols-outlined text-accent mb-2 inline-block" style={{ fontSize: "26px" }}>
                {d.icon}
              </span>
              <p className="text-white/50 text-xs uppercase tracking-wider mb-0.5">
                {d.label}
              </p>
              <p className="font-display font-black text-lg">{d.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#cotizar"
            data-zocam-event="alimentec-cierre-visita"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold text-sm px-7 py-4 rounded-full transition-all duration-200 hover:scale-[1.03]"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              calendar_month
            </span>
            Aparta tu visita
          </a>
          <a
            href={FAIR.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-zocam-event="alimentec-cierre-mapa"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm px-7 py-4 rounded-full transition-all duration-200 hover:scale-[1.03]"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              map
            </span>
            Cómo llegar a {FAIR.venue}
          </a>
        </div>
        <p className="text-center text-white/40 text-sm mt-6">{FAIR.address}</p>
      </div>
    </section>
  );
}
