# Portfolio release checklist

Use this checklist before publishing a production change.

## 1. Install and lint

From `portfolio-next/Portfolio-main`:

```bash
npm install
npm run lint
```

- [ ] Dependencies install without errors.
- [ ] ESLint completes without errors.

## 2. Build the production site

```bash
npm run build
```

- [ ] The Next.js production build completes successfully.
- [ ] No unexpected build warnings or missing-module errors appear.

## 3. Verify GitHub Pages paths

- [ ] Production URLs use the `/portfolio-website/` base path where required.
- [ ] JavaScript, CSS, images, fonts, and other static assets load from the deployed site.
- [ ] Navigation links do not point to local-development-only paths.

## 4. Verify portfolio content

- [ ] Home page loads correctly.
- [ ] Projects open and their links work.
- [ ] Resume opens from the resume action.
- [ ] Contact action creates the expected email draft.
- [ ] Social/profile links point to the intended accounts.

## 5. Responsive and accessibility smoke test

- [ ] Check the home page on a narrow mobile viewport.
- [ ] Check the home page on a desktop viewport.
- [ ] Keyboard navigation reaches interactive controls in a sensible order.
- [ ] Interactive controls have visible focus states.
- [ ] Images and meaningful icons have appropriate accessible names or alternative text.

## 6. Final deployment check

- [ ] Review the final diff before merging.
- [ ] Confirm the deployed URL after the change is live.
- [ ] Open the home page and at least one project on the deployed site.
- [ ] Close this release task after all checks pass.
