"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Star, MessageCircle, Coffee, IceCream, Beef } from "lucide-react";
import { useSettings } from "@/components/SettingsProvider";

interface Kit {
  name: string;
  tag?: string;
  items: string[];
  featured?: boolean;
  icon?: React.ReactNode;
}

const kits: Kit[] = [
  {
    name: "Cafetería Pro",
    icon: <Coffee size={28} className="text-secondary" />,
    items: [
      "Capuchinera Magister 2 Grupos",
      "Molino de Café 1kg",
      "Licuadora Industrial 4 Litros",
      "Sanduchera Eléctrica 1 Puesto",
    ],
  },
  {
    name: "Waffles & Helado",
    tag: "Más Vendido",
    featured: true,
    icon: <IceCream size={28} className="text-secondary" />,
    items: ["Wafflera Burbuja", "Malteadora 2 Puestos", "Congelador Industrial de Piso", "Máquina de Café Berna"],
  },
  {
    name: "Carnicería",
    icon: <Beef size={28} className="text-secondary" />,
    items: ["Sierra de Hueso y Carnes", "Molino de Carne Industrial #32", "Empacadora al Vacío Doble Cámara", "Refrigerador Exhibidor de Carnes"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

export default function StarterKits() {
  const { whatsappCommercial } = useSettings();
  const getWhatsAppUrl = (kit: Kit) => {
    const itemsList = kit.items.map((item) => `• ${item}`).join("\n");
    const msg = encodeURIComponent(
      `Hola, estoy interesado en el Kit *${kit.name}* que incluye:\n${itemsList}\n\n¿Me pueden dar más información y precio?`,
    );
    return `https://wa.me/${whatsappCommercial}?text=${msg}`;
  };
  return (
    <section className="relative bg-[#026504] py-20 lg:py-28 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-black/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
            Empieza de inmediato
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white">
            Kits de Inicio Rápido
          </h2>
          <p className="text-white/65 text-lg mt-4 max-w-2xl mx-auto">
            Todo lo que necesitas para arrancar tu negocio, en un solo paquete. Consulta disponibilidad y precio por WhatsApp.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {kits.map((kit, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`
                relative rounded-2xl p-7 lg:p-8 transition-all duration-500
                ${
                  kit.featured
                    ? "bg-white border-2 border-accent shadow-2xl shadow-accent/20 scale-[1.02] lg:scale-105"
                    : "bg-[#012a01] border border-white/10 hover:border-white/25 hover:bg-[#013d02]"
                }
              `}
            >
              {/* Featured tag */}
              {kit.tag && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1.5 bg-secondary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-secondary/30">
                    <Star size={12} fill="currentColor" />
                    {kit.tag}
                  </div>
                </div>
              )}

              {/* Kit name */}
              <div className="flex items-center gap-3 mb-6">
                <h3
                  className={`font-display font-bold text-xl ${
                    kit.featured ? "text-primary" : "text-white"
                  }`}
                >
                  {kit.name}
                </h3>
                {kit.icon && kit.icon}
              </div>

              {/* Items */}
              <ul className="space-y-3 mb-8">
                {kit.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        kit.featured ? "bg-accent/15 text-accent" : "bg-accent/10 text-accent"
                      }`}
                    >
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span
                      className={`text-sm ${
                        kit.featured ? "text-gray-600" : "text-white/80"
                      }`}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA WhatsApp */}
              <motion.a
                href={getWhatsAppUrl(kit)}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-bold text-sm transition-all duration-300
                  ${
                    kit.featured
                      ? "bg-[#25D366] hover:bg-[#1ebe5d] text-white shadow-lg shadow-green-600/30"
                      : "bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 hover:border-[#25D366]"
                  }
                `}
              >
                <MessageCircle size={16} />
                Consultar Kit por WhatsApp
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
