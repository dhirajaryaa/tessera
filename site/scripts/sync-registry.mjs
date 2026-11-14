import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const site = resolve(here, "..");
const repo = resolve(site, "..");
const source = join(repo, "registry", "tessera");
const components = join(site, "components", "tessera");
const styles = join(site, "styles", "tessera.css");
const lib = join(site, "lib", "utils.ts");

async function main() {
  const entries = await readdir(source, { withFileTypes: true }).catch(() => []);
  if (!entries.length) {
    console.warn("[tessera] registry/tessera is empty; skipping sync.");
    return;
  }

  await rm(components, { recursive: true, force: true });
  await mkdir(components, { recursive: true });
  await mkdir(dirname(styles), { recursive: true });
  await mkdir(dirname(lib), { recursive: true });

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (entry.name.endsWith(".tsx")) {
      await cp(join(source, entry.name), join(components, entry.name));
    }
    if (entry.name === "tessera.css") {
      await cp(join(source, entry.name), styles);
    }
    if (entry.name === "utils.ts") {
      await cp(join(source, entry.name), lib);
    }
  }

  console.log("[tessera] synced registry into the docs site.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
