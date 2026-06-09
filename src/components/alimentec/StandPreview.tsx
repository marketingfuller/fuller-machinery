import { STAND_FEATURES } from "@/content/alimentec";

export default function StandPreview() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-5 bg-secondary/5 border border-secondary/15 px-5 py-2 rounded-full">
            <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
              storefront
            </span>
            En el stand
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-primary leading-tight">
            Lo que vas a ver en el stand
          </h2>
          <p className="mt-5 text-gray-500 text-lg leading-relaxed">
            No es un mostrador de folletos. Es una asesoría para que salgas con
            números claros sobre tu negocio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STAND_FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex flex-col rounded-3xl border border-gray-100 bg-gray-50/60 p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-accent" style={{ fontSize: "28px" }}>
                  {f.icon}
                </span>
              </div>
              <h3 className="text-xl font-display font-black text-primary mb-2">
                {f.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
