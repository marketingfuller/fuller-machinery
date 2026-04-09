export default function NosotrosMapa() {
  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Map — 2/3 */}
          <div className="w-full md:w-2/3 h-[360px] md:h-[420px] bg-slate-200 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.5366472346766!2d-99.17387492497676!3d19.432607981846617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f8cca1b93369%3A0x6d112705574c8614!2sAv.%20Paseo%20de%20la%20Reforma%2C%20Ju%C3%A1rez%2C%20Cuauht%C3%A9moc%2C%2006600%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1sen!2smx!4v1715456123456!5m2!1sen!2smx"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Fuller Machinery"
            />
          </div>

          {/* Info panel — 1/3 */}
          <div className="w-full md:w-1/3 p-10 bg-bg-dark text-white flex flex-col justify-center">
            <h3 className="font-display font-bold text-2xl mb-8 pb-4 border-b border-white/10">
              Visítanos
            </h3>
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
                    Av. Industrial 4500,
                    <br />
                    Parque Tecnológico,
                    <br />
                    Ciudad de México, CP 04500
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-accent text-2xl mt-0.5 shrink-0">
                  call
                </span>
                <div>
                  <h4 className="font-bold text-accent text-sm mb-1">
                    Teléfono
                  </h4>
                  <p className="text-white/60 text-sm">
                    +52 (55) 1234-5678
                    <br />
                    <span className="text-white/35 text-xs">
                      Línea directa ventas
                    </span>
                  </p>
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
                    Lun – Vie: 9:00 AM – 6:00 PM
                    <br />
                    Sáb: 9:00 AM – 2:00 PM
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
