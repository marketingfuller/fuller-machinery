"use client";

import { useState } from "react";
import { useWhatsApp } from "@/components/SettingsProvider";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { BUSINESS_TYPES, FAIR } from "@/content/alimentec";

type Status = "idle" | "submitting" | "done" | "error";

export default function LeadForm() {
  const { phone } = useWhatsApp("commercial");
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const userPhone = String(data.get("telefono") ?? "").trim();
    const businessType = String(data.get("negocio") ?? "").trim();
    const message = String(data.get("mensaje") ?? "").trim();

    if (!name || !userPhone) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    // El lead queda en ZOCAM vía el atributo data-zocam-form del <form> (captura
    // los campos + visitorId + UTM al hacer submit). Todo lo de Fuller vive en
    // ZOCAM, así que aquí solo abrimos WhatsApp con los datos.

    // Mensaje prellenado con los datos capturados.
    const waMessage =
      `Hola Fuller, los vi en ${FAIR.name} (${FAIR.pavilion}, ${FAIR.stand}). ` +
      `Soy ${name}` +
      (businessType ? ` y tengo un negocio de ${businessType}.` : ".") +
      (message ? ` ${message}` : "") +
      " Me gustaría recibir una cotización.";

    setStatus("done");
    window.open(buildWhatsAppUrl(phone, waMessage), "_blank", "noopener,noreferrer");
  }

  if (status === "done") {
    return (
      <div className="rounded-3xl border border-accent/30 bg-accent/5 p-8 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-accent/15 flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-accent" style={{ fontSize: "34px" }}>
            check_circle
          </span>
        </div>
        <h3 className="font-display font-black text-2xl text-primary mb-2">
          ¡Listo! Te abrimos WhatsApp
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Si no se abrió automáticamente, escríbenos por WhatsApp y un asesor te
          atiende. Nos vemos en {FAIR.venue}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} data-zocam-form className="space-y-4" noValidate>
      <input name="origen" type="hidden" value="cliente" readOnly />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lf-name" className="block text-sm font-medium text-gray-700 mb-1.5">
            Nombre <span className="text-secondary">*</span>
          </label>
          <input
            id="lf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Tu nombre"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
          />
        </div>
        <div>
          <label htmlFor="lf-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
            WhatsApp <span className="text-secondary">*</span>
          </label>
          <input
            id="lf-phone"
            name="telefono"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            placeholder="Ej: 312 345 6789"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lf-email" className="block text-sm font-medium text-gray-700 mb-1.5">
            Correo <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <input
            id="lf-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="tucorreo@ejemplo.com"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
          />
        </div>
        <div>
          <label htmlFor="lf-business" className="block text-sm font-medium text-gray-700 mb-1.5">
            Tipo de negocio
          </label>
          <select
            id="lf-business"
            name="negocio"
            defaultValue=""
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
          >
            <option value="" disabled>
              Selecciona…
            </option>
            {BUSINESS_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="lf-message" className="block text-sm font-medium text-gray-700 mb-1.5">
          ¿Qué equipo te interesa? <span className="text-gray-400 font-normal">(opcional)</span>
        </label>
        <textarea
          id="lf-message"
          name="mensaje"
          rows={3}
          placeholder="Cuéntanos qué buscas y te cotizamos."
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-secondary font-medium">
          Por favor completa tu nombre y tu número de WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        data-zocam-event="alimentec-lead-submit"
        className="w-full inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 disabled:opacity-60 text-white font-bold text-sm px-7 py-4 rounded-full transition-all duration-200 hover:scale-[1.02]"
      >
        {status === "submitting" ? (
          "Enviando…"
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
              <path d="M20.52 3.48A11.78 11.78 0 0012.06 0C5.56 0 .28 5.28.28 11.78c0 2.08.54 4.11 1.58 5.9L.19 24l6.5-1.7a11.75 11.75 0 005.37 1.37h.01c6.5 0 11.78-5.28 11.78-11.78 0-3.15-1.22-6.1-3.33-8.41zM12.07 21.6h-.01a9.8 9.8 0 01-5-1.36l-.36-.21-3.86 1.01 1.03-3.76-.23-.39a9.78 9.78 0 01-1.49-5.11c0-5.4 4.4-9.8 9.81-9.8 2.62 0 5.08 1.02 6.93 2.88a9.74 9.74 0 012.87 6.93c0 5.4-4.4 9.81-9.79 9.81z" />
            </svg>
            Cotizar por WhatsApp
          </>
        )}
      </button>
      <p className="text-center text-xs text-gray-400">
        Te conectamos directo con un asesor. Sin spam.
      </p>
    </form>
  );
}
