"use client";

import { motion } from "framer-motion";
import { useWhatsApp } from "@/components/SettingsProvider";

export default function BubbleTeaBanner() {
  const { url: waUrl } = useWhatsApp(
    "commercial",
    "Hola, me interesa cotizar insumos para bubble tea y selladoras de vasos",
  );
  return (
    <section className="py-20 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="bg-gradient-to-br from-black to-[#012a01] rounded-3xl border border-white/10 flex flex-col md:flex-row overflow-hidden shadow-2xl"
        >
          {/* LEFT — TikTok embed in phone mockup */}
          <div className="md:w-2/5 flex items-center justify-center bg-black py-10 px-6">
            {/* Phone frame */}
            <div className="relative w-[270px] bg-slate-900 rounded-[2.8rem] border-[5px] border-slate-700 shadow-2xl overflow-hidden">
              {/* Top notch */}
              <div className="h-7 bg-black flex items-center justify-center shrink-0">
                <div className="w-20 h-3.5 bg-slate-800 rounded-full" />
              </div>

              {/* iframe — slightly wider than container to clip the scrollbar */}
              <div className="overflow-hidden" style={{ height: "500px" }}>
                <iframe
                  src="https://www.tiktok.com/embed/v2/7550411813024812293"
                  style={{ width: "calc(100% + 18px)", height: "100%", border: "none" }}
                  allowFullScreen
                  allow="encrypted-media; autoplay"
                />
              </div>

              {/* Bottom home indicator */}
              <div className="h-6 bg-black flex items-center justify-center shrink-0">
                <div className="w-24 h-1 bg-slate-700 rounded-full" />
              </div>
            </div>
          </div>

          {/* RIGHT — content */}
          <div className="md:w-3/5 p-10 flex flex-col justify-center gap-5">
            {/* Badges */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-block bg-secondary text-white font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider animate-pulse">
                Trend Alert
              </span>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                Delivery Safe
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-display font-black text-3xl md:text-4xl text-white leading-tight">
              Profesionaliza tu Delivery con{" "}
              <span className="text-accent">Sellado Hermético</span>
            </h2>

            {/* Description */}
            <p className="text-white/60 leading-relaxed text-base">
              Las máquinas selladoras de vasos permiten entregar bebidas sin
              derrames, mantener la temperatura y agregar un packaging profesional
              que dispara la percepción de valor. Ideal para pedidos online,
              eventos y locales de alto tránsito.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="https://tienda.fullermachinery.com/?s=selladora+de+vasos&post_type=product&product_cat=0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-white hover:bg-white/90 text-bg-dark font-bold rounded-xl text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Ver Máquinas Selladoras
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 py-3.5 border-2 border-white/30 hover:bg-white/10 text-white font-bold rounded-xl text-sm transition-colors"
              >
                Cotizar Rollo de Sellos
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
