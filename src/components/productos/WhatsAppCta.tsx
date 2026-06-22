"use client";

import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { useVariant } from "./VariantContext";

// CTA de WhatsApp que, si el producto tiene variantes de color, añade el color
// elegido al mensaje (ej "... (Color: Rosado)"). Si no hay variantes, se
// comporta como un enlace normal a WhatsApp.
export default function WhatsAppCta({
  phone,
  message,
  className,
  children,
}: {
  phone: string;
  message: string;
  className?: string;
  children: React.ReactNode;
}) {
  const v = useVariant();
  const color = v?.colorLabel;
  const finalMessage = color ? `${message} (Color: ${color})` : message;

  return (
    <a
      href={buildWhatsAppUrl(phone, finalMessage)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
