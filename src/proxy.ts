import { NextResponse, type NextRequest } from "next/server";
import { updateSupabaseSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  // Refresca la sesión de Supabase en cada request que pasa por el proxy.
  const { response, user, supabase } = await updateSupabaseSession(request);

  const pathname = request.nextUrl.pathname;
  const isAdminArea = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  if (isAdminArea && !isLoginPage) {
    // Sin sesión → login.
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
    // Con sesión: exigimos que esté en la whitelist de admins.
    // La policy RLS permite que cada usuario lea su propio row — si no está, no hay fila.
    const { data: adminRow } = await supabase
      .from("admins")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();
    if (!adminRow) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("error", "not-admin");
      return NextResponse.redirect(url);
    }
  }

  // Si ya tiene sesión y está en login, lo mandamos al panel — excepto si vino
  // con un error de whitelist, para que vea el mensaje y pueda cerrar sesión.
  if (isLoginPage && user && !request.nextUrl.searchParams.has("error")) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
