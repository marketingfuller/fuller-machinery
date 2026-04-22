import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { SiteSettings } from "@/lib/whatsapp";

export type { SiteSettings, HeroSide } from "@/lib/whatsapp";
export { buildWhatsAppUrl, rewriteWhatsAppNumber } from "@/lib/whatsapp";

// Fallback usado si Supabase no está disponible al renderizar (por ej. durante el build).
// Replica los valores actuales del sitio antes del CMS.
const FALLBACK: SiteSettings = {
  whatsappCommercial: "573244247198",
  whatsappSupport: "573228534925",
  heroLeft: {
    enabled: true,
    imageUrl: "/images/Hero-iniciatupropionegocio.webp",
    eyebrow: "Alta Rentabilidad",
    title: "Inicia tu propio",
    titleAccent: "Negocio Viral",
    subtitle:
      "Equipos de tendencia para waffles, helados y bebidas que garantizan filas de clientes.",
    buttonText: "VER EQUIPOS PARA EMPRENDER",
    buttonUrl:
      "https://tienda.fullermachinery.com/index.php/categoria-producto/comida-divertida/page/3/",
  },
  heroRight: {
    enabled: true,
    imageUrl: "/images/Hero-potencia.webp",
    eyebrow: "Línea Industrial",
    title: "Potencia y",
    titleAccent: "Estandarización",
    subtitle:
      "Soluciones de empaque al vacío y procesamiento para maximizar la eficiencia de tu planta.",
    buttonText: "VER LÍNEA INDUSTRIAL",
    buttonUrl:
      "https://tienda.fullermachinery.com/index.php/categoria-producto/preparacion-de-alimentos/equipos-industriales-preparacion-de-alimentos/",
  },
};

type Row = {
  whatsapp_commercial: string;
  whatsapp_support: string;
  hero_left_enabled: boolean;
  hero_left_image_url: string | null;
  hero_left_eyebrow: string | null;
  hero_left_title: string | null;
  hero_left_title_accent: string | null;
  hero_left_subtitle: string | null;
  hero_left_button_text: string | null;
  hero_left_button_url: string | null;
  hero_right_enabled: boolean;
  hero_right_image_url: string | null;
  hero_right_eyebrow: string | null;
  hero_right_title: string | null;
  hero_right_title_accent: string | null;
  hero_right_subtitle: string | null;
  hero_right_button_text: string | null;
  hero_right_button_url: string | null;
};

function rowToSettings(row: Row): SiteSettings {
  return {
    whatsappCommercial: row.whatsapp_commercial,
    whatsappSupport: row.whatsapp_support,
    heroLeft: {
      enabled: row.hero_left_enabled,
      imageUrl: row.hero_left_image_url,
      eyebrow: row.hero_left_eyebrow,
      title: row.hero_left_title,
      titleAccent: row.hero_left_title_accent,
      subtitle: row.hero_left_subtitle,
      buttonText: row.hero_left_button_text,
      buttonUrl: row.hero_left_button_url,
    },
    heroRight: {
      enabled: row.hero_right_enabled,
      imageUrl: row.hero_right_image_url,
      eyebrow: row.hero_right_eyebrow,
      title: row.hero_right_title,
      titleAccent: row.hero_right_title_accent,
      subtitle: row.hero_right_subtitle,
      buttonText: row.hero_right_button_text,
      buttonUrl: row.hero_right_button_url,
    },
  };
}

export const SETTINGS_TAG = "site-settings";

// unstable_cache memoiza la lectura entre requests. React.cache dedupe dentro del mismo request.
const fetchFromDb = unstable_cache(
  async (): Promise<SiteSettings> => {
    try {
      const supabase = createSupabaseAdminClient();
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", "main")
        .maybeSingle();
      if (error || !data) return FALLBACK;
      return rowToSettings(data as Row);
    } catch {
      return FALLBACK;
    }
  },
  ["site-settings"],
  { tags: [SETTINGS_TAG], revalidate: 3600 },
);

export const getSettings = cache(async (): Promise<SiteSettings> => {
  return fetchFromDb();
});
