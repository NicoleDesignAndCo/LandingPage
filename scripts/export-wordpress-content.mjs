import { build } from "esbuild";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const temporaryDirectory = await mkdtemp(join(tmpdir(), "fractionl-content-"));
const insightBundle = join(temporaryDirectory, "insights.mjs");
const dataBundle = join(temporaryDirectory, "data.mjs");

await build({ entryPoints: ["src/insights.ts"], bundle: true, platform: "node", format: "esm", outfile: insightBundle });
await build({
  entryPoints: ["src/data.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: dataBundle,
  loader: { ".avif": "file", ".jpeg": "file" },
  assetNames: "[name]",
});

const insightModule = await import(insightBundle);
const dataModule = await import(dataBundle);
const snapshot = {
  generatedAt: new Date().toISOString(),
  site: dataModule.site,
  services: dataModule.services,
  caseStudies: dataModule.caseStudies,
  studioWork: dataModule.studioWork,
  founderWork: dataModule.founderWork,
  processSteps: dataModule.processSteps,
  team: dataModule.team.map(({ image, ...member }) => ({ ...member, sourceImage: String(image) })),
  insights: insightModule.insights,
};

// Normalize legacy brand references only in the WordPress migration snapshot;
// the existing React application remains unchanged.
const normalizedSnapshot = JSON.parse(
  JSON.stringify(snapshot)
    .replaceAll("Nicole Design & Co.", "Fractionl Studio")
    .replaceAll("https://nicoledesignandco.com/services", "/services")
    .replaceAll("nicoledesignandco.com/services", "fractionlstudio.com/services"),
);

await writeFile(
  "wordpress-theme/fractionl-studio/inc/content-snapshot.json",
  `${JSON.stringify(normalizedSnapshot, null, 2)}\n`,
);

const written = JSON.parse(await readFile("wordpress-theme/fractionl-studio/inc/content-snapshot.json", "utf8"));
console.log(`Exported ${written.caseStudies.length} case studies and ${written.insights.length} insights.`);
