import { type NextRequest } from "next/server";
import { getProductBySlug } from "@/lib/products";
import { getBusiness, lineInsumoCost } from "@/content/alimentec-roi";
import { computeBusiness, DIAS_MES, type LineInput } from "@/lib/roi";

// Cálculo de "arma tu negocio" server-side. La INVERSIÓN suma el precio REAL de
// las máquinas del kit (incluidas las agregadas por el usuario desde el buscador);
// getProductBySlug descarta slugs inválidos. El negocio vende varias líneas.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function num(v: unknown, fallback: number): number {
  const n = typeof v === "string" ? Number(v) : typeof v === "number" ? v : NaN;
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

type BodyLine = Partial<LineInput>;
type Body = {
  business?: unknown;
  machines?: unknown;
  lines?: unknown;
  daysMonth?: unknown;
  fixedMonthly?: unknown;
};

export async function POST(request: NextRequest) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const business = getBusiness(typeof body.business === "string" ? body.business : "");
  if (!business) {
    return Response.json({ ok: false, error: "unknown_business" }, { status: 400 });
  }

  // Inversión = precio real de las máquinas seleccionadas (cualquier slug válido).
  const requested = Array.isArray(body.machines)
    ? body.machines.filter((s): s is string => typeof s === "string")
    : business.machines.filter((m) => m.included).map((m) => m.slug);
  const resolved = await Promise.all(requested.map((slug) => getProductBySlug(slug)));
  const machines = resolved
    .filter((p): p is NonNullable<typeof p> => !!p?.price)
    .map((p) => ({ name: p.name, slug: p.slug, price: p.price as number }));
  const investment = machines.reduce((sum, m) => sum + m.price, 0);

  // Líneas de producto: las del cuerpo (saneadas) o las del negocio por defecto.
  const lines: LineInput[] = Array.isArray(body.lines)
    ? (body.lines as BodyLine[]).map((l, i) => {
        const def = business.productLines[i];
        return {
          key: typeof l.key === "string" ? l.key : def?.key ?? `linea-${i}`,
          label: typeof l.label === "string" ? l.label : def?.label ?? "Producto",
          unitLabel: typeof l.unitLabel === "string" ? l.unitLabel : def?.unitLabel ?? "unidad",
          salePrice: num(l.salePrice, def?.salePrice ?? 0),
          insumoCost: num(l.insumoCost, def ? lineInsumoCost(def) : 0),
          unitsDay: num(l.unitsDay, def?.unitsDay ?? 0),
          enabled: typeof l.enabled === "boolean" ? l.enabled : true,
        };
      })
    : business.productLines.map((def) => ({
        key: def.key,
        label: def.label,
        unitLabel: def.unitLabel,
        salePrice: def.salePrice,
        insumoCost: lineInsumoCost(def),
        unitsDay: def.unitsDay,
        enabled: def.enabled,
      }));

  const daysMonth = num(body.daysMonth, business.daysMonth || DIAS_MES);
  const fixedMonthly = num(body.fixedMonthly, business.fixedMonthly);

  const result = computeBusiness(lines, daysMonth, fixedMonthly, investment);

  return Response.json({
    ok: true,
    business: business.key,
    investment,
    machines,
    daysMonth,
    fixedMonthly,
    lines,
    result,
    disclaimer:
      "Utilidad NETA estimada con tus supuestos (precios de insumos de referencia, editables) y costos fijos descontados. No es promesa de rentabilidad.",
  });
}
