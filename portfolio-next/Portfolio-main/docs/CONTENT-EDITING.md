# Editing portfolio content

Make content changes in the active application at `portfolio-next/Portfolio-main`. The root-level `client/`, `server/`, and `shared/` directories are legacy and do not feed the GitHub Pages build.

## Where content lives

- `contents/en.json`: English homepage copy, project cards, research summary, education, skills, and journey data.
- `lib/case-studies.ts`: the detailed static case-study pages, including summaries, architecture, decisions, evaluation, limitations, and image descriptions.
- `app/research/short-form-video-xai/page.tsx`: the research detail page and its metadata.
- `components/sections/`: presentation and layout for the homepage sections. Prefer changing data first; edit these components only when the layout or behavior itself needs to change.
- `app/sitemap.ts`: public static routes included in the sitemap. Update it when adding or removing an indexable route.
- `public/`: static images, icons, and other assets referenced by content.

The site currently publishes English content. Do not present `contents/hi.json` as a selectable, supported translation unless the language-routing and QA scope is explicitly changed.

## Safe editing workflow

1. Make the change in the active application paths listed above.
2. Keep claims specific and verifiable from the linked project repository or research artifact. Distinguish synthetic demos and prototypes from production systems; do not invent metrics, user counts, outcomes, or deployment guarantees.
3. For each project, check the title, summary, repository URL, demo URL, stack, image paths, and alt text. Use absolute HTTPS URLs for external destinations.
4. If a case-study slug or route changes, update `app/sitemap.ts` and any homepage links that refer to it. Keep canonical metadata consistent with the route.
5. Keep JSON valid: quote keys and strings, escape embedded quotation marks, and use commas only between values. Avoid changing unrelated formatting in the large content dictionary.
6. Run the checks below before opening a pull request.

## Validation

From `portfolio-next/Portfolio-main`, run:

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run check:static-output
```

The static-output check is available after the repository's build-smoke-check change is present. It checks the exported entry HTML, title/description metadata, and the expected homepage navigation anchors. If that script is not present on your branch yet, run the first four commands and inspect the generated `out/` directory.

For a content-only change, also verify:

- all image and external-link destinations resolve to the intended resource;
- project/research wording matches the linked source and states limitations where relevant;
- case-study and research pages load directly by URL;
- `#work`, `#research`, `#about`, and `#contact` still target the expected homepage sections;
- the static export contains the routes and assets affected by the change.

Do not claim a live contact-form delivery test passed unless a real post-deployment submission has been made and received.
