// ────────────────────────────────────────────────────────────
// Lógica de "Arma tu negocio" (Alimentec) — fuente de verdad ÚNICA.
// La importan el componente cliente (preview en vivo) y /api/alimentec/roi.
// Server-safe: sin "use client", sin React.
//
// Modelo = utilidad NETA con costos fijos descontados y 3 escenarios
// (memoria feedback-honest-data). Un negocio vende VARIAS líneas de producto
// (café, horneados, malteadas…) → la utilidad suma todas las líneas activas y
// luego descuenta los costos fijos. La INVERSIÓN es la suma del KIT de máquinas
// reales. NO se cuenta "costo por operario".
// ────────────────────────────────────────────────────────────

/** Días de venta al mes por defecto (editable). */
export const DIAS_MES = 26;

/** Línea de producto que vende el negocio (todo editable en la UI). */
export type LineInput = {
  key: string;
  label: string;
  unitLabel: string;
  salePrice: number;
  insumoCost: number;
  unitsDay: number;
  enabled: boolean;
};

export type LineResult = {
  key: string;
  label: string;
  monthlyUnits: number;
  monthlyRevenue: number;
  /** Utilidad de la línea ANTES de costos fijos (precio−insumo)·unidades. */
  monthlyGross: number;
};

export type Scenario = {
  name: string;
  factor: number;
  profit: number;
  payback: number | null;
};

export type BusinessResult = {
  monthlyRevenue: number;
  monthlyInsumos: number;
  /** Suma de utilidades de líneas ANTES de costos fijos. */
  grossProfit: number;
  /** Utilidad NETA: grossProfit − costos fijos. */
  monthlyProfit: number;
  payback: number | null;
  lines: LineResult[];
  scenarios: Scenario[];
};

const SCENARIOS: { name: string; factor: number }[] = [
  { name: "Conservador", factor: 0.6 },
  { name: "Realista", factor: 1 },
  { name: "Optimista", factor: 1.4 },
];

export function computeBusiness(
  lines: LineInput[],
  daysMonth: number,
  fixedMonthly: number,
  investment: number,
): BusinessResult {
  const active = lines.filter((l) => l.enabled);

  let monthlyRevenue = 0;
  let monthlyInsumos = 0;
  let grossProfit = 0;
  const lineResults: LineResult[] = [];

  for (const l of active) {
    const monthlyUnits = l.unitsDay * daysMonth;
    const revenue = l.salePrice * monthlyUnits;
    const insumos = l.insumoCost * monthlyUnits;
    const gross = (l.salePrice - l.insumoCost) * monthlyUnits;
    monthlyRevenue += revenue;
    monthlyInsumos += insumos;
    grossProfit += gross;
    lineResults.push({
      key: l.key,
      label: l.label,
      monthlyUnits,
      monthlyRevenue: Math.round(revenue),
      monthlyGross: Math.round(gross),
    });
  }

  const monthlyProfit = Math.round(grossProfit - fixedMonthly);
  const payback =
    investment > 0 && monthlyProfit > 0 ? investment / monthlyProfit : null;

  const scenarios: Scenario[] = SCENARIOS.map((s) => {
    const gross = active.reduce(
      (sum, l) => sum + (l.salePrice - l.insumoCost) * Math.round(l.unitsDay * s.factor) * daysMonth,
      0,
    );
    const profit = Math.round(gross - fixedMonthly);
    return {
      ...s,
      profit,
      payback: investment > 0 && profit > 0 ? investment / profit : null,
    };
  });

  return {
    monthlyRevenue: Math.round(monthlyRevenue),
    monthlyInsumos: Math.round(monthlyInsumos),
    grossProfit: Math.round(grossProfit),
    monthlyProfit,
    payback,
    lines: lineResults,
    scenarios,
  };
}

/** Formatea el payback de forma honesta (si son 14 meses, dice 14). */
export function formatPayback(m: number | null): string {
  if (m == null) return "—";
  if (m < 1) return "menos de 1 mes";
  return `${m.toFixed(1).replace(/\.0$/, "")} meses`;
}
