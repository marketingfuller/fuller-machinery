import { Truck, Wrench, CreditCard } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Envíos Nacionales",
    desc: "A todo el país",
    color: "#4ab84c",
  },
  {
    icon: Wrench,
    title: "Servicio Técnico",
    desc: "Propio y certificado",
    color: "#4ab84c",
  },
  {
    icon: CreditCard,
    title: "Financiación",
    desc: "Planes flexibles",
    color: "#d32f2f",
  },
];

export default function TrustBar() {
  return (
    <section className="relative bg-bg-dark border-y border-white/5 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-4">
          {features.map((feat, i) => (
            <div
              key={i}
              className="flex items-center gap-4 justify-center lg:justify-start group"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${feat.color}12` }}
              >
                <feat.icon size={22} style={{ color: feat.color }} />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{feat.title}</p>
                <p className="text-white/60 text-xs">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
