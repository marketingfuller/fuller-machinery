import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products-shared";
import { formatCOP } from "@/lib/products-shared";

/**
 * Tabla "elige tu modelo": compara los productos de una misma familia
 * (ej. granizadora 1/2/3 tanques) usando precio y specs reales. Guía al
 * usuario al mejor valor sin inventar bundles ni descuentos.
 */
export default function ProductComparison({
  family,
  currentSlug,
}: {
  family: Product[];
  currentSlug: string;
}) {
  // Specs comunes a todos (para filas de comparación coherentes).
  const labelCounts = new Map<string, number>();
  for (const p of family)
    for (const s of p.specs)
      labelCounts.set(s.label, (labelCounts.get(s.label) ?? 0) + 1);
  const commonLabels = [...labelCounts.entries()]
    .filter(([, n]) => n === family.length)
    .map(([l]) => l)
    .slice(0, 5);

  return (
    <section className="bg-white py-14 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display font-black text-2xl md:text-3xl text-slate-900 mb-2">
          Elige tu modelo
        </h2>
        <p className="text-slate-500 mb-8">
          Compara las versiones de esta línea y escoge la que se ajusta a tu operación.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 w-32" />
                {family.map((p) => {
                  const isCurrent = p.slug === currentSlug;
                  return (
                    <th
                      key={p.slug}
                      className={`p-3 align-top text-center ${
                        isCurrent ? "bg-primary/5 rounded-t-xl" : ""
                      }`}
                    >
                      <Link href={`/productos/${p.slug}`} className="block group">
                        <div className="relative aspect-square w-28 mx-auto mb-2 bg-white rounded-lg border border-slate-100">
                          <Image
                            src={p.images[0]}
                            alt={p.name}
                            fill
                            sizes="120px"
                            className="object-contain p-2"
                          />
                        </div>
                        <span className="block font-bold text-sm text-slate-900 group-hover:text-primary leading-tight">
                          {p.name}
                        </span>
                        {isCurrent && (
                          <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                            Estás viendo este
                          </span>
                        )}
                      </Link>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-t border-slate-100">
                <td className="p-3 font-semibold text-slate-500">Precio</td>
                {family.map((p) => (
                  <td
                    key={p.slug}
                    className={`p-3 text-center font-display font-black text-slate-900 ${
                      p.slug === currentSlug ? "bg-primary/5" : ""
                    }`}
                  >
                    {typeof p.price === "number" && p.price > 0
                      ? formatCOP(p.price)
                      : "Cotizar"}
                  </td>
                ))}
              </tr>
              {commonLabels.map((label) => (
                <tr key={label} className="border-t border-slate-100">
                  <td className="p-3 font-semibold text-slate-500">{label}</td>
                  {family.map((p) => (
                    <td
                      key={p.slug}
                      className={`p-3 text-center text-slate-700 ${
                        p.slug === currentSlug ? "bg-primary/5" : ""
                      }`}
                    >
                      {p.specs.find((s) => s.label === label)?.value ?? "—"}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-slate-100">
                <td className="p-3" />
                {family.map((p) => (
                  <td
                    key={p.slug}
                    className={`p-3 text-center ${
                      p.slug === currentSlug ? "bg-primary/5 rounded-b-xl" : ""
                    }`}
                  >
                    {p.slug === currentSlug ? (
                      <span className="text-xs text-slate-400">Modelo actual</span>
                    ) : (
                      <Link
                        href={`/productos/${p.slug}`}
                        className="inline-flex items-center gap-1 text-primary hover:text-secondary font-bold text-xs"
                      >
                        Ver modelo
                        <span className="material-symbols-outlined text-[14px]">
                          arrow_forward
                        </span>
                      </Link>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
