"use client";

import { motion } from "framer-motion";
import { Store, Building2, Phone, MapPin } from "lucide-react";

const sedes = [
  {
    icon: Store,
    tag: "Sede principal & Showroom",
    address: "Calle 63B #79-35, Bogotá",
    phones: [
      { label: "Recepción", number: "310 285 2053", tel: "+573102852053" },
      { label: "Comercial", number: "324 424 7198", tel: "+573244247198" },
      { label: "Técnico", number: "322 853 4925", tel: "+573228534925" },
    ],
    desc: "Atención comercial, showroom con equipos en exhibición y asesoría presencial de compra.",
  },
  {
    icon: Building2,
    tag: "Ricaurte #1",
    address: "Calle 12 #27-09, Bogotá",
    phones: [{ label: "", number: "320 330 5992", tel: "+573203305992" }],
    desc: "Sede de atención en zona Ricaurte. Cercanía para clientes mayoristas y del sector alimentario.",
  },
  {
    icon: Building2,
    tag: "Ricaurte #2",
    address: "Calle 13 #27-11, Bogotá",
    phones: [{ label: "", number: "310 265 9634", tel: "+573102659634" }],
    desc: "Segunda sede en Ricaurte, a una cuadra de la primera. Atención comercial y exhibición complementaria.",
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
            Nuestras sedes
          </p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 mb-3">
            Tres sedes en Bogotá
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
            Tenemos presencia directa en dos zonas clave de Bogotá: la sede
            principal con showroom y dos sedes en Ricaurte.
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
                className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col"
              >
                <div className="size-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                  <Icon size={26} className="text-primary" />
                </div>
                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">
                  {s.tag}
                </p>
                <div className="flex items-start gap-2 text-slate-700 text-sm mb-3">
                  <MapPin size={14} className="shrink-0 mt-0.5 text-slate-400" />
                  <span className="font-semibold">{s.address}</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-1">
                  {s.desc}
                </p>
                <ul className="space-y-1.5 pt-4 border-t border-slate-100">
                  {s.phones.map((p) => (
                    <li key={p.number}>
                      <a
                        href={`tel:${p.tel}`}
                        className="flex items-center gap-2 text-slate-600 hover:text-primary text-sm transition-colors"
                      >
                        <Phone size={13} className="shrink-0 text-slate-400" />
                        {p.label && (
                          <span className="text-slate-400 text-xs">
                            {p.label}:
                          </span>
                        )}
                        <span className="font-semibold">{p.number}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
