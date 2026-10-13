# Contributing

Thanks for helping improve this portfolio.

## Working on the deployed site

The public site is the static Next.js application under `portfolio-next/Portfolio-main/`. The repository-root `client/`, `server/`, and `shared/` application is legacy and is **not** the application deployed to GitHub Pages.

Use the Node.js version from the repository-root `.nvmrc` (currently Node 22). From `portfolio-next/Portfolio-main/` run:

```bash
npm ci
npm run dev
```

After changes, validate before opening a PR:

```bash
npm run typecheck
npm run lint
npm run build
npm run check:static-output
```

Content-only contributors should also read [the active content-editing guide](portfolio-next/Portfolio-main/docs/CONTENT-EDITING.md).

## Updating dependencies

Follow [the dependency-update policy](docs/DEPENDENCY-UPDATE-POLICY.md) for the correct manifest, lockfile, scope and checks. Do not update the legacy root project when the change only targets the published Next.js portfolio.

## Pull requests

Keep a PR focused and include what changed, why it is needed and how it was tested. Do not commit real secrets, local environment files or generated build output.
