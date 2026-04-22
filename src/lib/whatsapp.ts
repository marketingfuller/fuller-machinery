export type HeroSide = {
  enabled: boolean;
  imageUrl: string | null;
  eyebrow: string | null;
  title: string | null;
  titleAccent: string | null;
  subtitle: string | null;
  buttonText: string | null;
  buttonUrl: string | null;
};

export type SiteSettings = {
  whatsappCommercial: string;
  whatsappSupport: string;
  heroLeft: HeroSide;
  heroRight: HeroSide;
};

export function buildWhatsAppUrl(
  phone: string,
  message = "Hola, me gustaría recibir información sobre sus equipos.",
) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

// Reemplaza cualquier número previo por el actual en un link `https://wa.me/...`.
// Usado en arrays de productos con URLs pre-armadas.
export function rewriteWhatsAppNumber(url: string, phone: string): string {
  return url.replace(/wa\.me\/\d+/, `wa.me/${phone}`);
}
