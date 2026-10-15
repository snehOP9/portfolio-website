# Contributing

Thanks for helping improve this portfolio.

## Choose the application first

This repository contains two applications with different purposes:

- **Active portfolio:** `portfolio-next/Portfolio-main/` — the static-exported Next.js site deployed through GitHub Pages.
- **Legacy application:** root-level `client/`, `server/`, and `shared/` — retained for compatibility; it is not the active static portfolio deployment.

For changes to projects, experience, skills, profile copy, or other public portfolio content, start with [the active content-editing guide](portfolio-next/Portfolio-main/docs/CONTENT-EDITING.md). Avoid editing duplicate legacy content unless the change specifically targets the legacy application.

## Getting started with the active portfolio

Use Node.js 22, matching the repository's `.nvmrc` and CI environment.

From the repository root:

```bash
cd portfolio-next/Portfolio-main
npm ci
npm run dev
```

Before opening a pull request, run the available quality gates from that directory:

```bash
npm run typecheck
npm run lint
npm run build
npm run check:static-output
```

The static-output check validates the generated site after the build. If you change only documentation, state that clearly in the pull request and still check links and paths.

## Pull requests

Please keep pull requests focused on one improvement. Include:

- What changed
- Why the change was needed
- How it was tested (include exact commands and whether they passed)

Avoid committing secrets, local environment files, dependencies' generated output, or generated build artifacts. Do not claim a check passed unless it was actually run.
