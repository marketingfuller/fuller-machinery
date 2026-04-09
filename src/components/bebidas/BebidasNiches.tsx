"use client";

import { motion } from "framer-motion";

const niches = [
  {
    title: "Granizados y Frappés",
    label: "Rentabilidad Visual",
    icon: "ac_unit",
    desc: "Costo real por vaso: ~$4.000 COP en insumos. Precio de venta: $8.000–$10.000. Margen del 50% desde el primer vaso.",
    image: "/images/Bebidas y cafe/Granizados y Frappés - cafe y bebidas.webp",
    href: "https://tienda.fullermachinery.com/?s=granizadora&post_type=product&product_cat=0",
  },
  {
    title: "Café y Barismo",
    label: "El Arte del Café",
    icon: "coffee_maker",
    desc: "Capuccinos, expresos y lattes con calidad de cafetería premium a precio de local.",
    image: "/images/Bebidas y cafe/cafe y barismo - cafe y bebidas.webp",
    href: "https://tienda.fullermachinery.com/?s=cafe&post_type=product&product_cat=0",
  },
  {
    title: "Jugos y Licuados",
    label: "Potencia Pura",
    icon: "blender",
    desc: "Licuadoras encapsuladas silenciosas ideales para centros comerciales y cocinas.",
    image: "/images/Bebidas y cafe/Jugos y Licuados- cafe y bebidas.webp",
    href: "https://tienda.fullermachinery.com/?s=licuadora&post_type=product&product_cat=0",
  },
  {
    title: "Bubble Tea",
    label: "Tendencia Global",
    icon: "local_drink",
    desc: "Selladoras de película para delivery sin derrames. El negocio más viral del momento.",
    image: "/images/Bebidas y cafe/Tendencia Bubble Tea- cafe y bebidas.webp",
    href: "https://tienda.fullermachinery.com/?s=selladora+de+vasos&post_type=product&product_cat=0",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 200, damping: 22 } },
};

export default function BebidasNiches() {
  return (
    <section className="py-20 px-4 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-secondary text-sm font-bold uppercase tracking-widest block mb-3">Líneas de Negocio</span>
          <h2 className="font-display font-black text-3xl md:text-4xl text-white">
            Explora por Tipo de Bebida
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {niches.map((niche, i) => (
            <motion.a
              key={i}
              variants={itemVariants}
              href={niche.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative h-[450px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center sm:grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110 scale-105"
                style={{ backgroundImage: `url('${niche.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/15" />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div className="absolute bottom-0 left-0 p-7 w-full">
                <div className="size-11 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center mb-4 text-white border border-white/20 group-hover:bg-secondary group-hover:border-secondary transition-colors duration-300">
                  <span className="material-symbols-outlined text-xl">{niche.icon}</span>
                </div>
                <h3 className="text-white font-display font-black text-xl mb-1">{niche.title}</h3>
                <p className="text-accent font-bold uppercase text-xs tracking-widest mb-3">{niche.label}</p>
                <p className="text-slate-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">{niche.desc}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
