"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, ChevronDown, Cake, Coffee, Popcorn, Beef, Snowflake, Package, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import SearchBox from "@/components/SearchBox";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Negocios", href: "/negocios", hasMega: true },
  { label: "Emprende", href: "/emprende" },
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
  const [searchOpen, setSearchOpen] = useState(false);
  const megaTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Atajos: ⌘K / Ctrl+K abre el buscador; Escape lo cierra.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Bloquea el scroll del fondo cuando el overlay está abierto.
  useEffect(() => {
    document.body.style.overflow = searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  const handleMegaEnter = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 200);
  };

  return (
    <>
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
            width={154}
            height={60}
            className="h-14 w-auto object-contain"
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
                    <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-3">
                      <Link
                        href="/productos"
                        className="flex items-center justify-center gap-2 text-sm font-semibold text-white bg-white/5 hover:bg-white/10 rounded-xl py-2.5 transition-colors"
                      >
                        Ver todo el catálogo
                      </Link>
                      <Link
                        href="/colecciones"
                        className="flex items-center justify-center gap-2 text-sm font-semibold text-accent bg-accent/10 hover:bg-accent/20 rounded-xl py-2.5 transition-colors"
                      >
                        Explorar por tipo
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Buscar productos"
            className="text-white/80 hover:text-accent p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Search size={20} />
          </button>
          <Link
            href="/productos"
            data-zocam-event="catalogo-header"
            className="hidden sm:flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-secondary/30"
          >
            <ShoppingBag size={16} />
            Catálogo
          </Link>
          
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
              <Link
                href="/colecciones"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 text-accent bg-accent/10 hover:bg-accent/20 font-semibold text-sm px-5 py-2.5 rounded-full mt-4 transition-colors"
              >
                Explorar por tipo
              </Link>
              <Link
                href="/productos"
                onClick={() => setMobileOpen(false)}
                data-zocam-event="catalogo-header-movil"
                className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-semibold text-sm px-5 py-3 rounded-full mt-2 transition-colors"
              >
                <ShoppingBag size={16} />
                Ver catálogo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>

    {/* Overlay de búsqueda (⌘K) */}
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[200] flex items-start justify-center"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          />
          <motion.div
            initial={{ y: -16, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -16, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-2xl mx-4 mt-[12vh]"
          >
            <SearchBox
              variant="page"
              autoFocus
              onClose={() => setSearchOpen(false)}
              placeholder="Buscar: granizadora, freidora a gas, báscula…"
            />
            <p className="mt-3 text-center text-xs text-white/50">
              Escribe para buscar entre 250+ equipos · Esc para cerrar
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
