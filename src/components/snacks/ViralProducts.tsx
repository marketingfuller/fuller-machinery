"use client";

import { motion } from "framer-motion";
import { TrendingUp, Sparkles, Flame } from "lucide-react";

const products = [
  {
    title: "Wafflera de Burbujas",
    desc: "El snack más fotografiado del mundo. Crea conos deliciosos y rellénalos de helado.",
    tag: "Top Instagram",
    tagClass: "from-purple-600 to-pink-600",
    Icon: TrendingUp,
    image: "/images/Snacks y fast food/wafflera burbuja - snack.webp",
    href: "https://tienda.fullermachinery.com/?s=wafflera&post_type=product&product_cat=0",
  },
  {
    title: "Wafflera Formas Especiales",
    desc: "Diferénciate de la competencia con formas únicas y divertidas que atraen clientes.",
    tag: "Novedad",
    tagClass: "from-blue-500 to-cyan-500",
    Icon: Sparkles,
    image: "/images/Snacks y fast food/Wafflera Formas Especiales- SNACK.webp",
    href: "https://tienda.fullermachinery.com/?s=wafflera+erotica&post_type=product&product_cat=0",
  },
  {
    title: "Mini Donuts Automática",
    desc: "Producción continua de mini donuts frescos. El olor atraerá a todos los clientes.",
    tag: "Alta Demanda",
    tagClass: "from-amber-500 to-orange-500",
    Icon: Flame,
    image: "/images/Snacks y fast food/Mini Donuts - SNACK.webp",
    href: "https://tienda.fullermachinery.com/?s=donas&post_type=product&product_cat=0",
  },
];

export default function ViralProducts() {
  return (
    <section className="py-16 md:py-24 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <span className="text-secondary font-bold uppercase tracking-wider text-sm mb-2 block">Tendencias 2025</span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-primary">Productos Virales en Redes</h2>
          </div>
          <a href="#" className="text-primary font-bold hover:text-secondary flex items-center gap-1 group transition-colors text-sm">
            Ver todas las tendencias
            <span className="group-hover:translate-x-1 transition-transform inline-block ml-1">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.a
              key={i}
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative h-[500px] rounded-3xl overflow-hidden group cursor-pointer shadow-lg"
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                  style={{ backgroundImage: `url('${product.image}')` }}
                />
                <div className="absolute inset-0 bg-slate-900/30" />
              </div>

              {/* Tag */}
              <div className="absolute top-6 left-6 z-10">
                <span className={`bg-gradient-to-r ${product.tagClass} text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-md flex items-center gap-1`}>
                  <product.Icon size={12} />
                  {product.tag}
                </span>
              </div>

              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10">
                <h3 className="text-white font-display font-bold text-2xl mb-2">{product.title}</h3>
                <p className="text-slate-200 text-sm mb-4 line-clamp-2">{product.desc}</p>
                <span className="block w-full bg-white text-slate-900 font-bold py-3 rounded-lg text-center group-hover:bg-accent group-hover:text-white transition-colors">
                  Ver Máquina
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
