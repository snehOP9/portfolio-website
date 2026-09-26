# Sneh Raunak - Portfolio

The source for [snehraunak.in](https://snehraunak.in): machine-learning systems, full-stack products, and explainable-AI research.

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
```

The root `client/`, `server/`, and `shared/` application is legacy. Its public profile data is retained only for compatibility and is aligned with the current public portfolio facts.


## Development workflow

Before pushing changes, run the active application's checks locally:

```bash
cd portfolio-next/Portfolio-main
npm ci
npm run typecheck
npm run lint
npm run build
```

Keep generated build output and local environment files out of commits.
