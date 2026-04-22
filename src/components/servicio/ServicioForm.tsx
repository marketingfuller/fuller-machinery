"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useSettings } from "@/components/SettingsProvider";

type TipoSoporte = "Reparación en sede (Bogotá)" | "Soporte remoto nacional" | "Repuesto" | "Capacitación" | "Otro";

export default function ServicioForm() {
  const { whatsappSupport } = useSettings();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [model, setModel] = useState("");
  const [tipo, setTipo] = useState<TipoSoporte>("Reparación en sede (Bogotá)");
  const [description, setDescription] = useState("");

  const buildMessage = () => {
    const lines = [
      "*Solicitud de servicio técnico — Fuller*",
      "",
      `• Tipo: ${tipo}`,
      `• Nombre: ${name || "(sin especificar)"}`,
      `• Teléfono: ${phone || "(sin especificar)"}`,
      `• Ciudad: ${city || "(sin especificar)"}`,
      `• Modelo del equipo: ${model || "(sin especificar)"}`,
      "",
      "Detalle de la falla / consulta:",
      description || "(sin especificar)",
    ];
    return lines.join("\n");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = `https://wa.me/${whatsappSupport}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-20 md:py-24 bg-white" id="contacto-soporte">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-primary font-bold text-xs uppercase tracking-widest mb-2">
            Abre tu ticket
          </p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 mb-3">
            Cuéntanos qué necesitas
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Completa los datos y al enviar abrimos tu conversación en WhatsApp
            con toda la información ya cargada, para que un técnico te atienda
            más rápido.
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="bg-slate-50 rounded-2xl p-8 md:p-10 border border-slate-200"
        >
          <div className="mb-6">
            <label htmlFor="st-tipo" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Tipo de soporte <span className="text-secondary" aria-hidden>*</span>
            </label>
            <select
              id="st-tipo"
              required
              value={tipo}
              onChange={(e) => setTipo(e.target.value as TipoSoporte)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            >
              <option>Reparación en sede (Bogotá)</option>
              <option>Soporte remoto nacional</option>
              <option>Repuesto</option>
              <option>Capacitación</option>
              <option>Otro</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="st-name" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Nombre completo <span className="text-secondary" aria-hidden>*</span>
              </label>
              <input
                id="st-name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Juan Pérez"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-slate-400"
              />
            </div>
            <div>
              <label htmlFor="st-phone" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Teléfono <span className="text-secondary" aria-hidden>*</span>
              </label>
              <input
                id="st-phone"
                type="tel"
                required
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+57 300 123 4567"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="st-city" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Ciudad <span className="text-secondary" aria-hidden>*</span>
              </label>
              <input
                id="st-city"
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Bogotá, Medellín, Cali…"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-slate-400"
              />
            </div>
            <div>
              <label htmlFor="st-model" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Modelo del equipo <span className="text-secondary" aria-hidden>*</span>
              </label>
              <input
                id="st-model"
                type="text"
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Ej. Molino #32, Wafflera Burbuja, Granizadora 3 tanques"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="mb-8">
            <label htmlFor="st-description" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Descripción de la falla o consulta <span className="text-secondary" aria-hidden>*</span>
            </label>
            <textarea
              id="st-description"
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Cuéntanos qué ocurre: ruidos, códigos de error, cuándo empezó, si ya tiene repuestos cambiados, etc."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-slate-400 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-600/20 transition-all hover:-translate-y-0.5 text-sm uppercase tracking-wide"
          >
            <Send size={16} />
            Enviar por WhatsApp al servicio técnico
          </button>

          <p className="text-slate-400 text-xs mt-4 text-center">
            Al enviar se abre WhatsApp con tu mensaje ya armado · Lun–Sáb 8am–5pm
          </p>
        </motion.form>
      </div>
    </section>
  );
}
