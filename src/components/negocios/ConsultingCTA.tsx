import React from 'react';

export default function ConsultingCTA() {
  return (
    <section className="relative py-20 bg-bg-dark overflow-hidden">
      {/* Light green dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #4ab84c 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="relative bg-primary rounded-3xl shadow-2xl overflow-hidden">

          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -right-40 -top-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute -left-24 -bottom-24 w-80 h-80 bg-primary-light/30 rounded-full blur-3xl" />
            {/* Mesh grid */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-12 p-10 md:p-14">

            {/* Animated icon circle */}
            <div className="shrink-0 relative">
              <div
                className="absolute inset-0 w-32 h-32 rounded-full border-2 border-accent/20 animate-ping"
                style={{ animationDuration: '2.5s' }}
              />
              <div className="absolute inset-0 w-32 h-32 rounded-full border border-accent/10 scale-110" />
              <div className="w-32 h-32 bg-primary-dark/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-primary-light/40 shadow-inner shadow-black/20 relative z-10">
                <span
                  className="material-symbols-outlined text-white drop-shadow-md"
                  style={{ fontSize: '56px' }}
                >
                  support_agent
                </span>
              </div>
            </div>

            {/* Copy block */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-white/70 text-xs font-bold uppercase tracking-[0.2em] mb-3">
                Asesoría gratuita · Sin compromiso
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-display font-black text-white leading-tight mb-4">
                ¿No sabes qué máquina{' '}
                <span className="text-white">necesitas?</span>
              </h2>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl">
                Nuestros ingenieros expertos te ayudan a seleccionar el equipo exacto para tu
                volumen de producción y presupuesto.
              </p>
            </div>

            {/* CTA button */}
            <div className="shrink-0 w-full md:w-auto">
              <a
                href={`https://wa.me/573244247198?text=${encodeURIComponent("Hola, necesito asesoría para elegir la maquinaria adecuada para mi negocio.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full md:w-auto inline-flex items-center justify-center gap-3 border-2 border-white text-white hover:bg-white hover:text-primary py-4 px-9 rounded-2xl font-bold transition-all duration-300 hover:scale-105 text-base md:text-lg"
              >
                <span
                  className="material-symbols-outlined transition-transform group-hover:rotate-12"
                  style={{ fontSize: '22px' }}
                >
                  chat
                </span>
                Hablar con un Asesor
              </a>
              <p className="text-gray-400 text-xs text-center mt-3 font-medium">
                Respuesta inmediata por WhatsApp
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
