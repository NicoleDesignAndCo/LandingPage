import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = path.resolve(import.meta.dirname, "..");
const sourceRoot = path.join(projectRoot, "source-material", "insights");
const outputRoot = path.join(projectRoot, "public", "images", "insights");
const HERO_WIDTH = 1720;
const CARD_WIDTH = 720;

const slugAliases = new Map([
  ["website-hosting-explained-what every-business-owner-needs-to-know", "website-hosting-explained-what-every-business-owner-needs-to-know"],
  ["what-makes-a-great-small-business-website- 12-must-have-features", "what-makes-a-great-small-business-website-12-must-have-features"],
  ["website-redesign-checklist-15-signs-it-s-time-for an-upgrade", "website-redesign-checklist-15-signs-its-time-for-an-upgrade"],
]);

const formatBytes = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

async function optimize(source, output, width, format) {
  const pipeline = sharp(source).resize({ width, withoutEnlargement: true });
  if (format === "avif") pipeline.avif({ quality: 72, chromaSubsampling: "4:4:4", effort: 6 });
  else pipeline.webp({ quality: 86, smartSubsample: true, effort: 6 });
  await pipeline.toFile(output);
}

const entries = await readdir(sourceRoot, { withFileTypes: true });
console.log("Insight image optimization\n");
console.log("slug | original | hero.avif | hero.webp | card.avif | card.webp | dimensions");
console.log("--- | ---: | ---: | ---: | ---: | ---: | ---");

for (const entry of entries.filter((item) => item.isDirectory())) {
  const files = await readdir(path.join(sourceRoot, entry.name));
  const heroName = files.find((file) => /^hero\.(png|jpe?g|webp|avif)$/i.test(file));
  if (!heroName) continue;

  const slug = slugAliases.get(entry.name) ?? entry.name;
  const source = path.join(sourceRoot, entry.name, heroName);
  const destination = path.join(outputRoot, slug);
  await mkdir(destination, { recursive: true });
  const metadata = await sharp(source).metadata();
  const outputs = [
    ["hero.avif", HERO_WIDTH, "avif"],
    ["hero.webp", HERO_WIDTH, "webp"],
    ["card.avif", CARD_WIDTH, "avif"],
    ["card.webp", CARD_WIDTH, "webp"],
  ];
  for (const [name, width, format] of outputs) await optimize(source, path.join(destination, name), width, format);

  const sizes = await Promise.all(outputs.map(([name]) => stat(path.join(destination, name)).then((item) => item.size)));
  const originalSize = (await stat(source)).size;
  console.log(`${slug} | ${formatBytes(originalSize)} | ${sizes.map(formatBytes).join(" | ")} | ${metadata.width}×${metadata.height}`);
}
