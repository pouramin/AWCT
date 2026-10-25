import sharp from "sharp";
import path from "node:path";
const directory = path.resolve("docs/research/apple");
for (const [name, width, height] of [["desktop", 1440, 900], ["mobile", 390, 844]]) {
  const tileWidth = name === "desktop" ? 720 : 390;
  const tileHeight = Math.round(height * tileWidth / width);
  const layers = [];
  for (const [index, kind] of ["source", "local"].entries()) {
    const input = path.join(directory, `${kind}-${name}-${width}x${height}-top.png`);
    layers.push({ input: await sharp(input).resize(tileWidth, tileHeight).toBuffer(), left: index * tileWidth, top: 32 });
  }
  const labels = `<svg width="${tileWidth * 2}" height="32"><rect width="100%" height="100%" fill="#202024"/><g fill="white" font-family="Arial" font-size="14"><text x="16" y="22">Original — ${width} × ${height}</text><text x="${tileWidth + 16}" y="22">Local clone — ${width} × ${height}</text></g></svg>`;
  layers.push({ input: Buffer.from(labels), left: 0, top: 0 });
  await sharp({ create: { width: tileWidth * 2, height: tileHeight + 32, channels: 3, background: "#202024" } }).composite(layers).png().toFile(path.join(directory, `comparison-${name}.png`));
}
console.log("Saved desktop and mobile comparison montages.");
