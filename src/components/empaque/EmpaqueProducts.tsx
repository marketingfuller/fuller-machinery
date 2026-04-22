"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSettings } from "@/components/SettingsProvider";
import { rewriteWhatsAppNumber } from "@/lib/whatsapp";

const products = [
  {
    name: "Empacadora al Vacío DZ-400 Industrial",
    badge: "Industrial",
    badgeColor: "bg-[#4ab84c]",
    image: "/images/empaque/Empacadora DZ-400.webp",
    desc: "Empacado al vacío profesional para carnicerías, fruterías y cocinas industriales. Alta potencia y ciclos rápidos.",
    specs: ["750 W", "2–3 ciclos/min", "Barra 280mm"],
    fichaUrl: "https://tienda.fullermachinery.com/index.php/producto/empacadora-al-vacio-dz-400/",
    whatsappUrl: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20la%20Empacadora%20al%20Vac%C3%ADo%20DZ-400",
  },
  {
    name: "Empacadora al Vacío DZ300SE",
    badge: "Carnicerías",
    badgeColor: "bg-secondary",
    image: "/images/empaque/Empacadora DZ300SE.webp",
    desc: "Compacta para carnes, quesos, frutas y granos. Ideal para panaderías, tiendas saludables y pequeños negocios.",
    specs: ["150 W", "110V", "Barra 30cm"],
    fichaUrl: "https://tienda.fullermachinery.com/index.php/producto/empacadora-al-vacio-dz300se/",
    whatsappUrl: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20la%20Empacadora%20al%20Vac%C3%ADo%20DZ300SE",
  },
  {
    name: "Empacadora al Vacío Doble Cámara 2SB",
    badge: "Alto Volumen",
    badgeColor: "bg-accent text-bg-dark",
    image: "/images/empaque/Empacadora Doble Camara 2SB.webp",
    desc: "Doble cámara con barras de 40 cm para empacado al vacío de alto volumen en supermercados y plantas de producción.",
    specs: ["40 cm barra", "2 cámaras", "Industrial"],
    fichaUrl: "https://tienda.fullermachinery.com/index.php/producto/empacadora-al-vacio-doble-camara-2sb-doble-barra/",
    whatsappUrl: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20la%20Empacadora%20Doble%20C%C3%A1mara%202SB",
  },
  {
    name: "Selladora Banda Continua con Impresora",
    badge: "Trazabilidad",
    badgeColor: "bg-primary",
    image: "/images/empaque/Selladora Banda Impresora.webp",
    desc: "Sellado continuo con impresión de fecha y lote integrada. Operación vertical y horizontal para cualquier producto.",
    specs: ["750 W", "Tinta integrada", "Vert/Horiz"],
    fichaUrl: "https://tienda.fullermachinery.com/index.php/producto/selladora-bolsas-banda-continua-impresora/",
    whatsappUrl: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20la%20Selladora%20Banda%20Continua%20con%20Impresora",
  },
  {
    name: "Selladora Banda Continua Industrial",
    badge: "Alta Velocidad",
    badgeColor: "bg-[#4ab84c]",
    image: "/images/empaque/Selladora Banda Industrial.webp",
    desc: "Sellado de alto volumen con fechador integrado. Ideal para plantas de snacks, café molido y polvos.",
    specs: ["150 sellos/min", "0–300 °C", "Fechador"],
    fichaUrl: "https://tienda.fullermachinery.com/index.php/producto/selladora-bolsas-industrial-banda-continua/",
    whatsappUrl: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20la%20Selladora%20Banda%20Continua%20Industrial",
  },
  {
    name: "Selladora de Vasos Full Automática",
    badge: "Top Delivery",
    badgeColor: "bg-purple-600",
    image: "/images/empaque/Selladora Vasos Full Automatica.webp",
    desc: "Sellado 100% automático de vasos para volumen comercial. Hermeticidad total para bebidas y postres a domicilio.",
    specs: ["Automática", "110V", "Uso continuo"],
    fichaUrl: "https://tienda.fullermachinery.com/index.php/producto/selladora-de-vasos-full-automatica/",
    whatsappUrl: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20la%20Selladora%20de%20Vasos%20Full%20Autom%C3%A1tica",
  },
  {
    name: "Selladora de Vasos Manual",
    badge: "Cafeterías",
    badgeColor: "bg-secondary",
    image: "/images/empaque/Selladora Vasos Manual.webp",
    desc: "Sellado manual con contador digital. Compatible con vasos de 7 a 22 oz — ideal para juguerías y bares de café.",
    specs: ["7–22 oz", "140–160 vasos/h", "Contador"],
    fichaUrl: "https://tienda.fullermachinery.com/index.php/producto/selladora-de-vasos-manual-contador-digital/",
    whatsappUrl: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20la%20Selladora%20de%20Vasos%20Manual",
  },
  {
    name: "Selladora de Latas Plásticas",
    badge: "Snacks & Bebidas",
    badgeColor: "bg-accent text-bg-dark",
    image: "/images/empaque/Selladora Latas.webp",
    desc: "Sellado hermético de latas PET y PP para snacks, granos, especias y bebidas. Acero inoxidable.",
    specs: ["15 latas/min", "110V", "Acero Inox"],
    fichaUrl: "https://tienda.fullermachinery.com/index.php/producto/selladora-de-latas-plasticas/",
    whatsappUrl: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20la%20Selladora%20de%20Latas%20Pl%C3%A1sticas",
  },
];

