import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products-shared";
import { formatCOP } from "@/lib/products-shared";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function ProductCard({
  product,
  whatsappCommercial,
}: {
  product: Product;
  whatsappCommercial: string;
}) {
  const href = `/productos/${product.slug}`;
  const waMsg =
    product.whatsappMessage ??
    `Hola, me interesa conocer el precio de ${product.name}.`;

  return (
    <div className="group relative flex flex-col bg-white border border-slate-100 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <Link href={href} className="relative h-56 bg-white overflow-hidden block">
        <Image
          src={product.images[0]}
          alt={`${product.name} — ${product.categoryLabel} | Fuller Machinery Colombia`}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span
            className={`absolute top-4 left-4 z-10 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider text-white ${product.badge.color}`}
          >
            {product.badge.text}
          </span>
        )}
        <span className="absolute top-4 right-4 z-10 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded-full border border-emerald-200 uppercase flex items-center gap-1">
          <span className="material-symbols-outlined text-[10px]">local_shipping</span>
          Envío Seguro
        </span>
      </Link>

      <div className="p-6 flex flex-col flex-1">
        <Link href={href}>
          <h3 className="font-display font-bold text-base text-slate-900 mb-2 leading-snug hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {product.shortDescription}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {product.specs.slice(0, 3).map((s, j) => (
            <span
              key={j}
              className="bg-slate-100 text-slate-600 text-[11px] font-semibold px-2.5 py-1 rounded-md"
            >
              {s.value}
            </span>
          ))}
        </div>

        {typeof product.price === "number" && product.price > 0 && (
          <p className="text-slate-900 font-display font-black text-xl mb-4">
            {formatCOP(product.price)}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-2">
          <a
            href={buildWhatsAppUrl(whatsappCommercial, waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-secondary hover:bg-secondary/90 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">sell</span>
            Cotizar
          </a>
          <Link
            href={href}
            className="text-primary hover:text-secondary font-bold text-xs flex items-center gap-1 transition-colors"
          >
            Ver detalle
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
