# Sneh Raunak — Portfolio

An immersive portfolio showcasing Sneh Raunak's machine-learning systems and full-stack work. It uses the permitted reference implementation's Next.js layout, motion system, animated galleries, and horizontal project-scrolling interaction, with Sneh's own profile, projects, links, and resume.

## Local development

```bash
npm install
npm run dev
```

The production build is configured as a static export for the `https://snehraunak.in` GitHub Pages custom domain.

## Contact

- GitHub: [snehOP9](https://github.com/snehOP9)
- LinkedIn: [Sneh Raunak](https://www.linkedin.com/in/sneh-raunak/)
- Email: [sneh.raunakk@gmail.com](mailto:sneh.raunakk@gmail.com)

### Form delivery

The deployed GitHub Pages contact form sends submissions to the portfolio email through FormSubmit's cross-origin AJAX endpoint. After deployment, submit the form once and open FormSubmit's confirmation email in the recipient inbox; this one-time activation is required before later messages are forwarded. The form retains FormSubmit's default spam protection and sets the sender's address as the email Reply-To field.

MongoDB is installed locally for development, but a browser on GitHub Pages cannot reach a local database. A database-backed inbox would require a separately hosted API and a managed MongoDB connection string; neither is embedded in this static site.

## Current implementation

The active deployable application is `portfolio-next/Portfolio-main`; the root `client/`, `server/`, and `shared/` application is legacy and is not part of the Pages build. Use `npm ci`, `npm run typecheck`, `npm run lint`, and `npm run build` to validate changes. See `docs/CURRENT_ARCHITECTURE.md` for route, deployment, and contact-delivery boundaries.
