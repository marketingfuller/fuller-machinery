"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

const categories = [
  {
    title: "Snacks y Fast Food",
    desc: "Waffleras, máquinas de crispetas, crepes y todo el equipo para alta rotación en locales de paso.",
    tag: "Alta Rentabilidad",
    image: "/images/negocios/Snacks y fast food negocios.webp",
    accentColor: "#ef5350",
    href: "https://tienda.fullermachinery.com/index.php/categoria-producto/comida-divertida/?per_page=24",
    external: true,
  },
  {
    title: "Bebidas y Café",
    desc: "Granizadoras, dispensadores, máquinas de helado soft y equipos para bebidas calientes premium.",
    image: "/images/negocios/Bebidas y cafe negocios.webp",
    accentColor: "#4ab84c",
    href: "https://tienda.fullermachinery.com/index.php/categoria-producto/preparacion-de-bebidas/",
    external: true,
  },
  {
    title: "Panadería",
    desc: "Hornos de convección, batidoras planetarias, amasadoras espirales y cuarto de crecimiento.",
    image: "/images/negocios/panaderia negocios.webp",
    accentColor: "#F59E0B",
    href: "https://tienda.fullermachinery.com/index.php/categoria-producto/preparacion-de-alimentos/hornos/",
    external: true,
  },
  {
    title: "Refrigeración y Exhibición",
    desc: "Vitrinas refrigeradas, congeladores horizontales, fabricadores de hielo y trituradoras de hielo.",
    image: "/images/negocios/refrigeracion y exhibicion negocios.webp",
    accentColor: "#4ab84c",
    href: "https://tienda.fullermachinery.com/index.php/categoria-producto/maquinas-de-frio/",
    external: true,
  },
  {
    title: "Carnicería y Procesos",
    desc: "Sierras para hueso, molinos de carne industriales, básculas especializadas y mesas de trabajo.",
    image: "/images/negocios/carniceria y procesos.webp",
    accentColor: "#d32f2f",
    href: "https://tienda.fullermachinery.com/?s=carne&post_type=product&product_cat=0",
    external: true,
  },
  {
    title: "Empaque Industrial",
    desc: "Empacadoras al vacío de cámara, selladoras de banda continua y selladoras de vasos y latas.",
    image: "/images/negocios/empaques negocios.webp",
    accentColor: "#d32f2f",
    href: "https://tienda.fullermachinery.com/index.php/categoria-producto/equipos-de-empaque/page/2/",
    external: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 240, damping: 22 },
  },
};

export default function CategoryGrid() {
  return (
    <section className="relative z-30 -mt-20 container mx-auto px-4 sm:px-6 lg:px-8 mb-28 max-w-7xl">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {categories.map((cat, i) => (
          <motion.article
            key={i}
            variants={itemVariants}
            aria-label={`${cat.title} — ${cat.desc}`}
            className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-slate-100 transition-all duration-300 cursor-pointer"
            style={{ willChange: 'transform' }}
            whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 25 } }}
          >
            {/* Image area */}
            <div className="relative h-56 overflow-hidden">
              {/* Tag badge */}
              {cat.tag && (
                <span className="absolute top-4 left-4 z-10 bg-accent text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                  {cat.tag}
                </span>
              )}

              {/* Background image with zoom on hover */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${cat.image}')` }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Colored bottom border on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ backgroundColor: cat.accentColor }}
              />
            </div>

            {/* Content */}
            <div className="p-7 flex flex-col flex-1">
              <h3 className="text-xl font-display font-bold text-primary mb-3 leading-tight">
                {cat.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-6">
                {cat.desc}
              </p>

              {/* CTA */}
              {(cat as any).href ? (
                <Link
                  href={(cat as any).href}
                  {...((cat as any).external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="w-full py-3 px-6 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm transition-all duration-200 group-hover:shadow-lg group-hover:shadow-secondary/25"
                >
                  Ver Equipos
                  <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </Link>
              ) : (
                <button className="w-full py-3 px-6 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm transition-all duration-200 group-hover:shadow-lg group-hover:shadow-secondary/25">
                  Ver Equipos
                  <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </button>
              )}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
