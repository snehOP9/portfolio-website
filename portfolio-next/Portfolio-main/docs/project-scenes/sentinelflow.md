# SentinelFlow scene

- **Purpose:** synthetic fraud-risk reference workflow with explainable, auditable decisions.
- **Architecture:** Next.js UI → FastAPI → strict point-in-time feature state → calibrated model → policy → PostgreSQL audit.
- **User action:** score/investigate a synthetic transaction and review an advisory decision.
- **Visual:** signal routes converge on a rotating decision lattice, then leave through a policy path.
- **Motion:** 17-second lattice rotation, route traces, node pulses; hover is supplied by the card frame; click opens detail modal.
- **Color/material:** acid lime signal light, green-black glass, fine grid.
- **Fallback:** static lattice with readable labels; reduced motion and offscreen scenes pause.
- **Cost:** procedural SVG, no remote assets or WebGL context.
