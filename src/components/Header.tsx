"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, ChevronDown, Cake, Coffee, Popcorn, Beef, Snowflake, Package } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Negocios", href: "/negocios", hasMega: true },
  { label: "Emprende", href: "/blog" },
  { label: "Servicio Técnico", href: "/servicio-tecnico" },
  { label: "Nosotros", href: "/nosotros" },
];

const megaMenuItems = [
  { label: "Panadería", icon: Cake, desc: "Hornos, amasadoras y cortadoras", color: "#F59E0B", href: "/negocios/panaderia" },
  { label: "Bebidas", icon: Coffee, desc: "Café, jugos y bubble tea", color: "#4ab84c", href: "/negocios/bebidas" },
  { label: "Snacks", icon: Popcorn, desc: "Waffles, crepes y fast food", color: "#ef5350", href: "/negocios/snacks" },
  { label: "Cárnicos", icon: Beef, desc: "Sierras, molinos y rebanadoras", color: "#d32f2f", href: "/negocios/carnicos" },
  { label: "Refrigeración", icon: Snowflake, desc: "Congeladores y vitrinas", color: "#4ab84c", href: "/negocios/refrigeracion" },
  { label: "Empaque", icon: Package, desc: "Selladoras al vacío", color: "#d32f2f", href: "/negocios/empaque" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const megaTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMegaEnter = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 200);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
        scrolled
          ? "bg-bg-dark/95 backdrop-blur-xl shadow-lg shadow-black/20 py-3"
          : "bg-gradient-to-b from-bg-dark/75 to-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo-fuller.webp"
            alt="Fuller Machinery"
            width={160}
            height={60}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={link.hasMega ? handleMegaEnter : undefined}
              onMouseLeave={link.hasMega ? handleMegaLeave : undefined}
            >
              <Link
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium text-white/80 hover:text-accent transition-colors duration-200 flex items-center gap-1 rounded-lg hover:bg-white/5"
                )}
              >
                {link.label}
                {link.hasMega && (
                  <ChevronDown
                    size={14}
                    className={cn(
                      "transition-transform duration-200",
                      megaOpen && "rotate-180"
                    )}
                  />
                )}
              </Link>

              {/* Mega Menu */}
              {link.hasMega && (
                <div
                  className={cn(
                    "mega-menu-enter absolute top-full left-1/2 -translate-x-1/2 pt-4",
                    megaOpen && "mega-menu-active"
                  )}
                >
                  <div className="bg-bg-dark/98 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/40 w-[520px]">
                    <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-4">
                      Líneas de Negocio
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {megaMenuItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group/item"
                        >
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${item.color}15` }}
                          >
                            <item.icon size={20} style={{ color: item.color }} />
                          </div>
                          <div>
                            <p className="text-white text-sm font-medium group-hover/item:text-accent transition-colors">
                              {item.label}
                            </p>
                            <p className="text-white/40 text-xs">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a
            href="https://tienda.fullermachinery.com/index.php/shop/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-secondary/30"
          >
            <ShoppingBag size={16} />
            Catálogo
          </a>
          
          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-bg-dark/98 backdrop-blur-xl border-t border-white/10"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-white/80 hover:text-accent py-2 text-lg font-medium transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {/* Mobile mega items */}
              <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
                {megaMenuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    <item.icon size={16} style={{ color: item.color }} />
                    <span className="text-white/70 text-sm">{item.label}</span>
                  </Link>
                ))}
              </div>
              <a
                href="https://tienda.fullermachinery.com/index.php/shop/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-semibold text-sm px-5 py-3 rounded-full mt-4 transition-colors"
              >
                <ShoppingBag size={16} />
                Catálogo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
