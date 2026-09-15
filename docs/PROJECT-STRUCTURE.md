# Project Structure

This document gives a quick overview of the repository layout.

## Main directories

- `client/` — frontend application code and UI components.
- `server/` — backend/server-side code.
- `shared/` — code and types shared between application layers.
- `attached_assets/` — project assets used by the application.
- `portfolio-next/` — Next.js portfolio implementation.
- `script/` — project scripts and development helpers.
- `.github/` — GitHub Actions and repository configuration.

## Root configuration

- `package.json` — project scripts and dependencies.
- `tsconfig.json` — TypeScript configuration.
- `tailwind.config.ts` — Tailwind CSS configuration.
- `postcss.config.js` — PostCSS configuration.
- `drizzle.config.ts` — Drizzle configuration.
- `.env.example` — example environment variables.

## Typical workflow

1. Install dependencies with `npm install`.
2. Start the development server with `npm run dev`.
3. Run the repository checks before opening a pull request.
4. Build the project with `npm run build` when the change affects production output.

Keep changes focused on the relevant directory and update documentation when the project structure changes.