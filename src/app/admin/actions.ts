"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import {
  createSupabaseServerClient,
  createSupabaseAdminClient,
} from "@/lib/supabase/server";
import { SETTINGS_TAG } from "@/lib/settings";

async function assertAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const admin = createSupabaseAdminClient();
  const { data: adminRow } = await admin
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!adminRow) redirect("/admin/login?error=not-admin");
  return { user, admin };
}

// Normaliza a "57XXXXXXXXXX" (E.164 sin el +). Acepta "+57 322 853 4925", "3228534925", etc.
function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return null;
  if (digits.startsWith("57") && digits.length === 12) return digits;
  if (digits.length === 10) return `57${digits}`;
  return null;
}

// Solo permite http/https/mailto/tel — bloquea javascript: y data: URIs.
function safeButtonUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    const u = new URL(trimmed);
    if (!["http:", "https:", "mailto:", "tel:"].includes(u.protocol)) return null;
    return u.toString();
  } catch {
    return null;
  }
}

const MAX_TEXT = 500;
function clampText(raw: FormDataEntryValue | null): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  return trimmed.length > MAX_TEXT ? trimmed.slice(0, MAX_TEXT) : trimmed;
}

// MIME + extension allowlist. SVG se excluye explícitamente (puede contener <script>).
const ALLOWED_IMAGE_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);
const ALLOWED_IMAGE_EXT = new Set(["jpg", "jpeg", "png", "webp", "avif"]);

export type FormState = { ok: boolean; message?: string };

export async function saveWhatsApp(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await assertAdmin();
  const commercialRaw = String(formData.get("commercial") ?? "");
  const supportRaw = String(formData.get("support") ?? "");
  const commercial = normalizePhone(commercialRaw);
  const support = normalizePhone(supportRaw);
  if (!commercial || !support) {
    return {
      ok: false,
      message:
        "Formato inválido. Usa un número colombiano de 10 dígitos (ej: 322 853 4925).",
    };
  }

  const admin = createSupabaseAdminClient();
  const { error } = await admin
    .from("site_settings")
    .update({
      whatsapp_commercial: commercial,
      whatsapp_support: support,
    })
    .eq("id", "main");
  if (error) return { ok: false, message: error.message };

  revalidateTag(SETTINGS_TAG, "max");
  return { ok: true, message: "Números actualizados." };
}

export async function saveHero(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await assertAdmin();
  const admin = createSupabaseAdminClient();

  const leftImage = formData.get("hero_left_image") as File | null;
  const rightImage = formData.get("hero_right_image") as File | null;

  const leftBtnUrlRaw = clampText(formData.get("hero_left_button_url"));
  const rightBtnUrlRaw = clampText(formData.get("hero_right_button_url"));
  const leftBtnUrl = leftBtnUrlRaw ? safeButtonUrl(leftBtnUrlRaw) : null;
  const rightBtnUrl = rightBtnUrlRaw ? safeButtonUrl(rightBtnUrlRaw) : null;
  if (leftBtnUrlRaw && !leftBtnUrl) {
    return {
      ok: false,
      message: "URL del botón izquierdo inválida. Debe empezar con http://, https://, mailto: o tel:.",
    };
  }
  if (rightBtnUrlRaw && !rightBtnUrl) {
    return {
      ok: false,
      message: "URL del botón derecho inválida. Debe empezar con http://, https://, mailto: o tel:.",
    };
  }

  const updates: Record<string, string | boolean | null> = {
    hero_left_enabled: formData.get("hero_left_enabled") === "on",
    hero_left_eyebrow: clampText(formData.get("hero_left_eyebrow")),
    hero_left_title: clampText(formData.get("hero_left_title")),
    hero_left_title_accent: clampText(formData.get("hero_left_title_accent")),
    hero_left_subtitle: clampText(formData.get("hero_left_subtitle")),
    hero_left_button_text: clampText(formData.get("hero_left_button_text")),
    hero_left_button_url: leftBtnUrl,
    hero_right_enabled: formData.get("hero_right_enabled") === "on",
    hero_right_eyebrow: clampText(formData.get("hero_right_eyebrow")),
    hero_right_title: clampText(formData.get("hero_right_title")),
    hero_right_title_accent: clampText(formData.get("hero_right_title_accent")),
    hero_right_subtitle: clampText(formData.get("hero_right_subtitle")),
    hero_right_button_text: clampText(formData.get("hero_right_button_text")),
    hero_right_button_url: rightBtnUrl,
  };

  async function uploadImage(
    file: File,
    side: "left" | "right",
  ): Promise<string | { error: string }> {
    if (!ALLOWED_IMAGE_MIME.has(file.type)) {
      return { error: "Tipo no permitido. Solo jpg, png, webp o avif." };
    }
    if (file.size > 5 * 1024 * 1024) return { error: "Máximo 5 MB por imagen." };
    const rawExt = file.name.split(".").pop()?.toLowerCase() || "";
    const ext = ALLOWED_IMAGE_EXT.has(rawExt) ? rawExt : "webp";
    const path = `hero-${side}-${Date.now()}.${ext}`;
    const { error: upErr } = await admin.storage
      .from("hero-images")
      .upload(path, file, { contentType: file.type, upsert: false });
    if (upErr) return { error: upErr.message };
    const { data: pub } = admin.storage.from("hero-images").getPublicUrl(path);
    return pub.publicUrl;
  }

  if (leftImage && leftImage.size > 0) {
    const res = await uploadImage(leftImage, "left");
    if (typeof res === "object") return { ok: false, message: res.error };
    updates.hero_left_image_url = res;
  }
  if (rightImage && rightImage.size > 0) {
    const res = await uploadImage(rightImage, "right");
    if (typeof res === "object") return { ok: false, message: res.error };
    updates.hero_right_image_url = res;
  }

  const { error } = await admin
    .from("site_settings")
    .update(updates)
    .eq("id", "main");
  if (error) return { ok: false, message: error.message };

  revalidateTag(SETTINGS_TAG, "max");
  return { ok: true, message: "Hero actualizado." };
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
