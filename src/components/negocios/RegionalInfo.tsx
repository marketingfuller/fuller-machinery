"use client";

import React from 'react';
import { motion } from 'framer-motion';

const sedes = [
  {
    name: "Sede Principal",
    address: "Calle 63B #79-35, Bogotá",
    desc: "Nuestra sede principal con showroom completo, atención comercial, servicio técnico y despacho de pedidos a todo el país.",
    icon: "storefront",
    highlights: ["Showroom con equipos en vivo", "Asesoría personalizada", "Despacho nacional"],
    phones: [
      { label: "Recepción", number: "310 285 2053" },
      { label: "Comercial", number: "324 424 7198" },
      { label: "Técnico", number: "322 853 4925" },
    ],
  },
  {
    name: "Sede Ricaurte #1",
    address: "Calle 12 #27-09, Bogotá",
    desc: "Punto de venta y exhibición en el corazón de Ricaurte, el sector de maquinaria más importante de Bogotá.",
    icon: "location_city",
    highlights: ["Equipos disponibles", "Atención directa", "Barrio Ricaurte"],
    phones: [
      { label: "Contacto", number: "320 330 5992" },
    ],
  },
  {
    name: "Sede Ricaurte #2",
    address: "Calle 13 #27-11, Bogotá",
    desc: "Segunda sede en Ricaurte para mayor capacidad de exhibición y atención al cliente en el sector industrial.",
    icon: "store",
    highlights: ["Amplia exhibición", "Atención al cliente", "Barrio Ricaurte"],
    phones: [
      { label: "Contacto", number: "310 265 9634" },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 22, delay: i * 0.1 },
  }),
};

export default function RegionalInfo() {
  return (
    <section className="py-20 bg-bg-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">

        {/* Native details/summary accordion */}
        <details className="group bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg open:shadow-xl open:border-primary/20 transition-all duration-300 overflow-hidden">

          {/* Summary trigger */}
          <summary className="list-none cursor-pointer p-7 md:p-9 flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/[0.08] rounded-xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-accent text-[26px]">public</span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400 mb-1">Cobertura</p>
                <h2 className="text-xl md:text-2xl font-display font-bold text-primary leading-tight group-hover:text-accent transition-colors">
                  Cobertura en Todo Colombia · 3 Sedes en Bogotá
                </h2>
              </div>
            </div>

            {/* Toggle icon — rotates via CSS group-open */}
            <div className="shrink-0 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-all duration-300 group-open:bg-primary group-open:border-primary group-hover:border-primary">
              <span className="material-symbols-outlined text-xl text-gray-400 transition-transform duration-300 group-open:rotate-180 group-open:text-white group-hover:text-primary">
                expand_more
              </span>
            </div>
          </summary>

          {/* Expandable content */}
          <div className="px-7 md:px-9 pb-9 border-t border-gray-100">
            <p className="text-gray-400 text-sm mt-6 mb-8 max-w-2xl">
              Con{' '}
              <strong className="text-primary">3 sedes físicas en Bogotá</strong>{' '}
              y envíos a todo Colombia. Compra con confianza: stock disponible, despacho rápido y servicio técnico certificado en todo el país.
            </p>

            {/* Sede cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sedes.map((sede, i) => (
                <motion.div
                  key={sede.name}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex flex-col bg-gray-50/80 border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-primary/20 transition-all duration-200 group/card"
                >
                  {/* Icon + name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/[0.08] rounded-xl flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary" style={{ fontSize: '22px' }}>{sede.icon}</span>
                    </div>
                    <h3 className="text-lg font-display font-bold text-primary">{sede.name}</h3>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-2 mb-4">
                    <span className="material-symbols-outlined text-accent shrink-0 mt-0.5" style={{ fontSize: '16px' }}>location_on</span>
                    <p className="text-xs text-gray-600 font-semibold leading-relaxed">{sede.address}</p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">{sede.desc}</p>

                  {/* Highlights */}
                  <div className="space-y-2 mb-5">
                    {sede.highlights.map((hl) => (
                      <div key={hl} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-accent" style={{ fontSize: '14px' }}>check_circle</span>
                        <span className="text-gray-600 text-xs font-medium">{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Phones */}
                  <div className="space-y-1.5">
                    {sede.phones.map((p) => (
                      <a
                        key={p.number}
                        href={`tel:+57${p.number.replace(/\s/g, '')}`}
                        className="flex items-center gap-2 text-primary font-bold text-xs group-hover/card:text-accent transition-colors"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>call</span>
                        {p.label && <span className="text-gray-400 font-normal">{p.label}:</span>}
                        {p.number}
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </details>

      </div>
    </section>
  );
}
