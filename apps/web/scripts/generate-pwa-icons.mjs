import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const iconsDir = path.join(__dirname, "..", "public", "icons");
const svgPath = path.join(iconsDir, "icon.svg");

const sizes = [
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "icon-maskable-512.png", size: 512, maskable: true },
];

async function main() {
  await mkdir(iconsDir, { recursive: true });
  const svg = await readFile(svgPath);

  for (const { name, size, maskable } of sizes) {
    let pipeline = sharp(svg).resize(size, size, { fit: "contain", background: "#122824" });

    if (maskable) {
      pipeline = sharp({
        create: {
          width: size,
          height: size,
          channels: 4,
          background: "#122824",
        },
      }).composite([
        {
          input: await sharp(svg).resize(Math.round(size * 0.72), Math.round(size * 0.72)).png().toBuffer(),
          gravity: "center",
        },
      ]);
    }

    await pipeline.png({ compressionLevel: 9 }).toFile(path.join(iconsDir, name));
    console.log(`Generated ${name}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
