"use client";

import { Package } from "lucide-react";

const insumos = [
  { icon: "receipt_long", label: "Rollos de Vacío" },
  { icon: "grid_on", label: "Bolsas Gofradas" },
  { icon: "edit_calendar", label: "Cintas de Fechado" },
  { icon: "inventory_2", label: "Bolsas de Celofán" },
];

export default function InsumosStrip() {
  return (
    <section className="bg-bg-dark py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left */}
          <div className="flex items-center gap-5 shrink-0">
            <div className="bg-white/10 p-4 rounded-full">
              <Package size={36} className="text-[#4ab84c]" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-white mb-0.5">
                ¿Necesitas Bolsas o Rollos?
              </h2>
              <p className="text-slate-300 text-sm">
                Disponibilidad constante de insumos para tu operación.
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-3">
            {insumos.map((item, i) => (
              <a
                key={i}
                href="#"
                className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg px-5 py-3 text-white flex items-center gap-3 transition-colors text-sm"
              >
                <span className="material-symbols-outlined text-[#4ab84c] text-[20px]">
                  {item.icon}
                </span>
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#"
            className="text-white hover:text-[#4ab84c] font-bold text-sm uppercase flex items-center gap-1 transition-colors shrink-0"
          >
            Ver todos los insumos
            <span className="material-symbols-outlined text-lg">
              arrow_forward
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
