import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const PUBLIC_DIR = new URL("../public/", import.meta.url).pathname;
const PLACEHOLDER = "{SITE_URL}";

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const offenders = [];
for (const file of walk(PUBLIC_DIR)) {
  const content = readFileSync(file, "utf8");
  if (content.includes(PLACEHOLDER)) offenders.push(file);
}

if (offenders.length > 0) {
  console.error("Build aborted: unresolved {SITE_URL} placeholder found in:");
  for (const f of offenders) console.error("  - " + f);
  console.error("Replace {SITE_URL} with the real domain before deploying.");
  process.exit(1);
}
