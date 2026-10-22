import React from "react";
import { ImageResponse } from "next/og";
import { getAllProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

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

  // Permitimos URLs terminadas en .png
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

  return new ImageResponse(
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff",
          alignItems: "center",
          justifyContent: "center",
        },
      },
      React.createElement("img", {
        src: imageUrl,
        style: {
          width: "100%",
          height: "100%",
          objectFit: "contain",
        },
      })
    ),
    {
      width: 1000,
      height: 1000,
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
}
