# Dependency update policy

## Choose the correct application first

The **published portfolio** is `portfolio-next/Portfolio-main/`, using its own `package.json` and `package-lock.json`. GitHub Pages deploys its statically exported `out/` through `.github/workflows/deploy-pages.yml`.

The repository-root `package.json` and `package-lock.json` belong to the **legacy** Express/Vite application. These projects have separate dependencies and must be reviewed and tested independently.

## Supported environment

Use Node.js **22**, as declared by the repository-root `.nvmrc` and used by the active portfolio CI/deployment workflows. Use npm with the checked-in lockfile; do not rely on an uncommitted ad hoc install.

## Updating active portfolio dependencies

1. Review the reason for each change, version compatibility, and relevant security advisories. Prefer targeted updates over blanket major-version upgrades.
2. From `portfolio-next/Portfolio-main/`, use npm so that the active application's manifest and lockfile are updated together.
3. Run from that directory:
   ```bash
   npm ci --no-audit --no-fund
   npm run typecheck
   npm run lint
   npm run build
   npm run check:static-output
   ```
4. Check built pages and deployed-base/custom-domain links, including key images and navigation. Significant framework, React, or build-tool updates need a browser smoke test in addition to TypeScript checks.
5. In the PR, identify affected packages, rationale, version notes, and exact validation results. Confirm CI passes and review deployment status after merging.

Run `npm audit` separately to inspect advisories. Do not force incompatible upgrades just to silence a scanner; document deferred risks and a remediation plan.

## Updating legacy dependencies

Only update root dependencies for changes that use the legacy application. Keep the root `package-lock.json` synchronized, run the relevant checks, and state that active portfolio CI does **not** certify legacy Express/Vite changes. Never use one application's lockfile to install or audit the other application's dependencies.

Never commit tokens, production environment files, or generated `out/` artifacts as part of a dependency update.
