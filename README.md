# Soroban Risk Indexer

Soroban Risk Indexer is an open-source backend API from SorobanGuard Labs for indexing audit findings, contract risks, test results, contributor security tasks, and readiness data for Soroban projects.

It is designed for local-first and CI-friendly security workflows. The default runtime uses mock data only, with no secrets, private keys, signing, wallet logic, or official affiliation with Stellar or Soroban.

## Features

- Express API for project, risk, finding, task, and test result data.
- Deterministic mock indexing through `POST /index/mock`.
- In-memory storage adapter for development and tests.
- Readiness and risk scoring helpers.
- TypeScript domain models for security tooling integrations.
- Vitest and Supertest coverage for routes, scoring, mapping, storage, and adapters.
- GitHub Actions CI for linting, typechecking, and tests.
- Docker & Docker Compose support for standardized local environments.

## API endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/health` | Service health check. |
| GET | `/projects` | List indexed projects and readiness scores. |
| GET | `/risks` | List contract and operational risks. |
| GET | `/findings` | List audit findings. |
| GET | `/tasks` | List contributor security and readiness tasks. |
| GET | `/test-results` | List test and simulation results. |
| POST | `/index/mock` | Refresh the in-memory store from the mock adapter. |

## Quick start

### Using Node.js

```bash
npm install
npm run dev
```
### Using Docker Compose (Recommended)
You can run the API in an isolated container without needing Node.js installed locally.

```bash
docker-compose up --build
```

The API defaults to `http://localhost:4100`.

```bash
curl http://localhost:4100/health
curl http://localhost:4100/projects
```

## Environment variables

Copy `.env.example` to `.env` for local development when you want explicit configuration.

| Variable | Default | Description |
| --- | --- | --- |
| `PORT` | `4100` | HTTP server port. |
| `SOROBAN_RISK_INDEXER_MOCK_MODE` | `true` | Keeps the service in mock-data mode. |

## Mock mode

Mock mode is the only implemented ingestion mode in this repository. It provides deterministic example data for:

- Soroban project readiness.
- Contract and workflow risk categories.
- Audit-style findings.
- Contributor security tasks.
- Testbench-style failure scenarios.

Future adapters can replace the in-memory store and mock adapter without changing the API contract.

## Relationship to other repos

Soroban Risk Indexer is intended to support the SorobanGuard Labs ecosystem:

- **Soroban Guard Kit** creates audit readiness and security tasks.
- **Soroban Testbench** simulates transaction and RPC failure scenarios.
- **Soroban Risk Indexer** stores and exposes risk, test, and readiness data.

This project does not claim official affiliation with Stellar or Soroban.

## Roadmap

- Database-backed storage adapter.
- GitHub issue import for security tasks.
- Real test result ingestion from simulation tooling.
- Filtering and pagination for list endpoints.
- Integration contracts for Guard Kit and Testbench.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development workflow, testing expectations, and contribution guidelines.

## License

MIT. See [LICENSE](LICENSE).
