"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { formatCOP } from "@/lib/products";
import { computeBusiness, formatPayback, type LineInput } from "@/lib/roi";
import { typeLine, lineInsumoCost, type Insumo } from "@/content/alimentec-roi";
import { FAIR } from "@/content/alimentec";
import KitMachineSearch, { type AddableMachine } from "@/components/alimentec/KitMachineSearch";
import ClientProposalView from "@/components/alimentec/ClientProposalView";
import { openOfferPdf } from "@/lib/alimentec-offer";
import { encodeCfg, decodeCfg } from "@/lib/alimentec-share";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const ADVISOR_KEY = "fuller_asesor";

/** Normaliza a 57XXXXXXXXXX si reconoce el formato colombiano; si no, deja dígitos. */
function waDigits(raw: string): string {
  const d = raw.replace(/\D/g, "");
  if (d.startsWith("57") && d.length === 12) return d;
  if (d.length === 10) return `57${d}`;
  return d;
}

type Advisor = { name: string; whatsapp: string };

export type ResolvedMachine = {
  slug: string;
  name: string;
  price: number;
  type?: string;
  included: boolean;
  group: "base" | "extra";
};

export type ResolvedLine = {
  key: string;
  label: string;
  unitLabel: string;
  salePrice: number;
  salePriceMax: number;
  unitsDay: number;
  unitsMax: number;
  insumos: Insumo[];
  insumoCostDefault: number;
  enabled: boolean;
};

export type ResolvedBusiness = {
  key: string;
  label: string;
  icon: string;
  blurb: string;
  daysMonth: number;
  fixedMonthly: number;
  fixedMax: number;
  machines: ResolvedMachine[];
  lines: ResolvedLine[];
};

type LineState = {
  salePrice: number;
  unitsDay: number;
  insumoCost: number;
  enabled: boolean;
};

function Slider({
  label, value, min, max, step, onChange, format,
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; format: (v: number) => string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-xs text-white/65">{label}</label>
        <span className="text-xs font-bold text-accent">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-secondary cursor-pointer"
      />
    </div>
  );
}

