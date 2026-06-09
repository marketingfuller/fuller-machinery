// ────────────────────────────────────────────────────────────
// Campaña Alimentec 2026 — datos confirmados + copy honesto.
//
// REGLA DURA (memoria feedback-honest-data + docs/cro-product-pages.md):
// nada de datos fabricados (reseñas, "X cotizaron", "IVA incluido", urgencia).
// Si un dato no está confirmado → se deja apagado o marcado como placeholder,
// jamás inventado. Diferenciador Fuller = inventario / variedad / stock
// (NUNCA "fabricación" ni "vs China").
//
// Fuente de los datos de feria: confirmados por Felipe (2026-06).
// ────────────────────────────────────────────────────────────

/** Datos de la feria — CONFIRMADOS. */
export const FAIR = {
  name: "Alimentec 2026",
  edition: "Feria Internacional de Alimentos y Servicios",
  pavilion: "Pabellón 4",
  stand: "Stand 415A",
  venue: "Corferias",
  city: "Bogotá",
  // Fechas reales del evento (ISO para JSON-LD Event).
  startDate: "2026-06-09",
  endDate: "2026-06-12",
  // Texto humano para mostrar en el hero.
  datesLabel: "9 – 12 de junio",
  // Corferias — recinto ferial público, dirección verificable.
  address: "Carrera 37 #24-67, Bogotá",
  mapsUrl: "https://maps.google.com/?q=Corferias+Bogotá+Carrera+37+24-67",
} as const;

/**
 * ¿La feria está vigente hoy? (para el banner "estamos en la feria" de la home).
 * Honesto: solo decimos "estamos en la feria" entre startDate y endDate inclusive.
 * Usa la hora de Colombia (UTC-5) para que el corte sea a fin del día 12 local.
 */
export function isFairWindowOpen(now: Date = new Date()): boolean {
  const start = new Date(`${FAIR.startDate}T00:00:00-05:00`).getTime();
  const end = new Date(`${FAIR.endDate}T23:59:59-05:00`).getTime();
  const t = now.getTime();
  return t >= start && t <= end;
}

/** "Lo que vas a ver en el stand" — 3 experiencias reales del stand. */
export const STAND_FEATURES = [
  {
    icon: "calculate",
    title: "Calculadora de rentabilidad",
    desc: "Te sentamos 5 minutos y calculamos, con tus números, cuánto puedes ganar y en cuántos meses recuperas la inversión. Sin promesas infladas.",
  },
  {
    icon: "forum",
    title: "Asistente por WhatsApp 24/7",
    desc: "Te conectamos con nuestro asistente para que consultes precios, fichas y disponibilidad cuando quieras — la feria sigue contigo después del stand.",
  },
  {
    icon: "precision_manufacturing",
    title: "Demos en vivo",
    desc: "Vemos las máquinas funcionando durante el día en el stand. Pregunta por el equipo que te interesa y te lo mostramos operando.",
  },
] as const;

/**
 * "El origen de tu negocio está aquí" — diferenciador = inventario/stock/variedad.
 * Solo datos verificables. El conteo de equipos del catálogo se inyecta en runtime
 * (getAllProducts().length) para no hardcodear un número que pueda quedar desfasado.
 *
 * ⚠️ "máquinas en bodega / stock físico": el playbook menciona "339+ en bodega" pero
 * ese número NO está confirmado en el repo → NO se publica como dato duro. Usamos el
 * conteo real del catálogo ("250+ equipos") que sí podemos respaldar. Si Fuller confirma
 * el inventario físico, se activa STOCK_COUNT abajo.
 */
export const STOCK_COUNT: number | null = null; // ⛔ placeholder — pendiente de confirmar inventario físico con Fuller.

export const WHY_FULLER = [
  {
    icon: "inventory_2",
    title: "Variedad y stock real",
    // {count} se reemplaza con el conteo verificable del catálogo.
    desc: "Más de {count} equipos en catálogo para panadería, bebidas, snacks, cárnicos, refrigeración y empaque. Encuentras la máquina para tu negocio sin esperar importaciones.",
  },
  {
    icon: "engineering",
    title: "Servicio técnico propio",
    desc: "Equipo técnico propio en Bogotá. No dependes de un tercero cuando tu máquina necesita mantenimiento o repuestos.",
  },
  {
    icon: "verified_user",
    title: "Garantía formal",
    desc: "Garantía de 6 meses a 1 año según el equipo, respaldada por factura. Repuestos originales Fuller.",
  },
  {
    icon: "sell",
    title: "Descuentos por volumen",
    desc: "Si montas un negocio completo o varios puntos, armamos el paquete con mejor precio combinado.",
  },
  {
    icon: "school",
    title: "Capacitación incluida",
    desc: "Te enseñamos a sacarle el máximo a tu equipo: capacitación presencial en Bogotá o remota.",
  },
] as const;

/** Tipos de negocio para el select del formulario (alineados con /negocios). */
export const BUSINESS_TYPES = [
  "Panadería / Repostería",
  "Bebidas / Café / Granizados",
  "Snacks / Comida rápida",
  "Cárnicos / Carnicería",
  "Refrigeración / Exhibición",
  "Empaque / Sellado",
  "Restaurante / Buffet",
  "Otro / Aún no decido",
] as const;

/** Mensaje de WhatsApp prellenado por defecto para los CTA de la campaña. */
export const WHATSAPP_DEFAULT_MESSAGE =
  "Hola Fuller, los vi en Alimentec 2026 (Pabellón 4, Stand 415A). Me gustaría recibir una cotización.";

/**
 * Galería de clientes reales — APAGADA.
 * Solo se activa con logos/fotos de clientes que hayan dado permiso explícito.
 * No se fabrica prueba social (memoria feedback-honest-data).
 */
export const CLIENT_LOGOS: { name: string; logo: string }[] = []; // ⛔ vacío a propósito → la sección no se renderiza.
