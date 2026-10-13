# Dependency update policy

## Choose the correct application first

The **published portfolio** is `portfolio-next/Portfolio-main/`, using its own `package.json` and `package-lock.json`. GitHub Pages deploys its statically exported `out/` through `.github/workflows/deploy-pages.yml`.

The repository-root `package.json` and `package-lock.json` belong to the **legacy** Express/Vite application. They must not be mistaken for the production portfolio's dependency manifest. Changes to these two projects should be reviewed and tested independently.

## Supported environment

Use Node.js **22** as declared by the root `.nvmrc`, which is also used by the active portfolio CI and deployment workflows (`actions/setup-node` with `node-version-file`). Use npm with the checked-in lockfile, not an ad hoc dependency install that is never committed.

## Procedure for the active portfolio

1. Start with the active application's `package.json` and `package-lock.json`. Review the reason for each update, version compatibility and relevant security advisories. Prefer targeted updates over blanket major-version upgrades.
2. Make dependency changes from `portfolio-next/Portfolio-main/`, using npm so the manifest and **that application's** lockfile are updated together. Review lockfile and transitive changes before committing.
3. From that directory, run:
   ```bash
   npm ci --no-audit --no-fund
   npm run typecheck
   npm run lint
   npm run build
   npm run check:static-output
   ```
4. Check the built static pages and deployed-base/custom-domain links, including key images and navigation. Significant framework, React or build-tool updates require a browser smoke test rather than relying on TypeScript alone.
5. Open a PR with the affected package(s), rationale, version notes, and reproducible validation results. Confirm the repository CI succeeds before merging and check the deployment workflow on merge.

You can run `npm audit` separately to inspect security advisories. Do not blindly force incompatible upgrades to silence a scanner; document any deferred advisory, its impact and an update plan.

## Updating the legacy application

Only update root dependencies for work that actually uses the legacy application. Keep the root `package-lock.json` in sync, run its available checks, and explicitly note that the production portfolio CI does **not** certify legacy Express/Vite changes. Avoid using `portfolio-next/Portfolio-main/package-lock.json` to install or audit root dependencies (or vice versa).

Never commit tokens, production environment files, or generated `out/` artifacts as part of a dependency bump.
