"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    title: "Snacks & Fast Food",
    subtitle: "Waffles, crepes, freidoras y planchas para alta rotación",
    image: "/images/snacks y fast food inicio.png",
    size: "large" as const,
    href: "/negocios/snacks",
  },
  {
    title: "Mundo Bebidas & Café",
    subtitle: "Cafeteras, licuadoras, granizadoras y más",
    image: "/images/Bebidas y cafe inicio.png",
    size: "medium" as const,
    href: "/negocios/bebidas",
  },
  {
    title: "Panadería",
    subtitle: "Hornos, amasadoras, cortadoras y equipos profesionales",
    image: "/images/panaderia inicio.png",
    size: "medium" as const,
    href: "/negocios/panaderia",
  },
  {
    title: "Empaque Industrial",
    subtitle: "Selladoras al vacío y empaques automáticos",
    image: "/images/empques inicio.png",
    size: "medium" as const,
    href: "/negocios/empaque",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" as const } },
};

export default function BentoCategories() {
  return (
    <section id="negocios" className="bg-bg-light py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
            Nuestras soluciones
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary">
            Explora por Categoría
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 auto-rows-[220px] lg:auto-rows-[240px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {categories.map((cat, i) => (
            <motion.a
              key={i}
              href={cat.href}
              variants={cardVariants}
              data-cursor="machine"
              aria-label={`${cat.title} — ${cat.subtitle}`}
              className={`
                relative overflow-hidden rounded-2xl group
                ${cat.size === "large" ? "md:col-span-2 md:row-span-2" : ""}
              `}
            >
              {/* Background Image with hover zoom */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url('${cat.image}')` }}
              />

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6 lg:p-8">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-display font-bold text-white text-xl lg:text-2xl mb-1">
                      {cat.title}
                    </h3>
                    <p className="text-white/0 group-hover:text-white/70 text-sm transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      {cat.subtitle}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                    <ArrowUpRight size={18} className="text-white" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}

          {/* Ver todas las categorías */}
          <motion.a
            href="/negocios"
            variants={cardVariants}
            className="relative overflow-hidden rounded-2xl group border-2 border-dashed border-primary/30 bg-bg-light hover:bg-primary/5 hover:border-primary/60 transition-all duration-300 flex flex-col items-center justify-center gap-4"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <ArrowUpRight size={24} className="text-primary" />
            </div>
            <div className="text-center px-4">
              <p className="font-display font-bold text-primary text-lg leading-tight">
                Ver todas las categorías
              </p>
              <p className="text-gray-400 text-sm mt-1">6 líneas de negocio</p>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
