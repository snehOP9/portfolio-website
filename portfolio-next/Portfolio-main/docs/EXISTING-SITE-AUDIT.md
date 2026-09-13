# Existing site audit

| Area | Decision | Notes |
| --- | --- | --- |
| Next.js static export and GitHub Pages base path | KEEP | Correct architecture for a content portfolio; no server or database is needed. |
| Security policy and mailto contact flow | KEEP | Static-first and no third-party form endpoint. |
| Hero | REWRITE | The former text S and flat orbit rings did not communicate spatial depth or a unique identity. |
| Project cards | REPLACE | Existing cards used static artwork; project behavior now drives live procedural signal scenes. |
| Horizontal project story | KEEP + UPGRADE | Retain desktop wheel-to-horizontal storytelling, with explicit end padding and a normal mobile stack. |
| Research | KEEP + UPGRADE | Keep explainability content and no unsupported metrics; improve the visual language around interpretable systems. |
| Stack | KEEP + UPGRADE | Keep verified tools; present them as capability evidence rather than a logo wall. |
| Roadmap and education | KEEP | Content is specific, truthful, and aligned with the portfolio story. |
| Language switcher | REMOVE | The live presentation is English-only; retained translations are not exposed as a false language promise. |
| Archived reference images and resume | REMOVE FROM RENDERING | They are not used by the redesigned hero or project cards. |

## Verified project basis

- **SentinelFlow:** synthetic-data fraud-risk reference architecture; FastAPI, Next.js, calibrated model policy, Redis point-in-time state, PostgreSQL audit persistence, and an operations UI.
- **Student Performance Predictor Pro:** React/Vite and FastAPI flow for prediction, uncertainty, recommendations, explainability, and authenticated workflows; some dashboard views remain explicitly presentation demo state.
- **Anony Talk:** React/Vite, Express, SQLite, and bcrypt-based anonymous posts, relate interactions, peer chat, avatar expression, motivational content, and optional chatbot support.

## Limits

The reference projects were inspected from their local source or public repository/readme. The portfolio does not claim their demonstrations are production systems or that their data are live.
