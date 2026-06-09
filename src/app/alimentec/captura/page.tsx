import type { Metadata } from "next";
import QuickCapture from "@/components/alimentec/QuickCapture";

// Herramienta interna para asesores (no indexar).
export const metadata: Metadata = {
  title: "Captura rápida — Alimentec | Fuller Machinery",
  robots: { index: false, follow: false },
};

export default function CapturaPage() {
  return <QuickCapture />;
}
