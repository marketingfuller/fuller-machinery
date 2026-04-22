import { redirect } from "next/navigation";
import {
  createSupabaseServerClient,
  createSupabaseAdminClient,
} from "@/lib/supabase/server";
import { getSettings } from "@/lib/settings";
import WhatsAppForm from "./WhatsAppForm";
import HeroForm from "./HeroForm";
import SignOutButton from "./SignOutButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  // Verifico whitelist de admins con service_role (bypass de RLS).
  const admin = createSupabaseAdminClient();
  const { data: adminRow } = await admin
    .from("admins")
    .select("user_id, email")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!adminRow) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center bg-white p-8 rounded-2xl shadow-xl">
          <h1 className="font-display font-black text-2xl text-slate-900 mb-2">
            Acceso no autorizado
          </h1>
          <p className="text-slate-600 text-sm mb-6">
            Tu usuario ({user.email}) no está en la lista de admins. Contacta al
            administrador del sitio.
          </p>
          <SignOutButton />
        </div>
      </main>
    );
  }

  const settings = await getSettings();

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display font-black text-3xl text-slate-900">
            Panel de administración
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Sesión: {user.email}
          </p>
        </div>
        <SignOutButton />
      </header>

      <section className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="font-display font-bold text-xl text-slate-900 mb-4">
          Números de WhatsApp
        </h2>
        <WhatsAppForm
          initialCommercial={settings.whatsappCommercial}
          initialSupport={settings.whatsappSupport}
        />
      </section>

      <section className="bg-white rounded-2xl shadow p-6">
        <h2 className="font-display font-bold text-xl text-slate-900 mb-1">
          Hero de la página de inicio
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          El hero tiene dos lados. Puedes ocultar uno desmarcando &ldquo;Mostrar&rdquo;.
        </p>
        <HeroForm settings={settings} />
      </section>
    </main>
  );
}
