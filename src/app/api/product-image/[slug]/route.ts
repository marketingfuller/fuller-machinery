import sharp from "sharp";
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
  const { slug: rawSlug } = await params;

  const slug = decodeURIComponent(rawSlug).replace(/\.png$/i, "");

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

    if (!imageResponse.ok) {
      return Response.json(
        { error: "No se pudo obtener la imagen original" },
        { status: 502 }
      );
    }

    const input = Buffer.from(
      await imageResponse.arrayBuffer()
    );

    const png = await sharp(input)
      .resize({
        width: 1600,
        height: 1600,
        fit: "inside",
        withoutEnlargement: true,
      })
      .png({
        compressionLevel: 9,
      })
      .toBuffer();

    return new Response(new Uint8Array(png), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("Error converting product image:", error);

    return Response.json(
      { error: "Error convirtiendo la imagen" },
      { status: 500 }
    );
  }
}