import { WHY_FULLER } from "@/content/alimentec";

export default function WhyFuller({ productCount }: { productCount: number }) {
  // Redondea hacia abajo a la decena para un "250+" honesto y estable.
  const countLabel = `${Math.floor(productCount / 10) * 10}+`;

  return (
    <section className="py-20 md:py-28 bg-bg-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 text-primary font-bold tracking-[0.2em] uppercase text-xs mb-5 bg-primary/5 border border-primary/15 px-5 py-2 rounded-full">
            <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
              warehouse
            </span>
            Por qué Fuller
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-primary leading-tight">
            El origen de tu negocio está aquí
          </h2>
          <p className="mt-5 text-gray-500 text-lg leading-relaxed">
            No importamos por encargo ni te hacemos esperar. Variedad, stock y
            respaldo en Bogotá para que arranques sin frenos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_FULLER.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-2xl bg-white border border-gray-100 p-6 shadow-sm"
            >
              <div className="w-12 h-12 shrink-0 rounded-xl bg-accent/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-accent" style={{ fontSize: "24px" }}>
                  {item.icon}
                </span>
              </div>
              <div>
                <h3 className="font-display font-black text-primary text-lg mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc.replace("{count}", countLabel)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
