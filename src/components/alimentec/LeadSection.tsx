import LeadForm from "@/components/alimentec/LeadForm";
import { FAIR } from "@/content/alimentec";

export default function LeadSection() {
  return (
    <section id="cotizar" className="py-20 md:py-28 bg-white scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Copy */}
          <div>
            <span className="inline-flex items-center gap-2 text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-5 bg-secondary/5 border border-secondary/15 px-5 py-2 rounded-full">
              <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                calendar_month
              </span>
              Aparta tu visita
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-primary leading-tight mb-4">
              Déjanos tus datos y te esperamos en el stand
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Cuéntanos qué negocio tienes (o quieres montar) y un asesor te
              recibe en {FAIR.venue} con la cotización lista. Si prefieres,
              resolvemos todo por WhatsApp.
            </p>
            <ul className="space-y-3">
              {[
                "Asesoría experta, sin compromiso",
                "Cotización con precios reales del catálogo",
                "Garantía Fuller y servicio técnico propio",
              ].map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="material-symbols-outlined text-accent" style={{ fontSize: "20px" }}>
                    check_circle
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-gray-100 bg-gray-50/60 p-6 md:p-8 shadow-sm">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
