# Portfolio deployment checklist

Use this checklist before merging a change that can affect the deployed portfolio.

## Build and quality

- Run `npm ci` in `portfolio-next/Portfolio-main`.
- Run `npm run lint` when available and `npm run build`.
- Confirm the production build completes without TypeScript, Next.js, or asset errors.
- Check that no secrets, local-only URLs, debug logs, or private environment values are committed.

## Routing and static assets

- Confirm internal navigation works from a fresh page load.
- Verify images, icons, fonts, and downloadable assets resolve on the deployed base path.
- Verify `out/CNAME` is generated and contains `snehraunak.in`, matching the Pages workflow.
- Check the browser console and network panel for failed asset requests.

## Content and links

- Open the resume/CV link and verify it returns the intended current file.
- Test contact, GitHub, LinkedIn, project, and other external links.
- Confirm external links that open a new tab use safe `rel` attributes.
- Review visible project names, dates, technology labels, and contact details for accidental regressions.

## Responsive and accessibility smoke test

- Check the landing page, navigation, project content, and contact section at mobile, tablet, and desktop widths.
- Navigate the main page using only the keyboard and confirm focus remains visible.
- Confirm meaningful images have useful alternative text and decorative images do not create noisy announcements.
- Verify text remains readable at 200% browser zoom.
- Check animations with reduced-motion enabled.

## Final deployment verification

1. Merge only after required CI checks pass.
2. Confirm the `Deploy portfolio to GitHub Pages` workflow succeeds on `main`.
3. Open `https://snehraunak.in/` in a private browser window.
4. Perform a hard refresh and verify the deployed commit is visible.
5. Re-check the browser console, navigation, primary links, and one mobile viewport.
6. If deployment fails, preserve the failing workflow logs and fix forward rather than force-pushing `main`.
