# Sneh Raunak - Portfolio

The source for [snehraunak.in](https://snehraunak.in): machine-learning systems, full-stack products, and explainable-AI research.

Use Node.js 22 locally (`nvm use` from the repository root). The `.nvmrc` file keeps the local runtime aligned with CI.

## Live portfolio

- [Portfolio](https://snehraunak.in)
- [Selected work](https://snehraunak.in/#work)
- [Explainable-AI research](https://snehraunak.in/research/short-form-video-xai/)

## Active application

The deployable site lives in `portfolio-next/Portfolio-main` and is a static Next.js export published through GitHub Pages. Run the following from that directory:

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run check:static-output
```

See [`CONTENT-EDITING.md`](portfolio-next/Portfolio-main/docs/CONTENT-EDITING.md) for the active content paths and validation workflow.

The root `client/`, `server/`, and `shared/` application is legacy. Its public profile data is retained only for compatibility and is aligned with the current public portfolio facts.
