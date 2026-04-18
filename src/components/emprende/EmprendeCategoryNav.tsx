"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

const categories = [
  "Todos",
  "Panadería",
  "Comida Rápida",
  "Bebidas",
  "Técnico",
  "Finanzas",
  "Casos de Éxito",
];

export default function EmprendeCategoryNav() {
  const [active, setActive] = useState("Todos");

  return (
    <nav className="sticky top-[80px] z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto gap-1 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "whitespace-nowrap px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-200",
                active === cat
                  ? "bg-primary text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
