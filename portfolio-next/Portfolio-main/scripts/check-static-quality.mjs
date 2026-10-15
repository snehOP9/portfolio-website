import { access, readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const outputDirectory = join(process.cwd(), "out");
const files = await readdir(outputDirectory, { recursive: true });
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const failures = [];
const warnings = [];
const externalUrls = new Set();

if (!htmlFiles.length) {
  console.error("Static quality check failed: no exported HTML pages found in out/.");
  process.exit(1);
}

function hasAttribute(attributes, name) {
  return new RegExp("\\b" + name + "\\s*=\\s*(?:[\"'][^\"']*[\"']|[^\\s>]+)", "i").test(attributes);
}

function hasAccessibleName(attributes, innerHtml) {
  const text = innerHtml.replace(/<[^>]*>/g, " ").replace(/&(?:nbsp|#160);/gi, " ").trim();
  return Boolean(
    text ||
    hasAttribute(attributes, "aria-label") ||
    hasAttribute(attributes, "aria-labelledby") ||
    hasAttribute(attributes, "title") ||
    /<img\b[^>]*\balt=["'][^"']+["']/i.test(innerHtml) ||
    /<svg\b[^>]*\baria-label=["'][^"']+["']/i.test(innerHtml) ||
    /<svg\b[^>]*>[\s\S]*?<title>[^<]+<\/title>/i.test(innerHtml)
  );
}

async function internalTargetExists(url) {
  const pathname = decodeURIComponent(url.pathname);
  const clean = pathname.replace(/^\/+/, "");
  const candidates = !clean
    ? [join(outputDirectory, "index.html")]
    : [
        join(outputDirectory, clean),
        ...(pathname.endsWith("/") ? [join(outputDirectory, clean, "index.html")] : []),
        join(outputDirectory, clean, "index.html"),
        join(outputDirectory, clean + ".html"),
      ];
  for (const candidate of candidates) {
    try {
      await access(candidate);
      return true;
    } catch {
      // Try the next static-export representation.
    }
  }
  return false;
}

for (const relativeFile of htmlFiles) {
  const html = await readFile(join(outputDirectory, relativeFile), "utf8");
  const sourcePath = relativeFile.replace(/index\.html$/, "");
  const sourceUrl = new URL(sourcePath, "https://portfolio.local/");

  for (const match of html.matchAll(/<img\b([^>]*)>/gi)) {
    if (!hasAttribute(match[1], "alt")) failures.push(relativeFile + ": image is missing alt text");
  }

  for (const tag of ["button", "a"]) {
    const pattern = new RegExp("<" + tag + "\\b([^>]*)>([\\s\\S]*?)<\\/" + tag + ">", "gi");
    for (const match of html.matchAll(pattern)) {
      if (!hasAccessibleName(match[1], match[2])) failures.push(relativeFile + ": " + tag + " has no accessible name");
    }
  }

  const labelForIds = new Set(
    [...html.matchAll(/<label\b[^>]*\bfor=["']([^"']+)["']/gi)].map((match) => match[1])
  );
  for (const match of html.matchAll(/<(input|select|textarea)\b([^>]*)>/gi)) {
    const tag = match[1].toLowerCase();
    const attrs = match[2];
    if (tag === "input" && /\btype=["']hidden["']/i.test(attrs)) continue;
    const id = (attrs.match(/\bid=["']([^"']+)["']/i) || [])[1];
    const labelled = hasAttribute(attrs, "aria-label") || hasAttribute(attrs, "aria-labelledby") || hasAttribute(attrs, "title");
    const wrapped = /<label\b[^>]*>[\s\S]*?<(input|select|textarea)\b/i.test(html);
    if (!labelled && !(id && labelForIds.has(id)) && !wrapped) {
      failures.push(relativeFile + ": " + tag + " is missing an associated label");
    }
  }

  for (const match of html.matchAll(/\bhref=["']([^"']+)["']/gi)) {
    const href = match[1].trim();
    if (!href || href.startsWith("#") || /^(mailto:|tel:)/i.test(href)) continue;
    if (/^(javascript:|data:)/i.test(href)) {
      failures.push(relativeFile + ": unsafe URL " + href);
      continue;
    }
    let target;
    try {
      target = new URL(href, sourceUrl);
    } catch {
      failures.push(relativeFile + ": malformed URL " + href);
      continue;
    }
    if (target.origin === "https://portfolio.local") {
      if (!(await internalTargetExists(target))) failures.push(relativeFile + ": broken internal link " + href);
    } else if (target.protocol === "http:" || target.protocol === "https:") {
      externalUrls.add(target.href);
    }
  }
}

const cssFiles = files.filter((file) => file.endsWith(".css"));
let hasReducedMotion = false;
for (const file of cssFiles) {
  const css = await readFile(join(outputDirectory, file), "utf8");
  if (/prefers-reduced-motion\s*:\s*reduce/i.test(css)) {
    hasReducedMotion = true;
    break;
  }
}
if (!hasReducedMotion) failures.push("reduced-motion CSS preference");

async function checkExternal(url) {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
      headers: { "user-agent": "portfolio-static-link-check/1.0" },
    });
    if (response.status === 404 || response.status === 410) {
      failures.push("external link returned " + response.status + ": " + url);
    } else if (response.status >= 400 && ![401, 403, 405, 429, 999].includes(response.status)) {
      warnings.push("external link could not be verified (HTTP " + response.status + "): " + url);
    }
  } catch {
    warnings.push("external link could not be verified due to network restrictions: " + url);
  }
}

const externalList = [...externalUrls];
for (let i = 0; i < externalList.length; i += 4) {
  await Promise.all(externalList.slice(i, i + 4).map(checkExternal));
}

for (const warning of warnings) console.warn("WARN: " + warning);
if (failures.length) {
  console.error("Static quality check failed with " + failures.length + " issue(s):\n- " + failures.join("\n- "));
  process.exit(1);
}
console.log("Static quality check passed for " + htmlFiles.length + " HTML page(s), " + externalUrls.size + " external URL(s), accessible names, form labels, and reduced-motion CSS.");
