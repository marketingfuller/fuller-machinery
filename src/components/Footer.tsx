"use client";

import { Mail, MapPin, Phone, Clock } from "lucide-react";
import Image from "next/image";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.75 15.5v-7l6.25 3.5-6.25 3.5z" />
    </svg>
  );
}

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.01a8.16 8.16 0 0 0 4.77 1.52V7.07a4.85 4.85 0 0 1-1-.38z" />
    </svg>
  );
}

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/fullermachinery/",
    icon: "instagram",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@fuller_machinery",
    icon: "tiktok",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@fullermachinery118",
    icon: "youtube",
  },
];

const footerLinks = {
  navegacion: [
    { label: "Inicio", href: "/" },
    { label: "Negocios", href: "/negocios" },
    { label: "Emprende", href: "/emprende" },
    { label: "Servicio Técnico", href: "/servicio-tecnico" },
    { label: "Nosotros", href: "/nosotros" },
  ],
};

const sedes = [
  {
    name: "Sede Principal & Showroom",
    address: "Calle 63B #79-35 – Bogotá",
    phones: [
      { label: "Recepción", number: "310 285 2053" },
      { label: "Comercial", number: "324 424 7198" },
      { label: "Técnico", number: "322 853 4925" },
    ],
  },
  {
    name: "Ricaurte #1",
    address: "Calle 12 #27-09 – Bogotá",
    phones: [{ label: "", number: "320 330 5992" }],
  },
  {
    name: "Ricaurte #2",
    address: "Calle 13 #27-11 – Bogotá",
    phones: [{ label: "", number: "310 265 9634" }],
  },
];

export default function Footer() {
  return (
    <footer className="bg-bg-dark border-t border-white/5">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-5">
              <Image
                src="/images/logo-fuller.webp"
                alt="Fuller Machinery"
                width={160}
                height={60}
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="text-white/75 text-sm leading-relaxed mb-6 max-w-xs">
              Equipos y maquinaria para la industria alimentaria. Soluciones integrales para emprendedores y plantas de producción.
            </p>
            <div className="space-y-3">
              <a href="tel:+573102852053" className="flex items-center gap-3 text-white/80 hover:text-accent text-sm transition-colors">
                <Phone size={15} className="shrink-0" />
                (+57) 310 285 2053
              </a>
              <a href="tel:+573244247198" className="flex items-center gap-3 text-white/80 hover:text-accent text-sm transition-colors">
                <Phone size={15} className="shrink-0" />
                (+57) 324 424 7198
              </a>
              <a href="mailto:ventasfullermachinery@gmail.com" className="flex items-center gap-3 text-white/80 hover:text-accent text-sm transition-colors break-all">
                <Mail size={15} className="shrink-0" />
                ventasfullermachinery@gmail.com
              </a>
              <a href="mailto:fullermachinery@gmail.com" className="flex items-center gap-3 text-white/80 hover:text-accent text-sm transition-colors">
                <Mail size={15} className="shrink-0" />
                fullermachinery@gmail.com
              </a>
              <div className="flex items-start gap-3 text-white/80 text-sm">
                <MapPin size={15} className="shrink-0 mt-0.5" />
                Calle 63B #79-35 – Bogotá
              </div>
              <div className="flex items-start gap-3 text-white/60 text-xs">
                <Clock size={14} className="shrink-0 mt-0.5" />
                Lun–Vie: 7:30–13:00 / 14:00–17:30
              </div>
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Navegación
            </h4>
            <ul className="space-y-3">
              {footerLinks.navegacion.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-accent text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sedes */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Nuestras Sedes
            </h4>
            <div className="space-y-5">
              {sedes.map((sede) => (
                <div key={sede.name}>
                  <p className="text-accent text-xs font-semibold uppercase tracking-wider mb-1">{sede.name}</p>
                  <div className="flex items-start gap-2 text-white/60 text-xs mb-1">
                    <MapPin size={11} className="shrink-0 mt-0.5" />
                    {sede.address}
                  </div>
                  {sede.phones.map((p) => (
                    <a
                      key={p.number}
                      href={`tel:+57${p.number.replace(/\s/g, "")}`}
                      className="flex items-center gap-2 text-white/80 hover:text-accent text-xs transition-colors"
                    >
                      <Phone size={11} className="shrink-0" />
                      {p.label && <span className="text-white/40">{p.label}:</span>}
                      {p.number}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Social links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Síguenos
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/10 hover:bg-accent/20 flex items-center justify-center text-white/70 hover:text-accent transition-all duration-200"
                  aria-label={social.label}
                >
                  {social.icon === "instagram" && <InstagramIcon size={22} />}
                  {social.icon === "tiktok" && <TikTokIcon size={22} />}
                  {social.icon === "youtube" && <YoutubeIcon size={22} />}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <p className="text-white/60 text-xs text-center md:text-left">
            © {new Date().getFullYear()} Fuller Machinery.<br className="md:hidden" /> Todos los derechos reservados.
          </p>

          {/* Zcalaris Branding Row - Single Line */}
          <div className="flex items-center gap-2 group">
            <span className="text-[10px] uppercase tracking-widest text-white/60 group-hover:text-white/50 transition-colors duration-300">
              Desarrollada por
            </span>
            <a 
              href="https://www.zcalaris.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-transform duration-300 hover:scale-[1.03] active:scale-95 ml-1"
            >
              <div className="relative w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                <Image 
                  src="/images/zcalaris-icon.webp" 
                  alt="Zcalaris Icon" 
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-display font-black text-sm text-white tracking-widest leading-none mt-0.5 group-hover:text-accent transition-colors duration-300">
                zcalaris
              </span>
            </a>
          </div>

          {/* Payment methods */}
          <div className="flex items-center gap-2 flex-wrap justify-center md:justify-end">
            <span className="text-white/60 text-xs mr-1 hidden sm:inline-block">Pagos:</span>
            {[
              { name: "Visa", src: "/images/visa.webp" },
              { name: "Mastercard", src: "/images/mastercard.webp" },
              { name: "PSE", src: "/images/pse.webp" },
              { name: "Nequi", src: "/images/nequi.webp" },
              { name: "Addi", src: "/images/addi.webp" },
              { name: "Sistecredito", src: "/images/siste credito.webp" },
            ].map((card) => (
              <div key={card.name} className="h-7 w-12 rounded bg-white flex items-center justify-center p-0.5">
                <Image
                  src={card.src}
                  alt={card.name}
                  width={44}
                  height={24}
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}
