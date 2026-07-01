import Link from "next/link";
import { redirect } from "next/navigation";
import {
  createSupabaseServerClient,
  createSupabaseAdminClient,
} from "@/lib/supabase/server";
import { getProductsFromDb } from "@/lib/products-db";
import { SEED_PRODUCTS, CATEGORY_META } from "@/lib/products";
import type { ProductCategory } from "@/content/products/types";
import ProductsAdminList from "../ProductsAdminList";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
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

  const db = await getProductsFromDb();
  const imported = db.length > 0;
  const source = imported ? db : SEED_PRODUCTS;

  const items = source
    .map((p) => ({
      slug: p.slug,
      name: p.name,
      category: p.category,
      categoryLabel: p.categoryLabel,
      price: p.price ?? null,
      image: p.images?.[0] ?? null,
      published: p.published !== false,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const categories = (Object.keys(CATEGORY_META) as ProductCategory[]).map(
    (value) => ({ value, label: CATEGORY_META[value].label }),
  );

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-black text-3xl text-slate-900">
            Productos
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {items.length} productos ·{" "}
            <Link href="/admin" className="text-primary hover:underline">
              ← Volver al panel
            </Link>
          </p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="bg-primary text-white font-bold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
        >
          + Nuevo producto
        </Link>
      </header>

      <ProductsAdminList
        items={items}
        categories={categories}
        imported={imported}
      />
    </main>
  );
}
