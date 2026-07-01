import "server-only";
import { redirect } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  createSupabaseServerClient,
  createSupabaseAdminClient,
} from "@/lib/supabase/server";

// Helpers compartidos entre las server actions del panel (no es "use server",
// para poder exportar constantes y funciones sync además de async).

/** Verifica sesión + whitelist de admins. Redirige si no autorizado. */
export async function assertAdmin() {
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

// MIME + extensión allowlist. SVG se excluye (puede contener <script>).
export const ALLOWED_IMAGE_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);
export const ALLOWED_IMAGE_EXT = new Set(["jpg", "jpeg", "png", "webp", "avif"]);
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

/** Sube una imagen a un bucket y devuelve su URL pública, o { error }. */
export async function uploadImageToBucket(
  admin: SupabaseClient,
  bucket: string,
  path: string,
  file: File,
): Promise<string | { error: string }> {
  if (!ALLOWED_IMAGE_MIME.has(file.type)) {
    return { error: "Tipo no permitido. Solo jpg, png, webp o avif." };
  }
  if (file.size > MAX_IMAGE_BYTES) return { error: "Máximo 5 MB por imagen." };
  const { error } = await admin.storage
    .from(bucket)
    .upload(path, file, { contentType: file.type, upsert: true });
  if (error) return { error: error.message };
  const { data } = admin.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
