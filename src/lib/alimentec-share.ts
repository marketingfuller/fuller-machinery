// Codifica/decodifica el estado de "Arma tu negocio" en un parámetro de URL (?cfg=)
// para el QR: el visitante escanea y abre en su celular la MISMA configuración
// (negocio, kit, productos, costos). Compacto y URL-safe (base64url).

export type ShareCfg = {
  b: string; // bizKey
  inc: string[]; // slugs del kit incluidos (base + extras marcados)
  add: string[]; // slugs agregados desde el buscador
  ln: (string | number)[][]; // por línea: [key, precio, unidades/día, costo insumo, activa(1/0)]
  d: number; // días/mes
  f: number; // costos fijos/mes
  disc?: number; // % de descuento opcional sobre la inversión
  a?: string; // nombre del asesor (para mostrar contacto en el celular)
  w?: string; // WhatsApp del asesor
};

export function encodeCfg(cfg: ShareCfg): string {
  const json = JSON.stringify(cfg);
  const b64 = btoa(unescape(encodeURIComponent(json)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeCfg(raw: string): ShareCfg | null {
  try {
    const b64 = raw.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(escape(atob(b64)));
    const o = JSON.parse(json) as ShareCfg;
    if (!o || typeof o.b !== "string" || !Array.isArray(o.ln)) return null;
    return o;
  } catch {
    return null;
  }
}
