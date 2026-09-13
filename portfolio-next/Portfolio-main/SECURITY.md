# Security policy

## Scope

This portfolio is intentionally a static export. It has no application server, authentication, database, user accounts, server actions, analytics endpoint, or contact-form API. The contact form opens a user-controlled `mailto:` draft instead of transmitting information through a third-party client service.

## Security controls in the site

- Content Security Policy meta policy that limits scripts, connections, images, media, frames, workers, and embedded objects to the site itself.
- Permissions Policy that disables camera, microphone, geolocation, payment, and USB access.
- Strict cross-origin referrer policy.
- `noopener noreferrer` on external links opened in new tabs.
- No committed environment files, API keys, tokens, private keys, or client-side contact-service credentials.
- Static image output only; Next image optimization is disabled.
- Updated, pinned production dependencies and npm overrides for known patched transitive versions.

## Important hosting boundary

GitHub Pages serves this static site but does not offer repository-controlled HTTP security headers. The CSP above is therefore delivered as HTML metadata. Browser-enforced `frame-ancestors`, HSTS, `X-Content-Type-Options`, and `X-Frame-Options` require a host or CDN that supports response-header configuration. If those controls are required, place the static export behind Cloudflare or another headers-capable host.

## Repository controls to enable

The repository owner should keep GitHub two-factor authentication enabled, protect the default branch, require reviews for changes to workflows or deployment configuration, enable Dependabot alerts/security updates, and restrict write access to trusted collaborators.

## Reporting

Please report a potential vulnerability privately to [sneh.raunakk@gmail.com](mailto:sneh.raunakk@gmail.com). Do not include sensitive data in public issues.
