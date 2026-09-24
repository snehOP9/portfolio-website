# Local security notes

- Treat `.env` as local-only configuration and never commit real credentials.
- Use clearly fake values in example configuration files.
- Keep deployment secrets in the hosting provider's secret/environment configuration.
- Run the documented typecheck, lint, and build commands before publishing changes.
- If a credential is ever committed accidentally, revoke or rotate it rather than relying only on a later file deletion.
