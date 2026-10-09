import { access, readFile } from "node:fs/promises";
import { join } from "node:path";

const outputDirectory = join(process.cwd(), "out");
const candidateFiles = [
  join(outputDirectory, "index.html"),
  join(outputDirectory, "en", "index.html"),
];

let html;
let entryFile;

for (const file of candidateFiles) {
  try {
    await access(file);
    entryFile = file;
    html = await readFile(file, "utf8");
    break;
  } catch {
    // Try the next supported static-export layout.
  }
}

if (!html || !entryFile) {
  console.error("Static output check failed: expected out/index.html or out/en/index.html after the build.");
  process.exit(1);
}

const checks = [
  ["document title", /<title>[^<]+<\/title>/i],
  ["meta description", /<meta[^>]+name=["']description["'][^>]+content=["'][^"']+["']/i],
  ["Work navigation anchor", /href=["']#work["']/i],
  ["Research navigation anchor", /href=["']#research["']/i],
  ["About navigation anchor", /href=["']#about["']/i],
  ["Contact navigation anchor", /href=["']#contact["']/i],
];

const failures = checks.filter(([, pattern]) => !pattern.test(html)).map(([name]) => name);

if (failures.length) {
  console.error(`Static output check failed for ${entryFile}. Missing: ${failures.join(", ")}.`);
  process.exit(1);
}

console.log(`Static output smoke check passed: ${entryFile} contains a title, description, and all key navigation anchors.`);
