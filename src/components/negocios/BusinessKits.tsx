"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/cn';
import { useSettings } from "@/components/SettingsProvider";

const kits = [
  {
    id: "perros",
    title: "Punto de Perros Calientes",
    subtitle: "Toppings y salsas ilimitadas: el negocio de alta rotación que engancha desde el primer mordisco.",
    items: [
      { label: "Asador de Salchichas 9 Rodillos", icon: "outdoor_grill" },
      { label: "Vaporizador de Salchicha y Pan", icon: "whatshot" },
      { label: "Baño María Eléctrico 3 Puestos", icon: "soup_kitchen" },
    ],
    popular: false,
    emoji: "🌭",
    borderClass: "border-orange-100",
    btnClass: "bg-secondary text-white hover:bg-secondary/90",
  },
  {
    id: "crispetas",
    title: "Isla de Crispetas de Sabores",
    subtitle: "Crispetas en mil sabores que conquistan centros comerciales, parques y eventos — alta rotación, bajo costo operativo.",
    items: [
      { label: "Crispetara 8 Onzas de Lujo", icon: "local_movies" },
      { label: "Vitrina Calefactora de Mostrador", icon: "storefront" },
      { label: "Dispensador de Jugo 3 Tanques", icon: "local_bar" },
    ],
    popular: true,
    emoji: "🍿",
    borderClass: "border-primary/20",
    btnClass: "bg-secondary text-white hover:bg-secondary/90 shadow-lg hover:shadow-xl shadow-secondary/25",
  },
  {
    id: "sodas",
    title: "Sodas Artesanales en Lata",
    subtitle: "Bebidas gasificadas con trozos de fruta, selladas y brandeadas en latas PET — el negocio viral para markets, eventos y redes sociales.",
    items: [
      { label: "Selladora de Latas Plásticas", icon: "inventory_2" },
      { label: "Latas Plásticas PET", icon: "water_bottle_large" },
      { label: "Gasificadora de Líquidos", icon: "bubble_chart" },
    ],
    popular: false,
    emoji: "🥤",
    borderClass: "border-red-100",
    btnClass: "bg-secondary text-white hover:bg-secondary/90",
  },
];

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function BusinessKits() {
  const { whatsappCommercial } = useSettings();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 bg-white overflow-hidden">
      {/* Section header */}
      <motion.div
        ref={ref}
        variants={headerVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center max-w-3xl"
      >
        <span className="inline-flex items-center gap-2 text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-5 bg-secondary/5 border border-secondary/15 px-5 py-2 rounded-full">
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>rocket_launch</span>
          Emprende en 48 horas
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-primary leading-tight">
          ¿Vas a abrir un local nuevo?{' '}
          <br className="hidden md:block" />
          <span className="text-accent-dark">Empieza con ventaja.</span>
        </h2>
        <p className="mt-5 text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
          Kits de maquinaria curados por nuestros ingenieros. Todo lo que necesitas, al mejor precio combinado.
        </p>
      </motion.div>

      {/* Carousel */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-10 pt-8 -mx-4 px-4 sm:px-6 no-scrollbar"
          style={{ scrollPaddingLeft: '1rem' }}
        >
          {kits.map((kit, i) => (
            <motion.div
              key={kit.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "snap-center shrink-0 w-[88vw] sm:w-[70vw] md:w-[50vw] lg:w-[36vw] max-w-[400px]",
                "relative flex flex-col rounded-3xl p-8 border-2 transition-all duration-300",
                kit.popular
                  ? "border-primary shadow-2xl shadow-primary/15 scale-[1.02]"
                  : cn(kit.borderClass, "shadow-lg border")
              )}
              style={{
                background: kit.popular
                  ? 'linear-gradient(145deg, #f0fdf4, #ffffff)'
                  : 'white',
              }}
              whileHover={{ y: -5, transition: { type: "spring", stiffness: 300, damping: 25 } }}
            >
              {/* Popular badge */}
              {kit.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white text-[11px] font-bold px-5 py-2 rounded-full uppercase tracking-widest shadow-lg z-10 flex items-center gap-1.5 whitespace-nowrap">
                  <span className="material-symbols-outlined text-accent" style={{ fontSize: '14px' }}>star</span>
                  Más Popular
                </div>
              )}

              {/* Kit header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={cn(
                  "text-4xl w-16 h-16 rounded-2xl flex items-center justify-center shrink-0",
                  kit.popular ? "bg-primary/10" : "bg-gray-50"
                )}>
                  {kit.emoji}
                </div>
                <div>
                  <h3 className="text-xl font-display font-black text-primary leading-tight">{kit.title}</h3>
                  <p className="text-gray-400 text-xs mt-1 leading-snug max-w-[180px]">{kit.subtitle}</p>
                </div>
              </div>

              {/* Items list */}
              <div className="space-y-3 mb-8 flex-1">
                {kit.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-accent/10 shrink-0">
                      <span className="material-symbols-outlined text-accent" style={{ fontSize: '18px' }}>{item.icon}</span>
                    </div>
                    <span className="text-gray-700 font-medium text-sm">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href={`https://wa.me/${whatsappCommercial}?text=${encodeURIComponent(`Hola, me interesa el kit ${kit.title}. ¿Podrían enviarme una cotización?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "w-full py-4 px-6 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 text-sm",
                  kit.btnClass
                )}>
                Solicitar Cotización
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Scroll hint — mobile only */}
        <p className="text-center mt-4 text-gray-400 text-xs flex items-center justify-center gap-1.5 lg:hidden">
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>swipe</span>
          Desliza para ver más kits
        </p>
      </div>
    </section>
  );
}
