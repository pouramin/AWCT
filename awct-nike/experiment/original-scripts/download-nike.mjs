import fs from "node:fs/promises";
const root = new URL("../", import.meta.url);
const data = JSON.parse(
  await fs.readFile(
    new URL("docs/research/nike/catalog-extracted.json", root),
    "utf8",
  ),
);
const target = new URL("apps/nike/public/sites/nike/", root);
await fs.mkdir(target, { recursive: true });
const assets = new Map();
for (const p of data.products) for (const i of p.images) assets.set(i.src, "");
for (const i of data.images)
  if (i.src.startsWith("http")) assets.set(i.src, "");
let index = 0;
for (const url of assets.keys())
  assets.set(url, `image-${String(index++).padStart(3, "0")}.jpg`);
const queue = [...assets];
await Promise.all(
  Array.from({ length: 8 }, async () => {
    while (queue.length) {
      const [url, file] = queue.shift();
      const response = await fetch(url);
      if (!response.ok) throw Error(`${response.status} ${url}`);
      await fs.writeFile(
        new URL(file, target),
        new Uint8Array(await response.arrayBuffer()),
      );
    }
  }),
);
for (const p of data.products)
  for (const i of p.images) i.local = "/sites/nike/" + assets.get(i.src);
for (const i of data.images) i.local = "/sites/nike/" + assets.get(i.src);
for (const name of [
  "HelveticaNowText",
  "HelveticaNowTextMedium",
  "Nike-Futura",
]) {
  const url = `https://www.nike.com/static/ncss/4.3/dotcom/fonts/${name}.woff2`;
  const res = await fetch(url);
  if (!res.ok) throw Error(`${res.status} ${url}`);
  await fs.writeFile(
    new URL(name + ".woff2", target),
    new Uint8Array(await res.arrayBuffer()),
  );
  assets.set(url, name + ".woff2");
}
await fs.writeFile(
  new URL("apps/nike/src/components/sites/nike/catalog.json", root),
  JSON.stringify(data, null, 2),
);
await fs.writeFile(
  new URL("docs/research/nike/asset-map.json", root),
  JSON.stringify(
    [...assets].map(([source, file]) => ({
      source,
      local: "apps/nike/public/sites/nike/" + file,
    })),
    null,
    2,
  ),
);
for (let n = 0; n < 3; n++)
  await fs.writeFile(
    new URL(`brand-${n}.svg`, target),
    data.svg[n].replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" '),
  );
console.log(
  `Downloaded ${assets.size} assets; ${data.products.length} products.`,
);
