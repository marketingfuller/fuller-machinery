import Link from "next/link";

type CategoryKey =
  | "panaderia"
  | "bebidas"
  | "snacks"
  | "carnicos"
  | "refrigeracion"
  | "empaque";

const categories: Record<
  CategoryKey,
  { title: string; description: string; icon: string }
> = {
  panaderia: {
    title: "Panadería y Pastelería",
    description: "Hornos industriales, amasadoras y laminadoras",
    icon: "bakery_dining",
  },
  bebidas: {
    title: "Bebidas y Café",
    description: "Granizadoras, capuchineras y selladoras de vasos",
    icon: "local_cafe",
  },
  snacks: {
    title: "Snacks y Fast Food",
    description: "Crispeteras, waffleras y asadores de salchicha",
    icon: "lunch_dining",
  },
  carnicos: {
    title: "Cárnicos y Procesamiento",
    description: "Molinos de carne, sierras y embutidoras",
    icon: "restaurant",
  },
  refrigeracion: {
    title: "Refrigeración Comercial",
    description: "Congeladores y fabricadoras de hielo",
    icon: "ac_unit",
  },
  empaque: {
    title: "Empaque y Automatización",
    description: "Empacadoras al vacío y selladoras",
    icon: "inventory_2",
  },
};

export default function RelatedCategories({
  current,
}: {
  current: CategoryKey;
}) {
  const others = (Object.keys(categories) as CategoryKey[]).filter(
    (k) => k !== current
  );

  return (
    <section className="py-16 md:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-primary font-bold text-xs uppercase tracking-widest mb-2">
            Explora otras categorías
          </p>
          <h2 className="font-display font-black text-2xl md:text-3xl text-slate-900">
            Maquinaria para todos los negocios de comida
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {others.map((key) => {
            const cat = categories[key];
            return (
              <Link
                key={key}
                href={`/negocios/${key}`}
                className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col"
                aria-label={`Ver maquinaria para ${cat.title.toLowerCase()}`}
              >
                <div className="size-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined text-primary text-[22px]">
                    {cat.icon}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base text-slate-900 mb-1.5 leading-tight">
                  {cat.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed flex-1">
                  {cat.description}
                </p>
                <span className="inline-flex items-center gap-1 text-primary font-bold text-xs mt-4 group-hover:gap-2 transition-all uppercase tracking-wide">
                  Ver
                  <span className="material-symbols-outlined text-[14px]">
                    arrow_forward
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
