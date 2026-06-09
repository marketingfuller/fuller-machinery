// Generador de la propuesta/oferta en PDF para "Arma tu negocio".
// Descarga DIRECTA con jsPDF (doc.save). Sin número de WhatsApp: la usan varios
// asesores en vivo en la feria. Solo cliente (usa window/jsPDF).

import { formatCOP } from "@/lib/products";
import { formatPayback, type BusinessResult } from "@/lib/roi";

export type OfferLine = {
  label: string;
  unitLabel: string;
  salePrice: number;
  insumoCost: number;
  unitsDay: number;
  monthlyGross: number;
};

export type OfferData = {
  businessLabel: string;
  machines: { name: string; price: number }[];
  investment: number; // subtotal (suma de máquinas)
  discountPct?: number; // descuento opcional
  daysMonth: number;
  fixedMonthly: number;
  lines: OfferLine[];
  result: BusinessResult;
  fair: { name: string; pavilion: string; stand: string; venue: string; datesLabel: string };
  advisor?: { name: string; whatsapp: string };
};

// Paleta Fuller (RGB).
const GREEN: [number, number, number] = [3, 143, 6];
const DARK: [number, number, number] = [1, 61, 2];
const ACCENT: [number, number, number] = [38, 101, 4];
const GRAY: [number, number, number] = [120, 120, 120];
const LIGHT: [number, number, number] = [232, 245, 232];
const SECONDARY: [number, number, number] = [211, 47, 47];

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

