# Contributing

Thanks for helping improve Soroban Risk Indexer.

## Development workflow

1. Install dependencies with `npm install`.
2. Create focused changes with tests.
3. Run `npm run lint`, `npm run typecheck`, and `npm test`.
4. Open a pull request with a clear description and any API impact.

## Code expectations

- Keep public API changes documented in `docs/api-reference.md`.
- Add or update tests for route, scoring, storage, or ingestion behavior.
- Do not add secrets, private-key handling, wallet signing logic, or live credential assumptions.
- Keep mock mode deterministic.

## Security reports

Please do not open public issues for sensitive vulnerabilities. Use a private maintainer contact path when one is published by the project.
