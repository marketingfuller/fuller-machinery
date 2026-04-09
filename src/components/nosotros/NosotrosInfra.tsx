"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const locations = [
  {
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=500&fit=crop&q=80",
    title: "Showroom Interactivo",
    sub: "Ven a verlas y tocarlas",
    desc: "Más de 500 equipos en exhibición listos para demostración en vivo.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=500&fit=crop&q=80",
    title: "Mega Bodega",
    sub: "Inventario disponible",
    desc: "Stock real para entregas inmediatas sin tiempos de espera.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1581092160607-ee67df57d4d5?w=800&h=500&fit=crop&q=80",
    title: "Taller Especializado",
    sub: "Laboratorio de pruebas",
    desc: "Donde nuestros ingenieros certifican cada máquina antes de salir.",
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

export default function NosotrosInfra() {
  return (
    <section className="py-20 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-primary font-bold text-xs uppercase tracking-widest mb-2">
            Infraestructura Real
          </p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 mb-3">
            Lo que ves en internet, existe.
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
            Te invitamos a conocer nuestras instalaciones donde la magia sucede
            cada día.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {locations.map((loc, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <Image
                src={loc.image}
                alt={loc.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/95 via-bg-dark/30 to-transparent" />
              {/* Content */}
              <div className="absolute bottom-0 left-0 p-7">
                <p className="text-accent text-xs font-bold uppercase tracking-widest mb-1">
                  {loc.sub}
                </p>
                <h3 className="text-white font-display font-bold text-xl mb-1.5">
                  {loc.title}
                </h3>
                <p className="text-white/55 text-xs leading-relaxed">
                  {loc.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
