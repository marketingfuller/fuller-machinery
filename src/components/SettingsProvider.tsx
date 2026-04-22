"use client";

import { createContext, useContext, useMemo } from "react";
import type { SiteSettings } from "@/lib/whatsapp";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const Ctx = createContext<SiteSettings | null>(null);

export function SettingsProvider({
  value,
  children,
}: {
  value: SiteSettings;
  children: React.ReactNode;
}) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSettings(): SiteSettings {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSettings must be used inside <SettingsProvider>");
  return v;
}

export function useWhatsApp(
  kind: "commercial" | "support" = "commercial",
  message?: string,
) {
  const s = useSettings();
  return useMemo(() => {
    const phone =
      kind === "support" ? s.whatsappSupport : s.whatsappCommercial;
    return {
      phone,
      url: buildWhatsAppUrl(phone, message),
    };
  }, [kind, message, s.whatsappSupport, s.whatsappCommercial]);
}
