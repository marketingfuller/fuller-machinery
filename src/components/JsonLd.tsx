/**
 * Renderiza JSON-LD structured data como <script type="application/ld+json">.
 * Escapa `<` para impedir script-tag injection.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
