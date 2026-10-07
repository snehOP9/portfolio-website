# Runtime Support

## Active portfolio

The deployed portfolio lives in portfolio-next/Portfolio-main. CI validates it with Node.js 22 and the committed lockfile.

Before changing dependencies, use the Node.js version configured by CI and run:

```bash
npm ci --no-audit --no-fund
npm run typecheck
npm run lint
npm run build
```

## Legacy application

The root package manifest belongs to the legacy Express/Vite application. Changes there should be treated separately from the static Next.js deployment.

## Dependency changes

Keep lockfiles committed and review dependency updates through pull requests. Dependency changes should leave required CI checks green.
