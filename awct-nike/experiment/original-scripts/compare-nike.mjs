import fs from "node:fs/promises";
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const folder = new URL("../docs/research/nike/", import.meta.url);
for (const [name, dimensions] of [
  ["desktop", "1440x900"],
  ["mobile", "390x844"],
  ["wide", "1920x1080"],
]) {
  const source = new URL(`source-${name}-${dimensions}.png`, folder);
  const clone = new URL(`clone-${name}-${dimensions}.png`, folder);
  const sourceBytes = await fs.readFile(source);
  const cloneBytes = await fs.readFile(clone);
  const a = await sharp(sourceBytes).metadata();
  const b = await sharp(cloneBytes).metadata();
  if (a.width !== b.width || a.height !== b.height)
    throw new Error(`Mismatched ${name} screenshot sizes`);
  const label = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${a.width * 2}" height="40"><rect width="100%" height="100%" fill="#eee"/><text x="20" y="26" font-family="Arial" font-size="18">Original Nike</text><text x="${a.width + 20}" y="26" font-family="Arial" font-size="18">Local clone</text></svg>`,
  );
  await sharp({
    create: {
      width: a.width * 2,
      height: a.height + 40,
      channels: 3,
      background: "#fff",
    },
  })
    .composite([
      { input: label, left: 0, top: 0 },
      { input: sourceBytes, left: 0, top: 40 },
      { input: cloneBytes, left: a.width, top: 40 },
    ])
    .png()
    .toFile(fileURLToPath(new URL(`comparison-${name}.png`, folder)));
  console.log(`${name}: matching ${a.width} × ${a.height} reference bitmaps`);
}
