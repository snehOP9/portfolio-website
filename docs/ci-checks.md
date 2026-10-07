# CI Checks

Pull requests targeting main run the repository CI workflow.

The active portfolio is validated from portfolio-next/Portfolio-main with:

- Node.js 22
- npm ci --no-audit --no-fund
- npm run typecheck
- npm run lint
- npm run build

Keep the lockfile committed and investigate CI failures before merging. Changes to the legacy root application should not be assumed to affect the deployed static portfolio.
