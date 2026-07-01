"use client";

import { useState } from "react";
import Link from "next/link";
import { formatCOP } from "@/lib/products-shared";
import { formatPayback } from "@/lib/roi";

// Vista que ve el CLIENTE al escanear el QR: resumen limpio de su propuesta
// (solo lectura) + formulario para dejar sus datos. Al enviar, el lead queda
// en ZOCAM (via data-zocam-form, que captura nombre/WhatsApp + asesor + propuesta
// + UTM) y se le habilita la descarga del PDF. No es la herramienta editable.

export type ClientProposalProps = {
  businessLabel: string;
  machines: { name: string; price: number; slug: string }[];
  investment: number;
  discountPct: number;
  monthlyProfit: number;
  monthlyRevenue: number;
  monthlyInsumos: number;
  fixedMonthly: number;
  payback: number | null;
  fair: { name: string; pavilion: string; stand: string; venue: string; datesLabel: string };
  advisor: { name: string; whatsapp: string };
  shareUrl: string;
  onDownloadPdf: () => void;
};

export default function ClientProposalView(props: ClientProposalProps) {
  const {
    businessLabel, machines, investment, discountPct,
    monthlyProfit, monthlyRevenue, monthlyInsumos, fixedMonthly,
    payback, fair, advisor, shareUrl, onDownloadPdf,
  } = props;

  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  const propuestaResumen =
    `${businessLabel} · Inversión ${formatCOP(investment)}` +
    (discountPct > 0 ? ` (-${discountPct}%)` : "") +
    ` · Utilidad ${formatCOP(monthlyProfit)}/mes · Recupera en ${formatPayback(payback)}`;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // El script de ZOCAM captura el form en fase de captura ANTES de este
    // handler; aquí solo validamos y evitamos la navegación.
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("telefono") ?? "").trim();
    if (!name || !phone) {
      e.preventDefault();
      setStatus("error");
      return;
    }
    e.preventDefault();
    setStatus("done");
  }

  return (
    <div className="bg-gradient-to-br from-bg-dark to-slate-900 text-white rounded-3xl p-6 md:p-10">
      <div className="text-center mb-7">
        <p className="text-accent font-mono text-xs uppercase tracking-widest mb-1">
          {fair.name} · {fair.pavilion} · {fair.stand}
        </p>
        <h2 className="font-display font-black text-2xl md:text-3xl">
          Tu propuesta: {businessLabel}
        </h2>
        {advisor.name && (
          <p className="text-white/50 text-sm mt-1">Armada por {advisor.name}</p>
        )}
      </div>

      {/* Resultado: inversión / utilidad / recuperación */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <Card label="Inversión del kit">
          <span className="font-display font-black text-2xl text-white">{formatCOP(investment)}</span>
          {discountPct > 0 && (
            <span className="text-secondary text-sm font-bold"> -{discountPct}%</span>
          )}
        </Card>
        <Card label="Utilidad neta / mes" highlight>
          <span className={`font-display font-black text-2xl ${monthlyProfit > 0 ? "text-accent" : "text-red-400"}`}>
            {formatCOP(monthlyProfit)}
          </span>
        </Card>
        <Card label="Recuperas en">
          <span className="font-display font-black text-2xl text-white">{formatPayback(payback)}</span>
        </Card>
      </div>

      {/* Lista de máquinas del kit */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-2">
        <p className="text-white/60 text-xs uppercase tracking-wider mb-2">
          Tu kit ({machines.length} máquina{machines.length === 1 ? "" : "s"})
        </p>
        <div className="space-y-1.5">
          {machines.map((m) => (
            <div key={m.slug} className="flex items-center justify-between gap-3 text-sm">
              <Link href={`/productos/${m.slug}`} target="_blank" className="text-white/85 hover:text-accent transition leading-snug">
                {m.name}
              </Link>
              <span className="font-bold text-white whitespace-nowrap">{formatCOP(m.price)}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-white/35 text-xs mb-7">
        Ingreso {formatCOP(monthlyRevenue)} − insumos {formatCOP(monthlyInsumos)} − fijos {formatCOP(fixedMonthly)}.
        Estimado, no es promesa de rentabilidad: depende de ubicación, demanda y temporada.
      </p>

      {/* Captura del cliente */}
      {status !== "done" ? (
        <form data-zocam-form onSubmit={handleSubmit} className="space-y-3" noValidate>
          <p className="text-sm text-white/80 font-medium">
            Déjanos tus datos y te enviamos esta propuesta:
          </p>
          {/* Campos que ZOCAM usa para enrutar/enriquecer el lead. sr-only (text),
              NO type="hidden": el script de ZOCAM ignora los inputs hidden. */}
          <input name="origen" type="text" value="cliente" readOnly className="sr-only" tabIndex={-1} aria-hidden="true" />
          <input name="asesor" type="text" value={advisor.name} readOnly className="sr-only" tabIndex={-1} aria-hidden="true" />
          <input name="asesor_whatsapp" type="text" value={advisor.whatsapp} readOnly className="sr-only" tabIndex={-1} aria-hidden="true" />
          <input name="negocio" type="text" value={businessLabel} readOnly className="sr-only" tabIndex={-1} aria-hidden="true" />
          <input name="propuesta" type="text" value={propuestaResumen} readOnly className="sr-only" tabIndex={-1} aria-hidden="true" />
          <input name="propuesta_link" type="text" value={shareUrl} readOnly className="sr-only" tabIndex={-1} aria-hidden="true" />

          <input
            name="name" type="text" autoComplete="name" placeholder="Tu nombre *"
            className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          <input
            name="telefono" type="tel" inputMode="tel" autoComplete="tel" placeholder="Tu WhatsApp *"
            className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          <input
            name="email" type="email" autoComplete="email" placeholder="Correo (opcional)"
            className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          {status === "error" && (
            <p className="text-sm text-red-300 font-medium">Completa tu nombre y tu WhatsApp.</p>
          )}
          <button
            type="submit"
            data-zocam-event="lead-capturado"
            className="w-full inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold text-sm px-6 py-4 rounded-full transition hover:scale-[1.02]"
          >
            Recibir mi propuesta
          </button>
        </form>
      ) : (
        <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6 text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-accent/15 flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-accent" style={{ fontSize: "30px" }}>check_circle</span>
          </div>
          <p className="font-display font-black text-xl mb-1">¡Listo! Tu propuesta está guardada</p>
          <p className="text-white/55 text-sm mb-5">
            Un asesor de Fuller te contacta. Descarga tu propuesta en PDF:
          </p>
          <button
            type="button"
            onClick={onDownloadPdf}
            data-zocam-event="armar-pdf"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-sm px-6 py-3 rounded-full transition"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>download</span>
            Descargar PDF
          </button>
        </div>
      )}
    </div>
  );
}

function Card({ label, highlight, children }: { label: string; highlight?: boolean; children: React.ReactNode }) {
  return (
    <div className={`rounded-xl p-4 border ${highlight ? "bg-accent/10 border-accent/30" : "bg-white/5 border-white/10"}`}>
      <p className="text-white/60 text-xs uppercase tracking-wider mb-1">{label}</p>
      {children}
    </div>
  );
}
