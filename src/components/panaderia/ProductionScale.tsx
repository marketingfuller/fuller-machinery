export default function ProductionScale() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display font-black text-3xl md:text-4xl text-primary mb-4">
            Selecciona tu Escala de Producción
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Equipos dimensionados para cada etapa de crecimiento de tu negocio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 h-auto md:h-[500px]">
          {/* Artisanal */}
          <a
            href="https://tienda.fullermachinery.com/?s=hornos&post_type=product&product_cat=0"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer h-[400px] md:h-full"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=600&fit=crop&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
              <span className="material-symbols-outlined text-accent text-5xl mb-2 block">
                bakery_dining
              </span>
              <h3 className="font-display font-black text-3xl text-white mb-2">
                Panadería Artesanal
              </h3>
              <p className="text-slate-200 text-sm md:text-base mb-6 opacity-90">
                Lotes pequeños, control manual y hornos de convección para
                acabados rústicos perfectos.
              </p>
              <span className="inline-flex items-center text-accent font-bold uppercase text-xs tracking-wider group-hover:translate-x-2 transition-transform">
                Explorar Línea Artesana
                <span className="material-symbols-outlined text-base ml-1">
                  arrow_forward
                </span>
              </span>
            </div>
          </a>

          {/* Industrial */}
          <a
            href="https://tienda.fullermachinery.com/?s=amasadora&post_type=product&product_cat=0"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer h-[400px] md:h-full"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('/images/panaderia/panaderia industrial.png')",
              }}
            />
            <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
              <span className="material-symbols-outlined text-white text-5xl mb-2 block">
                conveyor_belt
              </span>
              <h3 className="font-display font-black text-3xl text-white mb-2">
                Producción Industrial
              </h3>
              <p className="text-slate-200 text-sm md:text-base mb-6 opacity-90">
                Volumen masivo, automatización y cámara de crecimiento para
                máxima eficiencia.
              </p>
              <span className="inline-flex items-center text-white font-bold uppercase text-xs tracking-wider group-hover:translate-x-2 transition-transform">
                Explorar Línea Industrial
                <span className="material-symbols-outlined text-base ml-1">
                  arrow_forward
                </span>
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
