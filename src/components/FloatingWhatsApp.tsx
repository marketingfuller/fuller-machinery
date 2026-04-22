"use client";

import { motion } from "framer-motion";
import { useWhatsApp } from "@/components/SettingsProvider";

export default function FloatingWhatsApp() {
  const { url } = useWhatsApp(
    "commercial",
    "Hola, me gustaría recibir información sobre sus equipos.",
  );
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatea con nosotros por WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="group fixed bottom-5 right-5 md:bottom-6 md:right-6 z-[60] flex items-center gap-3"
    >
      <span className="hidden md:inline-block bg-white text-slate-900 font-semibold text-sm px-4 py-2 rounded-full shadow-lg shadow-black/10 border border-slate-200 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
        Chatea con nosotros
      </span>

      <span className="relative flex size-14 md:size-16 items-center justify-center rounded-full bg-[#25D366] shadow-xl shadow-[#25D366]/40 ring-4 ring-[#25D366]/20">
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="relative size-7 md:size-8 text-white"
          aria-hidden="true"
        >
          <path d="M20.52 3.48A11.78 11.78 0 0012.06 0C5.56 0 .28 5.28.28 11.78c0 2.08.54 4.11 1.58 5.9L.19 24l6.5-1.7a11.75 11.75 0 005.37 1.37h.01c6.5 0 11.78-5.28 11.78-11.78 0-3.15-1.22-6.1-3.33-8.41zM12.07 21.6h-.01a9.8 9.8 0 01-5-1.36l-.36-.21-3.86 1.01 1.03-3.76-.23-.39a9.78 9.78 0 01-1.49-5.11c0-5.4 4.4-9.8 9.81-9.8 2.62 0 5.08 1.02 6.93 2.88a9.74 9.74 0 012.87 6.93c0 5.4-4.4 9.81-9.79 9.81zm5.37-7.33c-.29-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.29-.76.96-.93 1.15-.17.2-.34.22-.64.07-.29-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.19-.24-.57-.48-.5-.66-.51h-.56c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.75-.71 2-1.4.25-.69.25-1.28.17-1.4-.07-.12-.27-.2-.56-.34z" />
        </svg>
      </span>
    </motion.a>
  );
}
