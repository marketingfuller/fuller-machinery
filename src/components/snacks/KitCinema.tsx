import { CheckCircle } from "lucide-react";

const items = [
  "Crispetera Nostalgia 850 (olla 2.5 oz)",
  "Calentador de Salsas 2 Puestos",
  "Freidor Vertical de Salchichas Egg Roller",
];

const whatsappUrl =
  "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20el%20Kit%20Cine%20en%20Casa%20%28Crispetera%20Nostalgia%20%2B%20Calentador%20de%20Salsas%20%2B%20Egg%20Roller%29";

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
              Todo lo que necesitas para montar un punto de snacks estilo cine: crispetas recién hechas, perros calientes crocantes y salsas siempre a temperatura perfecta.
            </p>
            <ul className="space-y-3 mb-8">
              {items.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/85">
                  <CheckCircle size={20} className="text-accent shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 self-start bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-green-600/30 hover:-translate-y-0.5"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              Cotizar Kit por WhatsApp
            </a>
          </div>

          {/* Image */}
          <div className="md:w-1/2 relative h-72 md:h-auto min-h-[300px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('/images/Snacks y fast food/Kit Cine en Casa SNACK.webp')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/50 to-transparent md:bg-gradient-to-l md:from-bg-dark/40 md:to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
