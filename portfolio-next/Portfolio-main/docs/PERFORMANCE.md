# Performance

- Static Next.js export with local assets and GitHub Pages-compatible base path.
- Animation is visibility-gated for project previews and reduced-motion aware globally.
- SVG scenes avoid per-card WebGL contexts and external model/texture downloads.
- The legacy full-page particle layer is capped by viewport area. It should be monitored in browser profiling before adding more persistent effects.
- Production validation is `npm.cmd run lint`, `npm.cmd run build`, dependency audit, static asset checks, and responsive browser QA where a browser surface is available.
