import React from 'react';

export default function BusinessHero() {
  return (
    <section className="relative w-full min-h-[500px] bg-primary flex items-center justify-center overflow-hidden">

      {/* Glow blobs */}
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -right-28 w-[420px] h-[420px] bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, white 1.5px, transparent 0)',
          backgroundSize: '34px 34px',
        }}
      />

      {/* Diagonal accent stripe */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-accent/5 to-transparent pointer-events-none" />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/45 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-32 pb-20 flex flex-col items-center">

        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 text-accent text-xs font-bold px-5 py-2 rounded-full uppercase tracking-[0.2em] mb-8 backdrop-blur-sm shadow-[0_0_20px_rgba(52,211,153,0.15)]">
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>precision_manufacturing</span>
          Soluciones por Industria
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-black text-white mb-6 drop-shadow-lg leading-[1.05] tracking-tight">
          Ingeniería Especializada
          <br />
          <span className="text-gradient-accent">para cada Modelo</span>
          <span className="text-white"> de Negocio</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Selecciona tu industria y descubre la maquinaria diseñada para{' '}
          <span className="text-accent font-semibold">maximizar tu producción</span> y rentabilidad.
        </p>

        {/* Scroll cue */}
        <div className="mt-12 flex flex-col items-center gap-2 opacity-40">
          <span className="text-white text-xs uppercase tracking-widest font-semibold">Explora categorías</span>
          <div className="w-px h-8 bg-gradient-to-b from-white to-transparent" />
          <span className="material-symbols-outlined text-white text-xl">expand_more</span>
        </div>
      </div>
    </section>
  );
}
