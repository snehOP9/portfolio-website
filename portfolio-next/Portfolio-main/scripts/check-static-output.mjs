import { access, readFile, readdir } from "node:fs/promises";
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

// Ensure each generated Next.js asset referenced by the entry document exists in the export.
const assetReferences = [
  ...html.matchAll(/(?:src|href)=["']([^"']*\/_next\/static\/[^"']+)["']/g),
].map((match) => match[1].split(/[?#]/, 1)[0]);

for (const reference of new Set(assetReferences)) {
  const relativePath = reference.replace(/^\//, "");
  try {
    await access(join(outputDirectory, relativePath));
  } catch {
    failures.push(`referenced static asset: ${reference}`);
  }
}

const staticDirectory = join(outputDirectory, "_next", "static");
let staticFiles = [];
try {
  staticFiles = await readdir(staticDirectory, { recursive: true });
} catch {
  failures.push("_next/static directory");
}

if (!staticFiles.some((file) => file.endsWith(".js"))) {
  failures.push("generated JavaScript asset");
}
if (!staticFiles.some((file) => file.endsWith(".css"))) {
  failures.push("generated CSS asset");
}

try {
  await access(join(outputDirectory, "og.png"));
} catch {
  failures.push("public og.png asset");
}

try {
  const cname = (await readFile(join(outputDirectory, "CNAME"), "utf8")).trim();
  if (cname !== "snehraunak.in") {
    failures.push("CNAME with snehraunak.in");
  }
} catch {
  failures.push("CNAME");
}

try {
  await access(join(outputDirectory, "404.html"));
} catch {
  failures.push("404.html");
}


for (const [name, expected] of [
  ["robots.txt", "Sitemap: https://snehraunak.in/sitemap.xml"],
  ["sitemap.xml", "<loc>https://snehraunak.in/</loc>"],
]) {
  try {
    const content = await readFile(join(outputDirectory, name), "utf8");
    if (!content.includes(expected)) {
      failures.push(`${name} canonical entry`);
    }
  } catch {
    failures.push(name);
  }
}

if (failures.length) {
  console.error(`Static output check failed for ${entryFile}. Missing: ${failures.join(", ")}.`);
  process.exit(1);
}

console.log(`Static output smoke check passed: ${entryFile} and representative JS, CSS, and public assets are present.`);