function useCountUp(value: number, duration = 700) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const startRef = useRef<number | null>(null);
  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    if (from === to) return;
    startRef.current = null;
    let raf = 0;
    const tick = (t: number) => {
      if (startRef.current === null) startRef.current = t;
      const p = Math.min(1, (t - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return display;
}

function MachineRow({
  m, checked, onToggle,
}: {
  m: ResolvedMachine; checked: boolean; onToggle: (v: boolean) => void;
}) {
  return (
    <label
      className={`flex items-center gap-3 rounded-xl border px-3 py-3 cursor-pointer transition ${
        checked ? "border-accent/40 bg-accent/10" : "border-white/10 bg-white/5 opacity-70"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onToggle(e.target.checked)}
        className="accent-accent size-4 shrink-0"
      />
      <Link
        href={`/productos/${m.slug}`}
        target="_blank"
        className="flex-1 text-sm text-white/90 hover:text-accent transition leading-snug"
      >
        {m.name}
      </Link>
      <span className="text-sm font-bold text-white whitespace-nowrap">{formatCOP(m.price)}</span>
    </label>
  );
}

function initLines(biz: ResolvedBusiness): Record<string, LineState> {
  return Object.fromEntries(
    biz.lines.map((l) => [
      l.key,
      { salePrice: l.salePrice, unitsDay: l.unitsDay, insumoCost: l.insumoCostDefault, enabled: l.enabled },
    ]),
  );
}

export default function BusinessBuilder({ businesses }: { businesses: ResolvedBusiness[] }) {
  const [bizKey, setBizKey] = useState(businesses[0]?.key ?? "");
  const biz = businesses.find((b) => b.key === bizKey) ?? businesses[0];

  const [included, setIncluded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(biz.machines.map((m) => [m.slug, m.included])),
  );
  const [added, setAdded] = useState<AddableMachine[]>([]);
  const [lineState, setLineState] = useState<Record<string, LineState>>(() => initLines(biz));
  const [daysMonth, setDaysMonth] = useState(biz.daysMonth);
  const [fixedMonthly, setFixedMonthly] = useState(biz.fixedMonthly);
  const [captureOpen, setCaptureOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [discountPct, setDiscountPct] = useState(0);
  const [advisor, setAdvisor] = useState<Advisor>({ name: "", whatsapp: "" });
  const [advisorOpen, setAdvisorOpen] = useState(false);
  const [fromCfg, setFromCfg] = useState(false);

  // Carga el asesor guardado en este dispositivo (stand).
  useEffect(() => {
    let raw: string | null = null;
    try {
      raw = window.localStorage.getItem(ADVISOR_KEY);
    } catch {
      raw = null;
    }
    if (!raw) return;
    try {
      const a = JSON.parse(raw) as Advisor;
      queueMicrotask(() => setAdvisor({ name: a.name ?? "", whatsapp: a.whatsapp ?? "" }));
    } catch {
      /* ignorar */
    }
  }, []);

  function saveAdvisor(a: Advisor) {
    setAdvisor(a);
    try {
      window.localStorage.setItem(ADVISOR_KEY, JSON.stringify(a));
    } catch {
      /* sin persistencia */
    }
    setAdvisorOpen(false);
  }

  // Hidratación desde ?cfg= (cuando se abre el QR en el celular).
  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("cfg");
    if (!raw) return;
    const cfg = decodeCfg(raw);
    if (!cfg) return;
    const tb = businesses.find((b) => b.key === cfg.b);
    if (!tb) return;
    (async () => {
      setFromCfg(true);
      // El celular del cliente no tiene asesor propio → toma el del link.
      if (cfg.a || cfg.w) {
        let localRaw: string | null = null;
        try {
          localRaw = window.localStorage.getItem(ADVISOR_KEY);
        } catch {
          localRaw = null;
        }
        if (!localRaw) setAdvisor({ name: cfg.a ?? "", whatsapp: cfg.w ?? "" });
      }
      setBizKey(tb.key);
      setIncluded(Object.fromEntries(tb.machines.map((m) => [m.slug, cfg.inc.includes(m.slug)])));
      // Líneas por key (preset o derivada de máquina).
      setLineState(
        Object.fromEntries(
          (cfg.ln ?? []).map((a) => [
            String(a[0]),
            { salePrice: Number(a[1]), unitsDay: Number(a[2]), insumoCost: Number(a[3]), enabled: a[4] === 1 },
          ]),
        ),
      );
      setDaysMonth(cfg.d || tb.daysMonth);
      setFixedMonthly(cfg.f || tb.fixedMonthly);
      setDiscountPct(typeof cfg.disc === "number" ? cfg.disc : 0);
      // Resuelve las máquinas agregadas (slugs) contra el índice del catálogo.
      const addSlugs = cfg.add.filter((s) => !tb.machines.some((m) => m.slug === s));
      if (addSlugs.length) {
        try {
          const idx = (await fetch("/api/search-index").then((r) => (r.ok ? r.json() : []))) as {
            slug: string; name: string; price: number | null; type?: string;
          }[];
          const map = new Map(idx.map((p) => [p.slug, p]));
          const resolved = addSlugs
            .map((s) => map.get(s))
            .filter((p): p is { slug: string; name: string; price: number; type?: string } => !!p?.price)
            .map((p) => ({ slug: p.slug, name: p.name, price: p.price, type: p.type }));
          setAdded(resolved);
        } catch {
          /* sin índice, se omiten las agregadas */
        }
      }
    })();
  }, [businesses]);

  function applyDefaults(b: ResolvedBusiness) {
    setIncluded(Object.fromEntries(b.machines.map((m) => [m.slug, m.included])));
    setAdded([]);
    setLineState(initLines(b));
    setDaysMonth(b.daysMonth);
    setFixedMonthly(b.fixedMonthly);
    setDiscountPct(0);
  }

  function selectBusiness(key: string) {
    const b = businesses.find((x) => x.key === key);
    if (!b) return;
    setBizKey(key);
    applyDefaults(b);
  }

  function patchLine(key: string, patch: Partial<LineState>) {
    setLineState((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));
  }

  const base = biz.machines.filter((m) => m.group === "base");
  const extras = biz.machines.filter((m) => m.group === "extra");
  const selectedKit = biz.machines.filter((m) => included[m.slug]);
  const selectedMachines = [...selectedKit, ...added];
  const investment = selectedMachines.reduce((sum, m) => sum + m.price, 0);
  const discountedInvestment = Math.round(investment * (1 - discountPct / 100));
  const usedSlugs = new Set([...biz.machines.map((m) => m.slug), ...added.map((m) => m.slug)]);

  function addMachine(m: AddableMachine) {
    setAdded((prev) => (prev.some((x) => x.slug === m.slug) ? prev : [...prev, m]));
  }
  function removeAdded(slug: string) {
    setAdded((prev) => prev.filter((x) => x.slug !== slug));
  }

  // Líneas de producto: las del negocio (preset) + las DERIVADAS de las máquinas
  // del kit (extras incluidos + agregadas). Si metes una crispetera/granizadora,
  // aparece su línea de ingresos. Dedupe por key (= producto) para no duplicar.
  const presetKeys = new Set(biz.lines.map((l) => l.key));
  const derivedLines: ResolvedLine[] = [];
  const seen = new Set(presetKeys);
  for (const m of [...selectedKit.filter((x) => x.group === "extra"), ...added]) {
    const tl = typeLine(m.type);
    if (!tl || seen.has(tl.product)) continue;
    seen.add(tl.product);
    derivedLines.push({
      key: tl.product,
      label: tl.label,
      unitLabel: tl.unitLabel,
      salePrice: tl.salePrice,
      salePriceMax: tl.salePriceMax,
      unitsDay: tl.unitsDay,
      unitsMax: tl.unitsMax,
      insumos: tl.insumos,
      insumoCostDefault: lineInsumoCost(tl),
      enabled: true,
    });
  }
  const allLines: ResolvedLine[] = [...biz.lines, ...derivedLines];

  // Líneas para el motor de cálculo (mismo en cliente y server).
  const lineInputs: LineInput[] = allLines.map((l) => {
    const s = lineState[l.key] ?? { salePrice: l.salePrice, unitsDay: l.unitsDay, insumoCost: l.insumoCostDefault, enabled: l.enabled };
    return {
      key: l.key,
      label: l.label,
      unitLabel: l.unitLabel,
      salePrice: s.salePrice,
      insumoCost: s.insumoCost,
      unitsDay: s.unitsDay,
      enabled: s.enabled,
    };
  });

  const result = computeBusiness(lineInputs, daysMonth, fixedMonthly, discountedInvestment);

  const animatedProfit = useCountUp(result.monthlyProfit);
  const animatedInvestment = useCountUp(discountedInvestment);
  const paybackPct =
    result.payback == null ? 0 : Math.max(6, Math.min(100, (18 / result.payback) * 60 + 6));

  const activeLines = lineInputs.filter((l) => l.enabled);

  function downloadPdf() {
    const byKey = new Map(result.lines.map((r) => [r.key, r]));
    openOfferPdf({
      businessLabel: biz.label,
      machines: selectedMachines.map((m) => ({ name: m.name, price: m.price })),
      investment,
      discountPct,
      daysMonth,
      fixedMonthly,
      lines: activeLines.map((l) => ({
        label: l.label,
        unitLabel: l.unitLabel,
        salePrice: l.salePrice,
        insumoCost: l.insumoCost,
        unitsDay: l.unitsDay,
        monthlyGross: byKey.get(l.key)?.monthlyGross ?? 0,
      })),
      result,
      fair: {
        name: FAIR.name, pavilion: FAIR.pavilion, stand: FAIR.stand,
        venue: FAIR.venue, datesLabel: FAIR.datesLabel,
      },
      advisor: { name: advisor.name, whatsapp: advisor.whatsapp ? waDigits(advisor.whatsapp) : "" },
    });
  }

  // URL que reconstruye esta simulación (para el QR).
  function buildShareUrl(): string {
    const cfg = {
      b: bizKey,
      inc: selectedKit.map((m) => m.slug),
      add: added.map((m) => m.slug),
      ln: lineInputs.map((l) => [l.key, l.salePrice, l.unitsDay, l.insumoCost, l.enabled ? 1 : 0]),
      d: daysMonth,
      f: fixedMonthly,
      disc: discountPct || undefined,
      a: advisor.name || undefined,
      w: advisor.whatsapp ? waDigits(advisor.whatsapp) : undefined,
    };
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return `${origin}/alimentec/arma-tu-negocio?cfg=${encodeCfg(cfg)}`;
  }

  // El asesor arma el kit y genera el QR directo. El cliente lo escanea, ve su
  // propuesta (resumen limpio) y deja sus datos desde su propio celular → ahí se
  // captura el lead en ZOCAM (no en el stand).
  async function openCapture() {
    setCaptureOpen(true);
    try {
      const QR = await import("qrcode");
      const dataUrl = await QR.toDataURL(buildShareUrl(), {
        width: 360,
        margin: 1,
        color: { dark: "#013d02", light: "#ffffff" },
      });
      setQrDataUrl(dataUrl);
    } catch {
      setQrDataUrl("");
    }
  }

  // Vista del CLIENTE (abrió el QR en su celular): resumen limpio + form, no la
  // herramienta editable.
  if (fromCfg) {
    return (
      <ClientProposalView
        businessLabel={biz.label}
        machines={selectedMachines.map((m) => ({ name: m.name, price: m.price, slug: m.slug }))}
        investment={discountedInvestment}
        discountPct={discountPct}
        monthlyProfit={result.monthlyProfit}
        monthlyRevenue={result.monthlyRevenue}
        monthlyInsumos={result.monthlyInsumos}
        fixedMonthly={fixedMonthly}
        payback={result.payback}
        fair={{
          name: FAIR.name, pavilion: FAIR.pavilion, stand: FAIR.stand,
          venue: FAIR.venue, datesLabel: FAIR.datesLabel,
        }}
        advisor={advisor}
        shareUrl={buildShareUrl()}
        onDownloadPdf={downloadPdf}
      />
    );
  }

  return (
    <div className="bg-gradient-to-br from-bg-dark to-slate-900 text-white rounded-3xl p-6 md:p-10">
      {/* Barra del asesor (no se muestra en la vista del cliente desde el QR) */}
      {!fromCfg && (
        <div className="flex items-center justify-between gap-3 mb-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-accent shrink-0" style={{ fontSize: "20px" }}>badge</span>
            <span className="text-sm text-white/80 truncate">
              Asesor:{" "}
              <strong className={advisor.name ? "text-white" : "text-amber-300"}>
                {advisor.name || "sin asignar"}
              </strong>
              {advisor.whatsapp && <span className="text-white/40"> · {advisor.whatsapp}</span>}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setAdvisorOpen(true)}
            className="shrink-0 inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "15px" }}>edit</span>
            {advisor.name ? "Cambiar" : "Definir asesor"}
          </button>
        </div>
      )}

      {/* Contacto del asesor para el cliente (cuando abre la propuesta en su celular) */}
      {fromCfg && advisor.whatsapp && (
        <a
          href={buildWhatsAppUrl(
            waDigits(advisor.whatsapp),
            `Hola${advisor.name ? " " + advisor.name : ""}, vi la propuesta que me armaste en Fuller (Alimentec) y quiero seguir.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          data-zocam-event="cliente-contacta-asesor"
          className="flex items-center justify-center gap-2 mb-6 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-sm px-4 py-3 rounded-full transition"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>chat</span>
          Hablar con {advisor.name || "tu asesor"} por WhatsApp
        </a>
      )}

      {/* Negocios */}
      <p className="text-sm text-white/80 font-medium mb-3">1. Elige tu negocio</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-8">
        {businesses.map((b) => (
          <button
            key={b.key}
            type="button"
            onClick={() => selectBusiness(b.key)}
            className={`flex flex-col items-center gap-1.5 text-center rounded-2xl border px-3 py-4 transition ${
              b.key === bizKey
                ? "border-accent bg-accent/15 text-white"
                : "border-white/10 bg-white/5 text-white/70 hover:border-white/25"
            }`}
          >
            <span className="material-symbols-outlined text-accent" style={{ fontSize: "26px" }}>{b.icon}</span>
            <span className="text-xs font-medium leading-tight">{b.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* ── Izquierda: kit + qué vende + costos ── */}
        <div className="space-y-7">
          {/* Kit base */}
          <div>
            <p className="text-sm text-white/80 font-medium mb-2">
              2. Tu kit recomendado{" "}
              <span className="text-white/40 font-normal">(quita lo que no necesites)</span>
            </p>
            <div className="space-y-2">
              {base.map((m) => (
                <MachineRow key={m.slug} m={m} checked={!!included[m.slug]}
                  onToggle={(v) => setIncluded((prev) => ({ ...prev, [m.slug]: v }))} />
              ))}
            </div>
          </div>

          {extras.length > 0 && (
            <div>
              <p className="text-sm text-white/80 font-medium mb-2">
                Agrégale a tu negocio{" "}
                <span className="text-white/40 font-normal">(opcional, sube tu capacidad)</span>
              </p>
              <div className="space-y-2">
                {extras.map((m) => (
                  <MachineRow key={m.slug} m={m} checked={!!included[m.slug]}
                    onToggle={(v) => setIncluded((prev) => ({ ...prev, [m.slug]: v }))} />
                ))}
              </div>
            </div>
          )}

          {/* Buscador catálogo */}
          <div>
            <p className="text-sm text-white/80 font-medium mb-2">
              ¿Falta una máquina?{" "}
              <span className="text-white/40 font-normal">búscala en el catálogo y agrégala</span>
            </p>
            <KitMachineSearch onAdd={addMachine} excludeSlugs={usedSlugs} />
            {added.length > 0 && (
              <div className="space-y-2 mt-3">
                {added.map((m) => (
                  <div key={m.slug} className="flex items-center gap-3 rounded-xl border border-accent/40 bg-accent/10 px-3 py-3">
                    <span className="material-symbols-outlined text-accent shrink-0" style={{ fontSize: "18px" }}>check_circle</span>
                    <Link href={`/productos/${m.slug}`} target="_blank" className="flex-1 text-sm text-white/90 hover:text-accent transition leading-snug">
                      {m.name}
                    </Link>
                    <span className="text-sm font-bold text-white whitespace-nowrap">{formatCOP(m.price)}</span>
                    <button type="button" onClick={() => removeAdded(m.slug)} aria-label="Quitar" className="shrink-0 text-white/50 hover:text-secondary transition">
                      <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>close</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Qué vas a vender (líneas) */}
          <div>
            <p className="text-sm text-white/80 font-medium mb-2">
              3. Qué vas a vender{" "}
              <span className="text-white/40 font-normal">(activa y ajusta cada producto)</span>
            </p>
            <div className="space-y-3">
              {allLines.map((l) => {
                const s = lineState[l.key] ?? {
                  salePrice: l.salePrice, unitsDay: l.unitsDay, insumoCost: l.insumoCostDefault, enabled: l.enabled,
                };
                return (
                  <div
                    key={l.key}
                    className={`rounded-2xl border px-4 py-3 transition ${
                      s.enabled ? "border-accent/30 bg-white/5" : "border-white/10 bg-white/5 opacity-60"
                    }`}
                  >
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={s.enabled}
                        onChange={(e) => patchLine(l.key, { enabled: e.target.checked })}
                        className="accent-accent size-4 shrink-0"
                      />
                      <span className="flex-1 text-sm font-semibold text-white">{l.label}</span>
                    </label>
                    {s.enabled && (
                      <div className="mt-3 space-y-3">
                        <Slider
                          label={`Precio por ${l.unitLabel}`}
                          value={s.salePrice} min={1000} max={l.salePriceMax} step={500}
                          onChange={(v) => patchLine(l.key, { salePrice: v })} format={formatCOP}
                        />
                        <Slider
                          label={`${l.unitLabel[0].toUpperCase() + l.unitLabel.slice(1)}s por día`}
                          value={s.unitsDay} min={0} max={l.unitsMax} step={5}
                          onChange={(v) => patchLine(l.key, { unitsDay: v })} format={(v) => `${v}`}
                        />
                        <Slider
                          label={`Costo insumos por ${l.unitLabel}`}
                          value={s.insumoCost} min={0} max={Math.max(s.salePrice, 1)} step={50}
                          onChange={(v) => patchLine(l.key, { insumoCost: v })} format={formatCOP}
                        />
                        <details>
                          <summary className="text-[11px] text-white/40 cursor-pointer hover:text-white/70 inline-flex items-center gap-1">
                            <span className="material-symbols-outlined" style={{ fontSize: "13px" }}>receipt_long</span>
                            Referencia de insumos
                          </summary>
                          <ul className="mt-1.5 space-y-0.5 pl-1">
                            {l.insumos.map((i) => (
                              <li key={i.label} className="flex justify-between text-[11px] text-white/50">
                                <span>{i.label}</span>
                                <span>{formatCOP(i.cost)}</span>
                              </li>
                            ))}
                          </ul>
                        </details>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Costos globales */}
          <div className="space-y-4">
            <p className="text-sm text-white/80 font-medium">4. Operación</p>
            <Slider
              label="Días de venta al mes"
              value={daysMonth} min={10} max={31} step={1}
              onChange={setDaysMonth} format={(v) => `${v} días`}
            />
            <Slider
              label="Costos fijos al mes (arriendo, servicios)"
              value={fixedMonthly} min={0} max={biz.fixedMax} step={100000}
              onChange={setFixedMonthly} format={formatCOP}
            />
            <Slider
              label="Descuento en el kit (opcional)"
              value={discountPct} min={0} max={30} step={1}
              onChange={setDiscountPct} format={(v) => `${v}%`}
            />
          </div>
        </div>

        {/* ── Derecha: resultado ── */}
        <div className="flex flex-col gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
              Inversión del kit ({selectedMachines.length} máquina{selectedMachines.length === 1 ? "" : "s"})
            </p>
            {discountPct > 0 ? (
              <>
                <p className="text-white/40 text-sm line-through">{formatCOP(investment)}</p>
                <p className="font-display font-black text-3xl text-white">
                  {formatCOP(animatedInvestment)}{" "}
                  <span className="text-secondary text-base font-bold align-middle">-{discountPct}%</span>
                </p>
              </>
            ) : (
              <p className="font-display font-black text-3xl text-white">{formatCOP(animatedInvestment)}</p>
            )}
            <p className="text-white/40 text-xs mt-1">Precios reales del catálogo Fuller.</p>
          </div>

          <div className="bg-accent/10 border border-accent/30 rounded-xl p-5">
            <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Utilidad neta estimada al mes</p>
            <p className={`font-display font-black text-3xl md:text-4xl ${result.monthlyProfit > 0 ? "text-accent" : "text-red-400"}`}>
              {formatCOP(animatedProfit)}
            </p>
            <p className="text-white/40 text-xs mt-1">
              Ingreso {formatCOP(result.monthlyRevenue)} − insumos {formatCOP(result.monthlyInsumos)} − fijos {formatCOP(fixedMonthly)}
            </p>
          </div>

          {/* Desglose por producto */}
          {result.lines.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-white/60 text-xs uppercase tracking-wider mb-2">Aporte por producto</p>
              <table className="w-full text-sm">
                <tbody>
                  {result.lines.map((l) => (
                    <tr key={l.key} className="border-t border-white/10 first:border-0">
                      <td className="py-1.5 text-white/80">{l.label}</td>
                      <td className="py-1.5 text-white/50 text-right">{l.monthlyUnits} u/mes</td>
                      <td className="py-1.5 text-right font-bold text-white">{formatCOP(l.monthlyGross)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="bg-secondary/15 border border-secondary/30 rounded-xl p-5">
            <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Recuperas tu inversión en</p>
            <p className="font-display font-black text-3xl md:text-4xl text-white">{formatPayback(result.payback)}</p>
            <div className="mt-3 h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-accent to-green-400 transition-all duration-700" style={{ width: `${paybackPct}%` }} />
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-white/60 text-xs uppercase tracking-wider mb-2">Según tu volumen de ventas</p>
            <table className="w-full text-sm">
              <tbody>
                {result.scenarios.map((s) => (
                  <tr key={s.name} className="border-t border-white/10 first:border-0">
                    <td className="py-2 text-white/80">{s.name}</td>
                    <td className="py-2 text-right text-white/70">{formatCOP(s.profit)}</td>
                    <td className="py-2 text-right font-bold text-white">{formatPayback(s.payback)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTAs — el asesor captura el lead y genera QR + PDF */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
            <button
              type="button"
              onClick={openCapture}
              disabled={selectedMachines.length === 0}
              data-zocam-event="armar-generar-propuesta"
              className="sm:col-span-2 inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 disabled:opacity-50 text-white font-bold text-sm px-4 py-4 rounded-full transition hover:scale-[1.02]"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>send</span>
              Generar propuesta del cliente
            </button>
            <button
              type="button"
              onClick={() => applyDefaults(biz)}
              data-zocam-event="armar-reset"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm px-4 py-4 rounded-full transition hover:scale-[1.02]"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>restart_alt</span>
              Nueva simulación
            </button>
          </div>
          {selectedMachines.length === 0 && (
            <p className="text-white/40 text-xs text-center">
              Agrega al menos una máquina al kit para generar la propuesta.
            </p>
          )}
        </div>
      </div>

      {/* Modal: QR para que el cliente escanee y abra su propuesta + deje datos */}
      {captureOpen && (
        <div
          className="fixed inset-0 z-[130] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setCaptureOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-7 max-w-sm w-full text-center max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 mx-auto rounded-full bg-accent/15 flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-accent" style={{ fontSize: "30px" }}>qr_code_2</span>
            </div>
            <p className="font-display font-black text-2xl text-primary mb-1">Propuesta lista</p>
            <p className="text-gray-500 text-sm mb-1">
              El cliente escanea este QR, ve su propuesta y deja sus datos desde su
              celular. El lead te queda asignado a ti.
            </p>
            <p className="text-xs text-gray-400 mb-4">
              Asesor: <strong className={advisor.name ? "text-primary" : "text-secondary"}>{advisor.name || "sin asignar"}</strong>
              {!advisor.name && (
                <button
                  type="button"
                  onClick={() => { setCaptureOpen(false); setAdvisorOpen(true); }}
                  className="ml-2 font-semibold text-primary hover:underline"
                >
                  Definir
                </button>
              )}
            </p>
            {qrDataUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={qrDataUrl}
                alt="Código QR de la propuesta"
                width={260}
                height={260}
                className="mx-auto rounded-xl border border-gray-100"
              />
            ) : (
              <p className="text-gray-400 text-sm py-10">Generando QR…</p>
            )}
            <div className="grid grid-cols-1 gap-2 mt-5">
              <button
                type="button"
                onClick={downloadPdf}
                data-zocam-event="armar-pdf"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-sm px-6 py-3 rounded-full transition"
              >
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>download</span>
                Descargar PDF
              </button>
              <button
                type="button"
                onClick={() => setCaptureOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-sm py-1"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: definir asesor (se guarda en este dispositivo) */}
      {advisorOpen && (
        <div
          className="fixed inset-0 z-[140] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setAdvisorOpen(false)}
        >
          <form
            className="bg-white rounded-3xl p-7 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault();
              const d = new FormData(e.currentTarget);
              const name = String(d.get("adv_name") ?? "").trim();
              const whatsapp = String(d.get("adv_wa") ?? "").trim();
              saveAdvisor({ name, whatsapp });
            }}
          >
            <p className="font-display font-black text-2xl text-primary mb-1">Asesor del stand</p>
            <p className="text-gray-500 text-sm mb-5">
              Tu nombre asigna el lead en ZOCAM y tu WhatsApp queda en la propuesta del cliente.
              Se guarda en este equipo.
            </p>
            <div className="space-y-3">
              <input
                name="adv_name" type="text" defaultValue={advisor.name} placeholder="Tu nombre *"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <input
                name="adv_wa" type="tel" inputMode="tel" defaultValue={advisor.whatsapp} placeholder="Tu WhatsApp (ej: 312 345 6789)"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>
            <button
              type="submit"
              className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-sm px-6 py-3 rounded-full transition"
            >
              Guardar asesor
            </button>
            <button
              type="button"
              onClick={() => setAdvisorOpen(false)}
              className="w-full text-gray-400 hover:text-gray-600 text-sm py-2"
            >
              Cancelar
            </button>
          </form>
        </div>
      )}

      <p className="text-white/35 text-xs mt-8 leading-relaxed">
        * Utilidad <strong className="text-white/50">neta</strong> estimada: suma de
        todas las líneas de producto activas (ingresos menos insumos) menos costos
        fijos. Precios de insumos de referencia de supermercado (editables); la
        inversión usa precios reales del catálogo. No es promesa de rentabilidad: si
        el retorno son 14 meses, decimos 14. Resultados dependen de ubicación,
        demanda y temporada.
      </p>
    </div>
  );
}
