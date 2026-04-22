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

  const updates: Record<string, string | boolean | null> = {
    hero_left_enabled: formData.get("hero_left_enabled") === "on",
    hero_left_eyebrow: (formData.get("hero_left_eyebrow") as string) || null,
    hero_left_title: (formData.get("hero_left_title") as string) || null,
    hero_left_title_accent:
      (formData.get("hero_left_title_accent") as string) || null,
    hero_left_subtitle: (formData.get("hero_left_subtitle") as string) || null,
    hero_left_button_text:
      (formData.get("hero_left_button_text") as string) || null,
    hero_left_button_url:
      (formData.get("hero_left_button_url") as string) || null,
    hero_right_enabled: formData.get("hero_right_enabled") === "on",
    hero_right_eyebrow: (formData.get("hero_right_eyebrow") as string) || null,
    hero_right_title: (formData.get("hero_right_title") as string) || null,
    hero_right_title_accent:
      (formData.get("hero_right_title_accent") as string) || null,
    hero_right_subtitle:
      (formData.get("hero_right_subtitle") as string) || null,
    hero_right_button_text:
      (formData.get("hero_right_button_text") as string) || null,
    hero_right_button_url:
      (formData.get("hero_right_button_url") as string) || null,
  };

  async function uploadImage(
    file: File,
    side: "left" | "right",
  ): Promise<string | { error: string }> {
    if (!file.type.startsWith("image/")) return { error: "Archivo no es una imagen." };
    if (file.size > 5 * 1024 * 1024) return { error: "Máximo 5 MB por imagen." };
    const ext = file.name.split(".").pop()?.toLowerCase() || "webp";
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
