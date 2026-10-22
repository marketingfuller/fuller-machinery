import { getAllProducts } from "@/lib/products";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const SITE_URL = "https://www.fullermachinery.com";

function absoluteImage(src: string): string {
  if (/^https?:\/\//i.test(src)) return src;
  return `${SITE_URL}${src.startsWith("/") ? "" : "/"}${src}`;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const products = await getAllProducts();

  const product = products.find(
    (item) => item.slug.toLowerCase() === slug.toLowerCase()
  );

  if (!product) {
    return Response.json(
      { error: "Producto no encontrado" },
      { status: 404 }
    );
  }

  const image = product.images?.[0];

  if (!image) {
    return Response.json(
      { error: "Producto sin imagen" },
      { status: 404 }
    );
  }

  const imageUrl = absoluteImage(image);

  try {
    const imageResponse = await fetch(imageUrl, {
      cache: "no-store",
    });

    if (!imageResponse.ok || !imageResponse.body) {
      return Response.json(
        { error: "No se pudo cargar la imagen" },
        { status: 502 }
      );
    }

    const contentType =
      imageResponse.headers.get("content-type") || "image/jpeg";

    return new Response(imageResponse.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return Response.json(
      { error: "Error obteniendo la imagen" },
      { status: 500 }
    );
  }
}
