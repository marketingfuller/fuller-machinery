"use client";

import { motion } from "framer-motion";

export default function EmprendeNewsletter() {
  return (
    <section className="relative bg-primary py-20 px-4 overflow-hidden">
      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/2"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5">
            <span className="material-symbols-outlined text-[14px]">groups</span>
            +5.000 emprendedores
          </div>
          <h2 className="font-display font-black text-3xl md:text-4xl text-white mb-4 leading-tight">
            Únete a la comunidad de emprendedores gastronómicos
          </h2>
          <p className="text-white/60 text-base leading-relaxed max-w-lg">
            Consejos de negocio, nuevas tendencias, tutoriales y descuentos
            exclusivos directamente en tu correo cada semana.
          </p>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:w-1/2 w-full max-w-lg"
        >
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="Tu correo electrónico empresarial"
              className="flex-grow px-5 py-4 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-accent bg-white placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="bg-secondary hover:bg-secondary/90 text-white font-bold py-4 px-7 rounded-xl shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-secondary/30 text-sm uppercase tracking-wide whitespace-nowrap"
            >
              Suscribirme
            </button>
          </form>
          <p className="text-white/35 text-xs mt-3">
            Respetamos tu privacidad. Puedes darte de baja en cualquier momento.
          </p>

          {/* Trust badges */}
          <div className="flex items-center gap-5 mt-5">
            {[
              { icon: "verified", label: "Sin spam" },
              { icon: "lock", label: "Datos seguros" },
              { icon: "mail", label: "1 correo/semana" },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-1.5 text-white/40 text-xs">
                <span className="material-symbols-outlined text-accent text-[15px]">{b.icon}</span>
                {b.label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
