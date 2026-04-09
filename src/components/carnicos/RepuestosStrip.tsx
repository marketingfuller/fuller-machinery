"use client";

import { motion } from "framer-motion";
import { Wrench } from "lucide-react";

const items = [
  { label: "Cintas para Sierra", icon: "content_cut" },
  { label: "Cuchillas y Discos", icon: "cutting_tools" },
  { label: "Empaques Hermético", icon: "inventory_2" },
  { label: "Lubricantes Grado Alimentario", icon: "oil_barrel" },
];

export default function RepuestosStrip() {
  return (
    <section className="py-12 bg-[#f1f5f9] border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Left — title */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="size-14 bg-white rounded-full flex items-center justify-center text-secondary shadow-sm border border-slate-200">
              <Wrench size={24} />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-slate-800">
                Mantén tu corte perfecto
              </h3>
              <p className="text-slate-500 text-sm">
                Repuestos originales y consumibles siempre en stock.
              </p>
            </div>
          </div>

          {/* Right — links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-3">
            {items.map((item, i) => (
              <a
                key={i}
                href="#"
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:border-primary hover:text-primary text-slate-700 rounded-lg font-semibold text-sm transition-all shadow-sm hover:shadow-md"
              >
                <span className="material-symbols-outlined text-[16px] text-slate-400 group-hover:text-primary transition-colors">
                  {item.icon}
                </span>
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