export default function EmpaqueProducts() {
  const { whatsappCommercial } = useSettings();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 360;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section id="productos" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-[#4ab84c] font-bold text-sm uppercase tracking-widest block mb-2">
              Equipamiento Destacado
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900">
              Catálogo de Empaque
            </h2>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                aria-label="Anterior"
                onClick={() => scroll("left")}
                className="size-10 rounded-full border border-slate-200 hover:border-primary hover:text-primary text-slate-500 flex items-center justify-center transition-colors shadow-sm hover:shadow"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <button
                type="button"
                aria-label="Siguiente"
                onClick={() => scroll("right")}
                className="size-10 rounded-full border border-slate-200 hover:border-primary hover:text-primary text-slate-500 flex items-center justify-center transition-colors shadow-sm hover:shadow"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
            <a
              href="https://tienda.fullermachinery.com/index.php/categoria-producto/equipos-de-empaque/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-secondary transition-colors"
            >
              Ver todo el catálogo
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>
        </div>

        <div ref={scrollRef} className="overflow-x-auto pb-4 -mx-4 px-4 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-6 w-max">
            {products.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 220, damping: 24 }}
                className="w-[300px] md:w-[340px] bg-white border border-slate-100 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex-shrink-0 group flex flex-col"
              >
                <div className="relative h-64 bg-slate-50 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={`${p.name} — Maquinaria de empaque y sellado al vacío | Fuller Machinery Colombia`}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-4 left-4 z-10 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider text-white ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                  <span className="absolute top-4 right-4 z-10 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded-full border border-emerald-200 uppercase flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px]">local_shipping</span>
                    Envío Seguro
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-lg text-slate-900 mb-1.5 leading-snug">{p.name}</h3>
                  <p className="text-slate-500 text-sm mb-4 leading-relaxed line-clamp-3">{p.desc}</p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.specs.map((s, j) => (
                      <span key={j} className="bg-slate-100 text-slate-600 text-[11px] font-semibold px-2.5 py-1 rounded-md">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 mt-auto">
                    <a
                      href={rewriteWhatsAppNumber(p.whatsappUrl, whatsappCommercial)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold text-sm py-2.5 rounded-lg transition-all hover:shadow-md hover:shadow-green-600/25"
                    >
                      <span className="material-symbols-outlined text-[16px]">chat</span>
                      Cotizar por WhatsApp
                    </a>
                    <a
                      href={p.fichaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 text-primary hover:text-secondary font-bold text-xs transition-colors"
                    >
                      Ver ficha técnica
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
