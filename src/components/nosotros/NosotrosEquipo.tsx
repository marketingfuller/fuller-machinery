"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const team = [
  {
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80",
    name: "Ana Martínez",
    role: "Experta Comercial",
    quote:
      "Mi meta es entender tu modelo de negocio para recomendarte el equipo con mejor ROI.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80",
    name: "Ing. Carlos Ruiz",
    role: "Jefe de Ingeniería",
    quote:
      "Superviso personalmente las pruebas de estrés de cada lote que llega a bodega.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&q=80",
    name: "Lucía Méndez",
    role: "Gerente de Logística",
    quote:
      "Me aseguro de que tu equipo llegue seguro y a tiempo, estés donde estés.",
  },
];

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-secondary font-bold text-xs uppercase tracking-widest mb-2">
            Gente Real
          </p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900">
            Detrás de la tecnología, hay personas
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
              {/* Avatar */}
              <div className="relative w-44 h-44 rounded-full overflow-hidden mb-6 border-4 border-slate-100 shadow-xl group-hover:border-primary transition-all duration-300">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 mb-1">
                {member.name}
              </h3>
              <p className="text-secondary font-semibold text-sm mb-3">
                {member.role}
              </p>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                "{member.quote}"
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1fbc5a] text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-green-900/20 transition-all hover:-translate-y-1 text-sm uppercase tracking-wide"
          >
            <span className="material-symbols-outlined text-[22px]">chat</span>
            Hablar con un Asesor Humano
          </a>
        </motion.div>
      </div>
    </section>
  );
}
