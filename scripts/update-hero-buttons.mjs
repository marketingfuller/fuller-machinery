// Actualiza los button_url del hero en Supabase site_settings (id="main").
//   node --env-file=.env.local scripts/update-hero-buttons.mjs           (lee)
//   node --env-file=.env.local scripts/update-hero-buttons.mjs --write    (aplica)
import { createClient } from "@supabase/supabase-js";

const WRITE = process.argv.includes("--write");
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY,
);

const LEFT = "/colecciones"; // emprender → explorar por tipo
const RIGHT = "/productos"; // línea industrial → catálogo

const { data, error } = await supabase
  .from("site_settings")
  .select("id, hero_left_button_text, hero_left_button_url, hero_right_button_text, hero_right_button_url")
  .eq("id", "main")
  .maybeSingle();

if (error) {
  console.error("Error leyendo site_settings:", error.message);
  process.exit(1);
}
if (!data) {
  console.error('No existe la fila site_settings id="main". (El sitio usa el FALLBACK de settings.ts, ya actualizado.)');
  process.exit(0);
}

console.log("ACTUAL en Supabase:");
console.log(`  hero_left  "${data.hero_left_button_text}"  → ${data.hero_left_button_url}`);
console.log(`  hero_right "${data.hero_right_button_text}" → ${data.hero_right_button_url}`);

if (!WRITE) {
  console.log(`\nDRY-RUN. Con --write quedaría:\n  hero_left  → ${LEFT}\n  hero_right → ${RIGHT}`);
  process.exit(0);
}

const { error: upErr } = await supabase
  .from("site_settings")
  .update({ hero_left_button_url: LEFT, hero_right_button_url: RIGHT })
  .eq("id", "main");

if (upErr) {
  console.error("Error actualizando:", upErr.message);
  process.exit(1);
}
console.log(`\n✓ APLICADO: hero_left → ${LEFT} | hero_right → ${RIGHT}`);