export async function openOfferPdf(d: OfferData): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  const M = 15; // margen
  const W = 210; // ancho A4
  const right = W - M;
  let y = M;

  const date = new Date().toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" });

  // ── Encabezado ──
  const logo = await loadImage(`${window.location.origin}/images/logo-fuller.png`);
  if (logo) {
    const h = 13;
    const w = (logo.width / logo.height) * h || 36;
    try {
      doc.addImage(logo, "PNG", M, y, w, h);
    } catch {
      /* si falla, seguimos sin logo */
    }
  } else {
    doc.setFont("helvetica", "bold").setFontSize(16).setTextColor(...GREEN);
    doc.text("FULLER MACHINERY", M, y + 8);
  }
  doc.setFont("helvetica", "normal").setFontSize(9).setTextColor(...GRAY);
  doc.text("Propuesta de negocio", right, y + 4, { align: "right" });
  doc.text(date, right, y + 9, { align: "right" });
  doc.setFontSize(8).setTextColor(...ACCENT);
  doc.text(`${d.fair.name} · ${d.fair.pavilion} · ${d.fair.stand}`, right, y + 14, { align: "right" });
  y += 20;
  doc.setDrawColor(...GREEN).setLineWidth(0.8).line(M, y, right, y);
  y += 8;

  // ── Título ──
  doc.setFont("helvetica", "bold").setFontSize(18).setTextColor(...DARK);
  doc.text(`Tu negocio: ${d.businessLabel}`, M, y);
  y += 6;
  doc.setFont("helvetica", "normal").setFontSize(9.5).setTextColor(...GRAY);
  doc.text("Propuesta de equipos y proyección de rentabilidad — Fuller Machinery.", M, y);
  y += 8;

  const sectionTitle = (txt: string) => {
    doc.setFont("helvetica", "bold").setFontSize(11).setTextColor(...GREEN);
    doc.text(txt.toUpperCase(), M, y);
    y += 2;
    doc.setDrawColor(220, 220, 220).setLineWidth(0.3).line(M, y, right, y);
    y += 5;
  };

  const checkPage = (need: number) => {
    if (y + need > 280) {
      doc.addPage();
      y = M;
    }
  };

  // ── Kit de máquinas ──
  sectionTitle("Kit de máquinas");
  doc.setFontSize(9.5);
  for (const m of d.machines) {
    checkPage(7);
    doc.setFont("helvetica", "normal").setTextColor(40, 40, 40);
    const name = doc.splitTextToSize(m.name, 130) as string[];
    doc.text(name, M, y);
    doc.text(formatCOP(m.price), right, y, { align: "right" });
    y += Math.max(5, name.length * 4.5);
    doc.setDrawColor(238, 238, 238).setLineWidth(0.2).line(M, y - 1.5, right, y - 1.5);
  }
  const pct = d.discountPct ?? 0;
  if (pct > 0) {
    checkPage(16);
    doc.setFont("helvetica", "normal").setTextColor(100, 100, 100).setFontSize(10);
    doc.text("Subtotal", M, y + 1);
    doc.text(formatCOP(d.investment), right, y + 1, { align: "right" });
    y += 5.5;
    doc.setTextColor(...SECONDARY);
    doc.text(`Descuento (${pct}%)`, M, y + 1);
    doc.text(`- ${formatCOP(Math.round(d.investment * (pct / 100)))}`, right, y + 1, { align: "right" });
    y += 6;
    doc.setFont("helvetica", "bold").setTextColor(...DARK).setFontSize(11);
    doc.text("Inversión total del kit", M, y + 1);
    doc.text(formatCOP(Math.round(d.investment * (1 - pct / 100))), right, y + 1, { align: "right" });
    y += 9;
  } else {
    checkPage(8);
    doc.setFont("helvetica", "bold").setTextColor(...DARK).setFontSize(11);
    doc.text("Inversión total del kit", M, y + 1);
    doc.text(formatCOP(d.investment), right, y + 1, { align: "right" });
    y += 9;
  }

  // ── Qué vas a vender ──
  checkPage(20);
  sectionTitle("Qué vas a vender");
  doc.setFont("helvetica", "bold").setFontSize(8).setTextColor(...GRAY);
  doc.text("PRODUCTO", M, y);
  doc.text("PRECIO", M + 95, y, { align: "right" });
  doc.text("VOLUMEN", M + 130, y, { align: "right" });
  doc.text("UTILIDAD/MES", right, y, { align: "right" });
  y += 4;
  doc.setFont("helvetica", "normal").setFontSize(9.5).setTextColor(40, 40, 40);
  for (const l of d.lines) {
    checkPage(7);
    doc.text(l.label, M, y);
    doc.text(formatCOP(l.salePrice), M + 95, y, { align: "right" });
    doc.text(`${l.unitsDay} ${l.unitLabel}s/día`, M + 130, y, { align: "right" });
    doc.text(formatCOP(l.monthlyGross), right, y, { align: "right" });
    y += 5;
    doc.setDrawColor(238, 238, 238).setLineWidth(0.2).line(M, y - 1.5, right, y - 1.5);
  }
  y += 2;
  doc.setFontSize(8.5).setTextColor(...GRAY);
  doc.text(
    `Base: ${d.daysMonth} días de venta/mes · Costos fijos: ${formatCOP(d.fixedMonthly)}/mes (arriendo, servicios).`,
    M, y,
  );
  y += 8;

  // ── KPIs ──
  checkPage(26);
  const boxW = (right - M - 6) / 2;
  // Utilidad neta (caja verde)
  doc.setFillColor(...LIGHT).roundedRect(M, y, boxW, 22, 2, 2, "F");
  doc.setFont("helvetica", "normal").setFontSize(8).setTextColor(...GRAY);
  doc.text("UTILIDAD NETA ESTIMADA / MES", M + 4, y + 6);
  doc.setFont("helvetica", "bold").setFontSize(16).setTextColor(...ACCENT);
  doc.text(formatCOP(d.result.monthlyProfit), M + 4, y + 15);
  // Payback (caja borde)
  const bx = M + boxW + 6;
  doc.setDrawColor(220, 220, 220).setLineWidth(0.3).roundedRect(bx, y, boxW, 22, 2, 2, "S");
  doc.setFont("helvetica", "normal").setFontSize(8).setTextColor(...GRAY);
  doc.text("RECUPERAS LA INVERSIÓN EN", bx + 4, y + 6);
  doc.setFont("helvetica", "bold").setFontSize(16).setTextColor(...DARK);
  doc.text(formatPayback(d.result.payback), bx + 4, y + 15);
  y += 30;

  // ── Escenarios ──
  checkPage(20);
  sectionTitle("Escenarios según volumen");
  doc.setFont("helvetica", "bold").setFontSize(8).setTextColor(...GRAY);
  doc.text("ESCENARIO", M, y);
  doc.text("UTILIDAD/MES", M + 95, y, { align: "right" });
  doc.text("PAYBACK", right, y, { align: "right" });
  y += 4;
  doc.setFont("helvetica", "normal").setFontSize(9.5).setTextColor(40, 40, 40);
  for (const s of d.result.scenarios) {
    checkPage(7);
    doc.text(s.name, M, y);
    doc.text(formatCOP(s.profit), M + 95, y, { align: "right" });
    doc.text(formatPayback(s.payback), right, y, { align: "right" });
    y += 5;
    doc.setDrawColor(238, 238, 238).setLineWidth(0.2).line(M, y - 1.5, right, y - 1.5);
  }
  y += 4;

  // ── Disclaimer ──
  checkPage(24);
  doc.setDrawColor(220, 220, 220).setLineWidth(0.3).line(M, y, right, y);
  y += 4;
  doc.setFont("helvetica", "italic").setFontSize(7.5).setTextColor(...GRAY);
  const disc = doc.splitTextToSize(
    "* Utilidad neta estimada con supuestos del asesor: ingresos de todas las líneas menos insumos (precios de referencia de supermercado, editables) menos costos fijos. No es una promesa de rentabilidad: si el retorno son 14 meses, decimos 14. La inversión usa precios reales del catálogo Fuller; los resultados dependen de ubicación, demanda y temporada. Precios sujetos a confirmación.",
    right - M,
  ) as string[];
  doc.text(disc, M, y);
  y += disc.length * 3.4 + 4;

  // ── Footer ──
  checkPage(16);
  const hasAdvisor = !!d.advisor?.name || !!d.advisor?.whatsapp;
  const footH = hasAdvisor ? 16 : 12;
  doc.setFillColor(...DARK).roundedRect(M, y, right - M, footH, 2, 2, "F");
  doc.setFont("helvetica", "bold").setFontSize(9).setTextColor(255, 255, 255);
  doc.text("Fuller Machinery", M + 4, y + 6);
  doc.setFont("helvetica", "normal").setFontSize(8).setTextColor(200, 230, 200);
  doc.text("fullermachinery.com", right - 4, y + 6, { align: "right" });
  if (hasAdvisor) {
    const adv = d.advisor as { name: string; whatsapp: string };
    const left = adv.name ? `Tu asesor: ${adv.name}` : "Tu asesor";
    const wa = adv.whatsapp ? `WhatsApp +${adv.whatsapp}` : `Pregunta en ${d.fair.stand}`;
    doc.setTextColor(255, 255, 255);
    doc.text(left, M + 4, y + 12);
    doc.setTextColor(200, 230, 200);
    doc.text(wa, right - 4, y + 12, { align: "right" });
  } else {
    doc.text(`Pregunta por tu asesor en ${d.fair.venue} (${d.fair.stand})`, M + 4, y + 11);
  }

  const safe = d.businessLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  doc.save(`propuesta-${safe || "negocio"}-fuller.pdf`);
}
