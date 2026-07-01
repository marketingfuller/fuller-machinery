import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  createSupabaseServerClient,
  createSupabaseAdminClient,
} from "@/lib/supabase/server";
import { getProductsFromDbFresh } from "@/lib/products-db";
import { SEED_PRODUCTS, CATEGORY_META } from "@/lib/products";
import type { Product, ProductCategory } from "@/content/products/types";
import ProductEditor from "../../ProductEditor";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

const EMPTY: Product = {
  slug: "",
  name: "",
  category: "bebidas",
  categoryLabel: CATEGORY_META.bebidas.label,
  shortDescription: "",
  images: [],
  specs: [],
  published: true,
  available: true,
};

export default async function AdminProductEditPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;

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

  const isNew = slug === "nuevo";

  let product: Product = EMPTY;
  if (!isNew) {
    const db = await getProductsFromDbFresh();
    const source = db.length ? db : SEED_PRODUCTS;
    const found = source.find((p) => p.slug === slug);
    if (!found) notFound();
    product = found;
  }

  const categories = (Object.keys(CATEGORY_META) as ProductCategory[]).map(
    (value) => ({ value, label: CATEGORY_META[value].label }),
  );

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <header className="mb-8">
        <Link
          href="/admin/productos"
          className="text-sm text-primary hover:underline"
        >
          ← Volver a productos
        </Link>
        <h1 className="font-display font-black text-3xl text-slate-900 mt-2">
          {isNew ? "Nuevo producto" : product.name}
        </h1>
      </header>

      <ProductEditor
        initial={product}
        categories={categories}
        mode={isNew ? "create" : "edit"}
      />
    </main>
  );
}
