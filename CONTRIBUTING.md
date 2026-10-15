# Contributing

Thanks for helping improve this portfolio.

## Choose the application first

- **Active portfolio:** `portfolio-next/Portfolio-main/` — the static-exported Next.js site published through GitHub Pages.
- **Legacy application:** root-level `client/`, `server/`, and `shared/` — retained for compatibility, not the active static portfolio deployment.

For changes to projects, experience, skills, profile copy, or other public content, start with [the active content-editing guide](portfolio-next/Portfolio-main/docs/CONTENT-EDITING.md). Avoid editing duplicate legacy content unless the change explicitly targets the legacy application.

## Getting started with the active portfolio

Use Node.js 22, matching the root `.nvmrc` and CI. From the repository root:

```bash
cd portfolio-next/Portfolio-main
npm ci
npm run dev
```

Before opening a pull request, run from that directory:

```bash
npm run typecheck
npm run lint
npm run build
npm run check:static-output
```

The static-output check validates generated files after the build. Documentation-only changes should still have links and paths checked.

## Dependency changes

Follow [the dependency update policy](docs/DEPENDENCY-UPDATE-POLICY.md) for the correct manifest, lockfile, scope, and validation commands. Do not update root dependencies when a change only targets the published Next.js portfolio.

## Pull requests

Keep PRs focused and include what changed, why it was needed, and how it was tested. Include exact commands and whether they passed. Do not claim a check passed unless it was actually run.

Never commit secrets, local environment files, dependencies' generated output, or generated build artifacts.
