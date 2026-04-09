import { CheckCircle } from "lucide-react";

const items = [
  "Máquina de Crispetas 8oz",
  "Dispensador de Queso Caliente",
  "Vitrina de Nachos Calefaccionada",
];

export default function KitCinema() {
  return (
    <section className="py-12 px-4 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-bg-dark to-[#025202] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
          {/* Content */}
          <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
            <div className="inline-block bg-secondary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase mb-4 self-start tracking-wider">
              Oferta Especial
            </div>
            <h2 className="font-display font-black text-3xl md:text-4xl text-white mb-4">
              Kit Cine en Casa / Local
            </h2>
            <p className="text-white/70 mb-8 text-lg leading-relaxed">
              Todo lo que necesitas para montar un punto de snacks estilo cine. Incluye crispetera profesional, dispensador de nachos y calentador de queso.
            </p>
            <ul className="space-y-3 mb-8">
              {items.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/85">
                  <CheckCircle size={20} className="text-accent shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div>
                <span className="block text-white/40 text-sm line-through">Precio Regular: $850</span>
                <span className="block text-3xl font-bold text-white">$699 USD</span>
              </div>
              <button className="bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-lg hover:shadow-secondary/30">
                Comprar Kit Completo
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="md:w-1/2 relative h-72 md:h-auto">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=800&q=80')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/50 to-transparent md:bg-gradient-to-l md:from-bg-dark/40 md:to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
