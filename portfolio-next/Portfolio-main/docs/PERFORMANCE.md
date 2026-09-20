# Performance

- Static Next.js export with local assets and GitHub Pages-compatible base path.
- Animation is visibility-gated for project previews; particle, cursor, and smooth-scroll enhancements are disabled for reduced-motion and coarse-pointer environments.
- SVG scenes avoid per-card WebGL contexts and external model/texture downloads.
- The full-page particle layer is capped by viewport area, paused in hidden tabs, and omitted where it would be an accessibility or mobile cost.
- Project source images remain available for modal compatibility but are not used by the current card or case-study path; optimize them before reintroducing them in above-the-fold UI.
- Production validation is `npm.cmd run lint`, `npm.cmd run build`, dependency audit, static asset checks, and responsive browser QA where a browser surface is available.
