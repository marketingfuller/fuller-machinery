export default function Testimonial() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* Photo */}
          <div className="w-full md:w-1/3 relative shrink-0">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl md:-rotate-3 border-4 border-white relative">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('/images/panaderia/testimonio panaderia.png')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="font-bold text-sm">Carlos Méndez</div>
                <div className="text-xs text-accent">
                  Panadería La Espiga, Bogotá
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg hidden md:block">
              <span className="material-symbols-outlined text-accent text-4xl">
                stars
              </span>
            </div>
          </div>

          {/* Quote */}
          <div className="w-full md:w-2/3 relative">
            <span className="material-symbols-outlined text-accent/30 text-8xl absolute -top-10 -left-4 select-none leading-none">
              format_quote
            </span>
            <blockquote className="relative z-10">
              <p className="font-display font-bold text-2xl md:text-3xl text-primary leading-normal mb-6">
                "Pasé de sacar 200 panes al día sufriendo con un horno casero,
                a 1.000 piezas perfectas antes del mediodía. La inversión se
                pagó sola en 4 meses."
              </p>
              <div className="flex items-center gap-2">
                <div className="flex text-accent gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="text-slate-400 text-sm font-semibold">
                  Cliente Verificado
                </span>
              </div>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
