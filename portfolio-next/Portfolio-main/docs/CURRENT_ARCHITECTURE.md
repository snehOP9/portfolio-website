# Current architecture

## Active portfolio

`portfolio-next/Portfolio-main` is the deployable Next.js static-export portfolio. The root GitHub Pages workflow installs, builds, validates `out/CNAME`, and publishes this application's `out/` directory to `gh-pages` for `snehraunak.in`.

The root-level `client/`, `server/`, and `shared/` directories belong to a separate legacy application. They are not imported by the Pages workflow. They are intentionally retained: removing them needs a separately reviewed migration, an explicit historic tag, and confirmation that no other deployment uses them.

## Delivery and boundaries

- Static export is intentional; `images.unoptimized` remains required for GitHub Pages static hosting.
- The contact form posts directly to FormSubmit. Its recipient activation is an external prerequisite, so delivery must not be represented as verified until the owner activates it and a real inbox delivery test passes.
- The visible site is English-only. `/en/` remains as a compatibility path; unfinished translations are not published as selectable content.
- Dedicated static routes provide indexable case studies and research details. Content is derived from the associated project repositories or the linked notebook, and avoids outcome claims not supported there.

## Confirmed improvements

- No artificial page preloader; sound is muted until explicitly enabled.
- Motion-intensive enhancements respect reduced-motion and coarse-pointer environments.
- Homepage hierarchy is Work, Research, About, capabilities, then journey and contact.
- Root metadata, Open Graph/Twitter metadata, JSON-LD, robots, sitemap, skip link, and static routes are part of the deployable application.
