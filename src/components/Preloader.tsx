"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add("loading");
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.classList.remove("loading");
    }, 1200);
    return () => {
      clearTimeout(timer);
      document.body.classList.remove("loading");
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{ backgroundColor: "#013d02" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="relative flex flex-col items-center gap-6">
            {/* Gear → Bread Morph Animation */}
            <motion.svg
              viewBox="0 0 120 120"
              className="w-24 h-24 md:w-32 md:h-32"
              initial={{ rotate: 0, scale: 1 }}
              animate={{
                rotate: [0, 180, 360],
                scale: [1, 1.1, 0.9, 1],
              }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
            >
              {/* Gear shape that morphs to bread */}
              <motion.path
                initial={{
                  d: "M60 10 L65 20 L75 15 L75 25 L85 25 L80 35 L90 40 L80 45 L85 55 L75 55 L75 65 L65 60 L60 70 L55 60 L45 65 L45 55 L35 55 L40 45 L30 40 L40 35 L35 25 L45 25 L45 15 L55 20 Z",
                }}
                animate={{
                  d: [
                    "M60 10 L65 20 L75 15 L75 25 L85 25 L80 35 L90 40 L80 45 L85 55 L75 55 L75 65 L65 60 L60 70 L55 60 L45 65 L45 55 L35 55 L40 45 L30 40 L40 35 L35 25 L45 25 L45 15 L55 20 Z",
                    "M60 25 Q80 20 95 35 Q110 55 95 70 Q85 80 75 85 Q65 90 55 90 Q40 90 30 80 Q15 65 20 50 Q25 35 40 28 Q50 22 60 25 Z",
                  ],
                }}
                transition={{
                  duration: 1.0,
                  delay: 0.2,
                  ease: "easeInOut",
                }}
                fill="none"
                stroke="#4ab84c"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {/* Inner circle/detail */}
              <motion.ellipse
                cx="60"
                cy="45"
                initial={{ rx: 12, ry: 12, opacity: 1 }}
                animate={{
                  rx: [12, 20],
                  ry: [12, 8],
                  cy: [45, 55],
                  opacity: [1, 0.6],
                }}
                transition={{ duration: 1.0, delay: 0.2, ease: "easeInOut" }}
                fill="none"
                stroke="#4ab84c"
                strokeWidth="1.5"
              />
              {/* Bread score lines */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 1] }}
                transition={{ duration: 1.2, times: [0, 0.7, 1] }}
              >
                <line x1="45" y1="48" x2="55" y2="43" stroke="#4ab84c" strokeWidth="1.2" opacity="0.6" />
                <line x1="55" y1="50" x2="65" y2="45" stroke="#4ab84c" strokeWidth="1.2" opacity="0.6" />
                <line x1="65" y1="52" x2="75" y2="47" stroke="#4ab84c" strokeWidth="1.2" opacity="0.6" />
              </motion.g>
            </motion.svg>

            {/* Brand text */}
            <motion.p
              className="text-accent font-display font-bold text-lg tracking-[0.3em] uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Fuller Machinery
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
