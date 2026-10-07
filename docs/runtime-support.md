# Runtime Support

## Active portfolio

The deployed portfolio lives in portfolio-next/Portfolio-main. CI currently validates it with Node.js 22 using the committed lockfile.

Before changing dependencies, use the Node.js version configured by CI and run:

```bash
npm ci --no-audit --no-fund
npm run typecheck
npm run lint
npm run build
```

## Legacy application

The root package manifest belongs to the legacy Express/Vite application. Changes to that application should be treated separately from the static Next.js deployment and should not silently change the production deployment path.

## Dependency changes

Keep lockfiles committed and review dependency updates through pull requests. Dependency changes should leave the required CI checks green.
