# CI Checks

Pull requests targeting main run the repository CI workflow.

The active portfolio is validated from portfolio-next/Portfolio-main with Node.js 22 and the committed lockfile.

Required commands:

- npm ci --no-audit --no-fund
- npm run typecheck
- npm run lint
- npm run build

Dependency changes should keep the lockfile synchronized and leave required CI checks green.
