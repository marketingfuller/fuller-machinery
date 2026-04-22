"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, TrendingUp, Factory } from "lucide-react";
import type { HeroSide } from "@/lib/whatsapp";

type Props = {
  left: HeroSide;
  right: HeroSide;
};

export default function SplitHero({ left, right }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const showLeft = left.enabled;
  const showRight = right.enabled;
  // Si solo uno está habilitado, la columna ocupa el 100%.
  const soloMode = showLeft !== showRight;

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col lg:flex-row" data-cursor="food">
      {showLeft && (
        <div
          className={`relative flex-1 min-h-[50vh] lg:min-h-screen overflow-hidden ${
            soloMode ? "lg:min-w-full" : ""
          }`}
        >
          <motion.div className="absolute inset-0 scale-110" style={{ y: bgY1 }}>
            {left.imageUrl && (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${left.imageUrl}')` }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>

          <motion.div
            className="relative z-10 flex flex-col justify-center h-full px-8 sm:px-12 lg:px-16 py-32 lg:py-0"
            style={{ y: textY }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="max-w-lg"
            >
              {left.eyebrow && (
                <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 text-accent px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">
                  <TrendingUp size={14} />
                  {left.eyebrow}
                </div>
              )}

              {(left.title || left.titleAccent) && (
                <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] mb-6">
                  {left.title}
                  {left.title && left.titleAccent ? " " : ""}
                  {left.titleAccent && (
                    <span className="text-gradient-accent">{left.titleAccent}</span>
                  )}
                </h1>
              )}

              {left.subtitle && (
                <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-md">
                  {left.subtitle}
                </p>
              )}

              {left.buttonText && left.buttonUrl && (
                <motion.a
                  href={left.buttonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-accent hover:bg-accent-dark text-bg-dark font-bold text-sm px-7 py-4 rounded-full transition-all duration-300 group hover:shadow-xl hover:shadow-accent/25"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {left.buttonText}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </motion.a>
              )}
            </motion.div>
          </motion.div>

          {showRight && (
            <div className="hidden lg:block absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
          )}
        </div>
      )}

      {showRight && (
        <div
          className={`relative flex-1 min-h-[50vh] lg:min-h-screen overflow-hidden ${
            soloMode ? "lg:min-w-full" : ""
          }`}
          data-cursor="machine"
        >
          <motion.div className="absolute inset-0 scale-110" style={{ y: bgY2 }}>
            {right.imageUrl && (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${right.imageUrl}')` }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/60 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>

          <motion.div
            className="relative z-10 flex flex-col justify-center h-full px-8 sm:px-12 lg:px-16 py-32 lg:py-0"
            style={{ y: textY }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="max-w-lg"
            >
              {right.eyebrow && (
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">
                  <Factory size={14} />
                  {right.eyebrow}
                </div>
              )}

              {(right.title || right.titleAccent) && (
                <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] mb-6">
                  {right.title}
                  {right.title && right.titleAccent ? " " : ""}
                  {right.titleAccent && (
                    <span className="text-white">{right.titleAccent}</span>
                  )}
                </h1>
              )}

              {right.subtitle && (
                <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-md">
                  {right.subtitle}
                </p>
              )}

              {right.buttonText && right.buttonUrl && (
                <motion.a
                  href={right.buttonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm px-7 py-4 rounded-full transition-all duration-300 group backdrop-blur-sm"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {right.buttonText}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </motion.a>
              )}
            </motion.div>
          </motion.div>
        </div>
      )}

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-accent"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
