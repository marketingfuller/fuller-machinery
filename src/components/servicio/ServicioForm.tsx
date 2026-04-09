"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";

export default function ServicioForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-20 md:py-24 bg-white" id="contacto-soporte">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-primary font-bold text-xs uppercase tracking-widest mb-2">
            Soporte Técnico
          </p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 mb-3">
            Abre un Ticket de Soporte
          </h2>
          <p className="text-slate-500 text-sm">
            Completa el formulario y un especialista te contactará en menos de
            2 horas hábiles.
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-accent/5 border border-accent/30 rounded-2xl p-12 text-center"
          >
            <CheckCircle2 size={48} className="text-accent mx-auto mb-4" />
            <h3 className="font-display font-bold text-2xl text-slate-900 mb-2">
              ¡Solicitud enviada!
            </h3>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">
              Un técnico especializado se pondrá en contacto contigo en menos
              de 2 horas hábiles.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="bg-slate-50 rounded-2xl p-8 md:p-10 border border-slate-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="st-name"
                  className="block text-sm font-semibold text-slate-700 mb-1.5"
                >
                  Nombre Completo{" "}
                  <span className="text-secondary" aria-hidden>*</span>
                </label>
                <input
                  id="st-name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Juan Pérez"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-slate-400"
                />
              </div>
              <div>
                <label
                  htmlFor="st-phone"
                  className="block text-sm font-semibold text-slate-700 mb-1.5"
                >
                  Teléfono{" "}
                  <span className="text-secondary" aria-hidden>*</span>
                </label>
                <input
                  id="st-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+52 55 1234 5678"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="st-model"
                className="block text-sm font-semibold text-slate-700 mb-1.5"
              >
                Modelo de la Máquina{" "}
                <span className="text-secondary" aria-hidden>*</span>
              </label>
              <input
                id="st-model"
                type="text"
                required
                placeholder="Ej. Amasadora 20L - Serie XJ900"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="st-description"
                className="block text-sm font-semibold text-slate-700 mb-1.5"
              >
                Descripción del Problema{" "}
                <span className="text-secondary" aria-hidden>*</span>
              </label>
              <textarea
                id="st-description"
                required
                rows={4}
                placeholder="Describe qué sucede con el equipo: ruidos extraños, códigos de error, cuándo comenzó el problema, etc."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-slate-400 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-secondary/20 transition-all hover:-translate-y-0.5 text-sm uppercase tracking-wide"
            >
              <Send size={16} />
              Enviar Solicitud de Soporte
            </button>

            <p className="text-slate-400 text-xs mt-4 text-center">
              Respuesta garantizada en menos de 2 horas hábiles · Lun–Sáb
            </p>
          </motion.form>
        )}
      </div>
    </section>
  );
}
