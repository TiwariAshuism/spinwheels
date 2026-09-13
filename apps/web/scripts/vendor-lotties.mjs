import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "lottie");

const sources = {
  "car-hero.lottie":
    "https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie",
  "car-road.json": "https://assets1.lottiefiles.com/packages/lf20_w51pcehl.json",
  "search.json": "https://cdn.lordicon.com/msoeawqm.json",
  "book.json": "https://cdn.lordicon.com/wxnxiano.json",
  "verify.json": "https://cdn.lordicon.com/iltqorsz.json",
  "instant.json": "https://cdn.lordicon.com/kbtmbyzy.json",
};

async function main() {
  await mkdir(outDir, { recursive: true });

  for (const [filename, url] of Object.entries(sources)) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download ${filename} from ${url}: ${response.status}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    await writeFile(path.join(outDir, filename), buffer);

    if (filename.endsWith(".json")) {
      const preview = JSON.parse(buffer.toString("utf8"));
      console.log(
        `Saved ${filename} (${buffer.length} bytes) — ${preview.nm}, ${preview.layers?.length ?? 0} layers`,
      );
      continue;
    }

    console.log(`Saved ${filename} (${buffer.length} bytes)`);
  }

}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
