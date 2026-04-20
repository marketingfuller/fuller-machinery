"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const team = [
  {
    image: "/images/nosotros/angie-loaiza.webp",
    name: "Angie Loaiza",
    role: "Directora Comercial",
    quote:
      "Antes de recomendarte una máquina, me interesa entender cómo funciona tu negocio. Así te vendo lo que de verdad necesitas, no lo más caro.",
  },
  {
    image: "/images/nosotros/ivan-parra.webp",
    name: "Iván Parra",
    role: "Jefe de Ingeniería",
    quote:
      "Al revisar tu máquina, me interesa entender qué pasó y cómo la estás usando. Así solucionamos la causa real del problema, no solo el daño visible.",
  },
  {
    image: "/images/nosotros/astrid-solano.webp",
    name: "Astrid Solano",
    role: "Contadora",
    quote:
      "Te acompaño con facturas, formas de pago y financiación para que la compra no sea un dolor de cabeza y tu negocio siga caminando.",
  },
];

const WHATSAPP_URL =
  "https://wa.me/573244247198?text=" +
  encodeURIComponent(
    "Hola, me gustaría hablar con un asesor comercial de Fuller Machinery."
  );

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 22 },
  },
};

export default function NosotrosEquipo() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-20">
          <p className="text-secondary font-bold text-xs uppercase tracking-widest mb-2">
            El equipo Fuller
          </p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900">
            Las personas detrás de cada compra
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-14"
        >
          {team.map((member, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative w-full max-w-[280px] aspect-[4/5] rounded-3xl overflow-hidden mb-6 shadow-lg shadow-slate-300/40 ring-1 ring-slate-100 bg-slate-50">
                <Image
                  src={member.image}
                  alt={`${member.name} — ${member.role}, Fuller Machinery`}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  sizes="(max-width: 768px) 280px, 320px"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </div>
              <h3 className="font-display font-bold text-2xl text-slate-900 mb-1">
                {member.name}
              </h3>
              <p className="text-secondary font-semibold text-sm uppercase tracking-wide mb-4">
                {member.role}
              </p>
              <p className="text-slate-500 text-[15px] leading-relaxed max-w-xs italic">
                &ldquo;{member.quote}&rdquo;
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-green-700/20 transition-all hover:-translate-y-1 text-sm uppercase tracking-wide"
          >
            <span className="material-symbols-outlined text-[22px]">chat</span>
            Hablar con un asesor
          </a>
        </motion.div>
      </div>
    </section>
  );
}
