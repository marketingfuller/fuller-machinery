export default function KitBundle() {
  const images = [
    "/images/panaderia/amasadora tarjeta oferta.png",
    "/images/panaderia/Horno tarjeta oferta.png",
    "/images/panaderia/laminadora tarjeta oferta.png",
    "/images/panaderia/vitrina tarjeta oferta.png",
  ];

  return (
    <section className="py-20 bg-bg-dark text-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 skew-x-12 translate-x-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-primary border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-12 items-center">

            {/* Image grid */}
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -top-6 -left-6 z-20 bg-secondary text-white font-bold px-4 py-2 rounded-lg shadow-lg -rotate-3 uppercase text-sm tracking-wide">
                Oferta Especial
              </div>
              <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden border-4 border-white/20 shadow-2xl">
                {images.map((src, i) => (
                  <div
                    key={i}
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url('${src}')` }}
                  />
                ))}
              </div>
            </div>

            {/* Text */}
            <div className="w-full lg:w-1/2">
              <h2 className="font-display font-black text-3xl md:text-5xl mb-4">
                Kit Panadero de Barrio
              </h2>
              <p className="text-white text-xl font-medium mb-6">
                Tu panadería completa lista para abrir.
              </p>
              <ul className="mb-8 space-y-2">
                {[
                  "Amasadora de 50 Libras",
                  "Horno de Convección 1 Cabina 1 Lata",
                  "Laminadora de Masas",
                  "Vitrina Exhibidora para Panadería",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-400 text-base">check_circle</span>
                    <span className="text-white text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Bonus */}
              <div className="bg-white/10 rounded-lg p-4 mb-8 flex items-center gap-4 border border-white/30">
                <span className="material-symbols-outlined text-white text-4xl">
                  inventory_2
                </span>
                <div>
                  <span className="block text-white font-bold">
                    BONUS GRATUITO
                  </span>
                  <span className="text-white/80 text-sm">
                    2 Bandejas de Acero Inoxidable para Panadería
                  </span>
                </div>
              </div>

              <a
                href={`https://wa.me/573244247198?text=${encodeURIComponent("Hola, me interesa cotizar el Kit Panadero de Barrio que incluye:\n• Amasadora de 50 Libras\n• Horno de Convección 1 Cabina 1 Lata\n• Laminadora de Masas\n• Vitrina Exhibidora para Panadería\n\n¿Me pueden dar más información y precio?")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-bg-dark font-black py-4 px-8 rounded-xl shadow-lg transition-all hover:scale-105 uppercase tracking-wide flex items-center justify-center gap-2"
              >
                Cotizar este Montaje Completo
                <span className="material-symbols-outlined">request_quote</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
