const { WC_STORE_URL, WC_CONSUMER_KEY, WC_CONSUMER_SECRET } = process.env;
const auth = "Basic " + Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString("base64");
let all = [], page = 1;
while (true) {
  const res = await fetch(`${WC_STORE_URL}/wp-json/wc/v3/products?per_page=100&page=${page}&status=publish`, { headers: { Authorization: auth } });
  const b = await res.json(); all.push(...b);
  if (page >= Number(res.headers.get("x-wp-totalpages") || 1) || !b.length) break; page++;
}
// Cuenta por categoría (todas las asignaciones) y guarda ejemplos.
const cat = {};
for (const p of all) for (const c of (p.categories||[])) {
  cat[c.slug] ??= { name: c.name, count: 0, ex: [] };
  cat[c.slug].count++; if (cat[c.slug].ex.length < 2) cat[c.slug].ex.push(p.name);
}
const rows = Object.entries(cat).sort((a,b)=>b[1].count-a[1].count);
console.log(`TOTAL productos: ${all.length}\n`);
for (const [slug, v] of rows) console.log(`${String(v.count).padStart(3)}  ${v.name}  [${slug}]  ·  ${v.ex.join(" | ").slice(0,70)}`);
