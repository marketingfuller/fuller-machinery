"use client";

import { useState } from "react";
import { formatCOP, CALC_DEFAULTS, type ProductCategory } from "@/lib/products-shared";

function Slider({
  label, value, min, max, step, onChange, format,
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; format: (v: number) => string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm text-white/70">{label}</label>
        <span className="text-sm font-bold text-accent">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-secondary cursor-pointer"
      />
    </div>
  );
}

export default function ProfitCalculator({
  price: machinePrice,
  category,
}: {
  price: number;
  category: ProductCategory;
}) {
  const d = CALC_DEFAULTS[category];
  const [price, setPrice] = useState(d?.price ?? 5000);
  const [unitsDay, setUnitsDay] = useState(d?.unitsDay ?? 50);
  const [daysMonth, setDaysMonth] = useState(d?.daysMonth ?? 26);
  const [cost, setCost] = useState(d?.cost ?? 1500);
  const [fixed, setFixed] = useState(d?.fixed ?? 800000);

  if (!d) return null;

  // Cálculo: utilidad NETA = (precio - costo insumo) x unidades - costos fijos.
  const netPerUnit = price - cost;
  const monthlyUnits = unitsDay * daysMonth;
  const monthlyRevenue = price * monthlyUnits;
  const monthlyProfit = netPerUnit * monthlyUnits - fixed;
  const payback = monthlyProfit > 0 ? machinePrice / monthlyProfit : null;

  // Diagnóstico honesto cuando aún no es rentable: muestra dónde está el cuello de
  // botella (margen negativo, volumen bajo o costos fijos altos) e invita a no
  // depender de un solo producto/equipo (cross-selling).
  const breakEvenPerDay =
    netPerUnit > 0 ? Math.ceil(fixed / (netPerUnit * daysMonth)) : null;

  // 3 escenarios por volumen de venta (conservador / realista / optimista).
  const scenarios = [
    { name: "Conservador", factor: 0.6 },
    { name: "Realista", factor: 1 },
    { name: "Optimista", factor: 1.4 },
  ].map((s) => {
    const u = Math.round(unitsDay * s.factor);
    const profit = netPerUnit * u * daysMonth - fixed;
    return {
      ...s,
      units: u,
      profit,
      payback: profit > 0 ? machinePrice / profit : null,
    };
  });

  const fmtMonths = (m: number | null) =>
    m == null ? "—" : m < 1 ? "menos de 1 mes" : `${m.toFixed(1)} meses`;

  return (
    <section className="bg-gradient-to-br from-bg-dark to-slate-900 text-white rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-2 mb-1">
        <span className="material-symbols-outlined text-accent">trending_up</span>
        <h2 className="font-display font-black text-2xl text-white">
          ¿Cuánto puedes ganar con este equipo?
        </h2>
      </div>
      <p className="text-white/60 text-sm mb-6">
        Ajusta los valores a tu negocio y mira tu rentabilidad estimada.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controles */}
        <div className="space-y-5">
          <Slider label={`Precio de venta por ${d.unitLabel}`} value={price} min={500} max={d.priceMax} step={500} onChange={setPrice} format={formatCOP} />
          <Slider label={`Unidades vendidas por día`} value={unitsDay} min={5} max={d.unitsMax} step={5} onChange={setUnitsDay} format={(v) => `${v} ${d.unitLabel}s`} />
          <Slider label="Días de venta al mes" value={daysMonth} min={10} max={31} step={1} onChange={setDaysMonth} format={(v) => `${v} días`} />
          <Slider label={`Costo de insumos por ${d.unitLabel}`} value={cost} min={0} max={Math.max(price, 1)} step={100} onChange={setCost} format={formatCOP} />
          <Slider label="Costos fijos al mes (arriendo, servicios, personal)" value={fixed} min={0} max={5000000} step={100000} onChange={setFixed} format={formatCOP} />
        </div>

        {/* Resultado */}
        <div className="flex flex-col gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center sm:text-left">
            <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Utilidad neta estimada al mes</p>
            <p className={`font-display font-black text-3xl md:text-4xl ${monthlyProfit > 0 ? "text-accent" : "text-red-400"}`}>
              {formatCOP(Math.round(monthlyProfit))}
            </p>
            <p className="text-white/40 text-xs mt-1">
              Ingreso {formatCOP(Math.round(monthlyRevenue))} − insumos − costos fijos
            </p>
          </div>

          <div className="bg-secondary/15 border border-secondary/30 rounded-xl p-5 text-center sm:text-left">
            <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Recuperas tu inversión en</p>
            <p className="font-display font-black text-3xl md:text-4xl text-white">{fmtMonths(payback)}</p>
            <p className="text-white/40 text-xs mt-1">
              Inversión del equipo: {formatCOP(machinePrice)}
            </p>
          </div>

          {/* Diagnóstico honesto cuando aún no es rentable */}
          {monthlyProfit <= 0 && (
            <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-5">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-amber-400 text-[22px] mt-0.5 shrink-0">
                  lightbulb
                </span>
                <div className="space-y-2 text-sm">
                  {netPerUnit <= 0 ? (
                    <p className="text-white/80">
                      Tu <strong className="text-white">costo de insumos ({formatCOP(cost)})</strong> es
                      igual o mayor que el <strong className="text-white">precio de venta ({formatCOP(price)})</strong>:
                      así cada {d.unitLabel} te haría perder dinero. Sube el precio o baja el costo.
                    </p>
                  ) : (
                    <p className="text-white/80">
                      Con estos supuestos <strong className="text-white">aún no llegas al punto de
                      equilibrio</strong>. Para cubrir tus costos fijos de {formatCOP(fixed)} necesitas
                      vender ~<strong className="text-amber-300">{breakEvenPerDay} {d.unitLabel}
                      {breakEvenPerDay === 1 ? "" : "s"}/día</strong> (hoy pusiste {unitsDay}). Si tu
                      operación es pequeña, baja también los <strong className="text-white">costos fijos</strong>.
                    </p>
                  )}
                  <p className="text-white/70">
                    <strong className="text-white">Y ojo:</strong> casi ningún negocio vive de un solo
                    producto. Si solo cuentas las ventas de este equipo, el cálculo se queda corto —
                    combinando varios productos y equipos repartes los costos fijos y llegas al
                    equilibrio mucho antes.
                  </p>
                  <a
                    href={`/productos?categoria=${category}`}
                    className="inline-flex items-center gap-1 text-accent font-bold hover:underline"
                  >
                    Ver más equipos para tu negocio
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* 3 escenarios */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-white/60 text-xs uppercase tracking-wider mb-2">Según tu volumen de ventas</p>
            <table className="w-full text-sm">
              <tbody>
                {scenarios.map((s) => (
                  <tr key={s.name} className="border-t border-white/10 first:border-0">
                    <td className="py-2 text-white/80">{s.name}</td>
                    <td className="py-2 text-white/50 text-right">{s.units} {d.unitLabel}s/día</td>
                    <td className="py-2 text-right font-bold text-white">{fmtMonths(s.payback)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <p className="text-white/35 text-xs mt-6">
        * Estimación con tus propios supuestos, no una promesa de rentabilidad. Los
        resultados reales dependen de tu ubicación, demanda y operación.
      </p>
    </section>
  );
}
