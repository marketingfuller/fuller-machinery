const ADDRESS_QUERY = "Fuller+Machinery+Calle+63B+79-35+Bogota";
const MAP_EMBED = `https://www.google.com/maps?q=${ADDRESS_QUERY}&output=embed`;

const phones = [
  { label: "Ventas", number: "+57 310 285 2053", href: "tel:+573102852053" },
  { label: "Comercial", number: "+57 324 424 7198", href: "tel:+573244247198" },
  { label: "Servicio técnico", number: "+57 322 853 4925", href: "tel:+573228534925" },
];

export default function NosotrosMapa() {
  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 h-[360px] md:h-[460px] bg-slate-200 relative">
            <iframe
              src={MAP_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Fuller Machinery — Sede principal Bogotá"
            />
          </div>

          <div className="w-full md:w-1/3 p-10 bg-bg-dark text-white flex flex-col justify-center">
            <h3 className="font-display font-bold text-2xl mb-2">Visítanos</h3>
            <p className="text-white/45 text-xs uppercase tracking-widest mb-6 pb-4 border-b border-white/10">
              Sede principal
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-accent text-2xl mt-0.5 shrink-0">
                  location_on
                </span>
                <div>
                  <h4 className="font-bold text-accent text-sm mb-1">
                    Dirección
                  </h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Calle 63B #79-35
                    <br />
                    Bogotá, Colombia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-accent text-2xl mt-0.5 shrink-0">
                  call
                </span>
                <div className="min-w-0">
                  <h4 className="font-bold text-accent text-sm mb-1">
                    Líneas
                  </h4>
                  <ul className="space-y-1">
                    {phones.map((p) => (
                      <li key={p.number} className="text-white/60 text-sm">
                        <a
                          href={p.href}
                          className="hover:text-accent transition-colors"
                        >
                          {p.number}
                        </a>{" "}
                        <span className="text-white/35 text-xs">· {p.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-accent text-2xl mt-0.5 shrink-0">
                  schedule
                </span>
                <div>
                  <h4 className="font-bold text-accent text-sm mb-1">
                    Horarios
                  </h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Lun–Vie: 7:30 AM – 1:00 PM
                    <br />
                    Lun–Vie: 2:00 PM – 5:30 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
