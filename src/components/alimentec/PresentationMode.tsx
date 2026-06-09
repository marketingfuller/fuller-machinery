"use client";

import { useEffect, useState } from "react";

// Modo presentación para proyectar la herramienta en un TV en el stand:
// pantalla completa, oculta header/footer/intro (vía clase en <body>) y agranda
// la tipografía. Pensado para que el asesor lo active durante la feria.
export default function PresentationMode({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);

  // Sincroniza la clase del <body> que oculta el chrome del sitio.
  useEffect(() => {
    document.body.classList.toggle("alimentec-presentacion", on);
    return () => document.body.classList.remove("alimentec-presentacion");
  }, [on]);

  // Si el usuario sale de pantalla completa (Esc), apaga el modo.
  useEffect(() => {
    const onFs = () => {
      if (!document.fullscreenElement) setOn(false);
    };
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  async function toggle() {
    const next = !on;
    try {
      if (next && !document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else if (!next && document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch {
      /* algunos navegadores bloquean fullscreen; igual aplicamos el modo */
    }
    setOn(next);
  }

  return (
    <div className={on ? "at-presentacion" : ""}>
      <div className="flex justify-end mb-3">
        <button
          type="button"
          onClick={toggle}
          data-zocam-event="armar-presentacion"
          className={`inline-flex items-center gap-2 rounded-full font-semibold text-sm transition ${
            on
              ? "fixed top-3 right-3 z-[120] bg-secondary hover:bg-secondary/90 text-white px-4 py-2 shadow-lg"
              : "bg-bg-dark hover:bg-primary text-white px-4 py-2"
          }`}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
            {on ? "close_fullscreen" : "present_to_all"}
          </span>
          {on ? "Salir" : "Modo presentación"}
        </button>
      </div>
      {children}
    </div>
  );
}
