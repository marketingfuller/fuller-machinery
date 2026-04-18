"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const team = [
  {
    image: "/images/nosotros/angie-loaiza.webp",
    name: "Angie Loaiza",
    role: "Directora Comercial",
  },
  {
    image: "/images/nosotros/ivan-parra.webp",
    name: "Iván Parra",
    role: "Jefe de Ingeniería",
  },
  {
    image: "/images/nosotros/astrid-solano.webp",
    name: "Astrid Solano",
    role: "Contadora",
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
    transition: { staggerChildren: 0.14, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 220, damping: 24 },
  },
};

export default function NosotrosEquipo() {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14"
        >
          {team.map((member, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative w-44 h-44 rounded-full overflow-hidden mb-6 border-4 border-slate-100 shadow-xl group-hover:border-primary transition-all duration-300 bg-slate-50">
                <Image
                  src={member.image}
                  alt={`${member.name} — ${member.role}, Fuller Machinery`}
                  fill
                  className="object-cover"
                  sizes="176px"
                />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 mb-1">
                {member.name}
              </h3>
              <p className="text-secondary font-semibold text-sm">
                {member.role}
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
