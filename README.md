# Sneh Raunak - Portfolio

The source for [snehraunak.in](https://snehraunak.in): machine-learning systems, full-stack products, and explainable-AI research.

## Live portfolio

- [Portfolio](https://snehraunak.in)
- [Selected work](https://snehraunak.in/#work)
- [Explainable-AI research](https://snehraunak.in/research/short-form-video-xai/)

## Requirements

Use Node.js 22 for local development and CI. The repository pins this major version in `.nvmrc`; install a version manager such as nvm and run `nvm use` from the repository root.

## Active application

The deployable site lives in `portfolio-next/Portfolio-main` and is a static Next.js export published through GitHub Pages. Run the following from that directory:

```bash
npm ci
npm run typecheck
npm run lint
npm run build
```

The root `client/`, `server/`, and `shared/` application is legacy. Its public profile data is retained only for compatibility and is aligned with the current public portfolio facts.
