"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const products = [
  {
    name: "Congelador de Piso 538 L",
    badge: "Carnicerías",
    badgeColor: "bg-secondary",
    image: "/images/refrigeracion/Congelador Piso 538L.webp",
    desc: "Horizontal con vidrio templado y cerradura de seguridad. 5 canastillas organizadoras y congelamiento de 28 kg/24h.",
    specs: ["538 L", "5 canastillas", "R290"],
    fichaUrl: "https://tienda.fullermachinery.com/index.php/producto/congelador-de-piso-5-canastillas-538lt/",
    whatsappUrl: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20el%20Congelador%20de%20Piso%20538%20L",
  },
  {
    name: "Congelador Vertical 460 L No Frost",
    badge: "Supermercados",
    badgeColor: "bg-primary",
    image: "/images/refrigeracion/Congelador Vertical 460L.webp",
    desc: "Vertical con tecnología No Frost (sin escarcha) y estantes ajustables. Ideal para exhibición de congelados.",
    specs: ["460 L", "No Frost", "110V"],
    fichaUrl: "https://tienda.fullermachinery.com/index.php/producto/congelador-vertical-460-litros-no-frost/",
    whatsappUrl: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20el%20Congelador%20Vertical%20460%20L%20No%20Frost",
  },
  {
    name: "Fabricadora de Hielo en Cubo 90 kg",
    badge: "Bares & Hoteles",
    badgeColor: "bg-accent text-bg-dark",
    image: "/images/refrigeracion/Fabricadora Hielo 90kg.webp",
    desc: "Alta producción para operación intensiva. Bajo consumo y fácil limpieza para hoteles y bares de alto tráfico.",
    specs: ["90 kg/24h", "Bodega 25 kg", "110V"],
    fichaUrl: "https://tienda.fullermachinery.com/index.php/producto/fabricadora-de-hielo-en-cubo-90kg/",
    whatsappUrl: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20la%20Fabricadora%20de%20Hielo%2090%20kg",
  },
  {
    name: "Fabricadora de Hielo 30 kg con Filtros",
    badge: "Cafeterías",
    badgeColor: "bg-blue-500",
    image: "/images/refrigeracion/Fabricadora Hielo 30kg.webp",
    desc: "Compacta, silenciosa y con filtros de agua incluidos. Producción automática continua para espacios reducidos.",
    specs: ["25–30 kg/24h", "Con filtros", "240 W"],
    fichaUrl: "https://tienda.fullermachinery.com/index.php/producto/fabricadora-de-hielo-fuller-machinery-30kg-cubos-110v-c-filtros/",
    whatsappUrl: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20la%20Fabricadora%20de%20Hielo%2030%20kg%20con%20Filtros",
  },
  {
    name: "Máquina de Hielo 45 kg con Bodega 18 kg",
    badge: "Restaurantes",
    badgeColor: "bg-secondary",
    image: "/images/refrigeracion/Maquina Hielo 45kg.webp",
    desc: "Fabricadora con bodega integrada y conexión dual (red o botellón). Perfecta donde no hay toma de agua fija.",
    specs: ["45 kg/24h", "Bodega 18 kg", "Dual"],
    fichaUrl: "https://tienda.fullermachinery.com/index.php/producto/maquina-hielo-45kg-18kg-bodega-fuller/",
    whatsappUrl: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20la%20M%C3%A1quina%20de%20Hielo%2045%20kg%20con%20Bodega",
  },
  {
    name: "Refrigerador Botellero Mini Bar 191 L",
    badge: "Bares & Tiendas",
    badgeColor: "bg-purple-600",
    image: "/images/refrigeracion/Botellero Mini Bar 191L.webp",
    desc: "Botellero compacto con 2 puertas de vidrio templado y estantes ajustables. Enfriamiento eficiente para bebidas.",
    specs: ["191 L", "2 puertas", "R290"],
    fichaUrl: "https://tienda.fullermachinery.com/index.php/producto/refrigerador-botellero-mini-bar-2-puertas-191l/",
    whatsappUrl: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20el%20Refrigerador%20Botellero%20Mini%20Bar%20191%20L",
  },
  {
    name: "Trituradora de Hielo Mediana",
    badge: "Heladerías & Eventos",
    badgeColor: "bg-accent text-bg-dark",
    image: "/images/refrigeracion/Trituradora Hielo.webp",
    desc: "Compacta en acero inoxidable con base pesada. Hielo triturado o granizado al momento para coctelería y catering.",
    specs: ["120 lb/h", "Acero Inox", "110V"],
    fichaUrl: "https://tienda.fullermachinery.com/index.php/producto/trituradora-de-hielo-mediana/",
    whatsappUrl: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20la%20Trituradora%20de%20Hielo%20Mediana",
  },
];

export default function ProductosRefrigeracion() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 360;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section id="productos" className="bg-[#f5f5f5] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-secondary font-bold text-sm uppercase tracking-widest block mb-2">
              Equipamiento Estrella
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900">
              Catálogo Destacado
            </h2>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                aria-label="Anterior"
                onClick={() => scroll("left")}
                className="size-10 rounded-full border border-slate-200 bg-white hover:border-primary hover:text-primary text-slate-500 flex items-center justify-center transition-colors shadow-sm hover:shadow"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <button
                type="button"
                aria-label="Siguiente"
                onClick={() => scroll("right")}
                className="size-10 rounded-full border border-slate-200 bg-white hover:border-primary hover:text-primary text-slate-500 flex items-center justify-center transition-colors shadow-sm hover:shadow"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
            <a
              href="https://tienda.fullermachinery.com/?s=refrigerador&post_type=product&product_cat=0"
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
                className="w-[300px] md:w-[340px] bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex-shrink-0 group flex flex-col"
              >
                <div className="relative h-56 bg-slate-50 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={`${p.name} — Refrigeración comercial industrial | Fuller Machinery Colombia`}
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
                  <h3 className="font-display font-bold text-base text-slate-900 mb-2 leading-snug">{p.name}</h3>
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
                      href={p.whatsappUrl}
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
