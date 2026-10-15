# Portfolio Release Checklist

Run from `portfolio-next/Portfolio-main` before merging a release candidate.

## Automated checks

- [ ] `npm ci`
- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm audit --omit=dev --audit-level=high`
- [ ] `npm run build`
- [ ] `npm run check:static-output`
- [ ] `npm run check:static-quality`

## Manual smoke checks

- [ ] Open the homepage and each project/research URL directly, not only via client navigation.
- [ ] Confirm the resume link downloads the expected PDF and external links open the intended destinations.
- [ ] Check the mobile layout at narrow widths and at least one desktop width; look for horizontal overflow.
- [ ] Navigate with keyboard only; verify visible focus, skip link, menu operation, and form labels.
- [ ] Enable reduced motion in the operating system and confirm smooth scrolling, cursor effects, and decorative animation are reduced or disabled.
- [ ] Check color contrast for text and interactive states. The static checker does not calculate contrast ratios.
- [ ] Verify the exported `CNAME`, `404.html`, metadata, images, and generated JS/CSS assets.

## Deployment

- [ ] Confirm the target commit and GitHub Pages deployment succeeded.
- [ ] Visit `https://snehraunak.in` and the changed route after deployment.
- [ ] Record any external URL that CI could not verify because of authentication, rate limiting, or network restrictions.
