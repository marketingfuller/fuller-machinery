"use client";

import { motion } from "framer-motion";
import { Store, Warehouse, Wrench } from "lucide-react";

const sedes = [
  {
    icon: Store,
    title: "Sede principal",
    sub: "Showroom + ventas",
    desc: "Punto de atención comercial con equipos en exhibición, asesoría de compra y capacitación presencial.",
  },
  {
    icon: Warehouse,
    title: "Sede de bodega",
    sub: "Stock y despacho",
    desc: "Almacén de equipos importados y accesorios, desde donde despachamos pedidos a todo el país.",
  },
  {
    icon: Wrench,
    title: "Sede de servicio técnico",
    sub: "Reparación y repuestos",
    desc: "Área de mantenimiento técnico Fuller: recepción de equipos para reparación y bodega de repuestos originales.",
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
        <div className="text-center mb-14">
          <p className="text-primary font-bold text-xs uppercase tracking-widest mb-2">
            Nuestras instalaciones
          </p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 mb-3">
            Tres sedes en Bogotá
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
            Atendemos comercialmente, despachamos y damos servicio técnico
            desde nuestras propias instalaciones — no tercerizamos.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {sedes.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <div className="size-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                  <Icon size={26} className="text-primary" />
                </div>
                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">
                  {s.sub}
                </p>
                <h3 className="font-display font-bold text-xl text-slate-900 mb-2.5">
                  {s.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
