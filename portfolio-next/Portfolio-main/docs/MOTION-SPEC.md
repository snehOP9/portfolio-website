# Motion specification

- Hero S: slow independent orbit loops (8–38 seconds), slight pointer tilt, no full-scene spin.
- Project scenes: deterministic-ish route loops and breathing nodes; activity remains subtle and card content remains readable.
- Visibility: each project scene begins only while its card intersects the viewport; offscreen scenes pause rather than restarting.
- Reduced motion: all non-essential animation is suppressed via the global media query and scene components hold a static, legible state.
- Navigation: hash links retain native/Lenis smooth scrolling and mobile never enters a pinned horizontal experience.
