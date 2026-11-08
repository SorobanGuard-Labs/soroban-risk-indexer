# Soroban Risk Indexer

Soroban Risk Indexer is an open-source backend API from SorobanGuard Labs for indexing audit findings, contract risks, test results, contributor security tasks, and readiness data for Soroban projects.

It is designed for local-first and CI-friendly security workflows. The default runtime uses mock data only, with no secrets, private keys, signing, wallet logic, or official affiliation with Stellar or Soroban.

---

## Features

- **Express API**: Modular endpoints for project readiness, contract risks, audit findings, contributor tasks, and test results.
- **Soroban Guard Kit Integration**: Structured ingestion mapping for audit readiness checklists and contributor security tasks.
- **Soroban Testbench Integration**: Representation of transaction simulations, RPC failure evidence, and execution trace evidence.
- **OpenAPI 3.0 Documentation**: Machine-readable specification at [`docs/openapi.yaml`](docs/openapi.yaml).
- **Deterministic Mock Indexing**: Triggered via `POST /index/mock` with atomic in-memory state refreshes.
- **In-Memory Storage Adapter**: Fast, zero-dependency storage for development, testing, and CI pipelines.
- **Audit Readiness & Risk Scoring**: Mathematical scoring models aggregating open risk severities and completed verification milestones.
- **Docker & Container Ready**: Multi-stage production `Dockerfile`, `docker-compose.yml`, and active healthcheck monitoring.
- **Complete Test Suite**: Vitest and Supertest coverage for routes, scoring models, and integration adapters.

---

## API Endpoints

| Method | Path | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Service health and liveness check. |
| `GET` | `/projects` | List indexed projects with readiness and risk scores. |
| `GET` | `/risks` | List contract, architectural, and operational risks. |
| `GET` | `/findings` | List audit findings across indexed projects. |
| `GET` | `/tasks` | List contributor security tasks (Guard Kit and manual checklists). |
| `GET` | `/test-results` | List test and simulation results (supports `status`, `projectId`, `simulationType`). |
| `POST` | `/index/mock` | Refresh the in-memory store from the mock adapter. |

For detailed schemas and interactive documentation, see [API Reference](docs/api-reference.md) and [OpenAPI Specification](docs/openapi.yaml).

---

## Quick Start

### Using Node.js (v22+)

```bash
npm install
npm run dev
```

The API will start at `http://localhost:4100`.

### Using Docker Compose (Recommended)

```bash
docker-compose up --build
```

---

## Environment Variables

Copy `.env.example` to `.env` for local configuration:

| Variable | Default | Description |
| :--- | :--- | :--- |
| `PORT` | `4100` | HTTP server listening port. |
| `NODE_ENV` | `development` | Runtime environment (`development` / `production`). |
| `SOROBAN_RISK_INDEXER_MOCK_MODE` | `true` | Keeps service in deterministic mock mode. |
| `CORS_ORIGIN` | `*` | Allowed CORS origins for browser dashboards. |

---

## Relationship to Other Repositories

Soroban Risk Indexer supports the SorobanGuard Labs ecosystem:

- **[Soroban Guard Kit](docs/architecture.md#3-soroban-guard-kit-integration)**: Evaluates contract authorization and storage patterns, producing audit readiness checklists and contributor security tasks.
- **[Soroban Testbench](docs/architecture.md#4-soroban-testbench-integration)**: Simulates transaction execution, RPC timeouts, and budget footprints, providing structured failure evidence.
- **Soroban Risk Indexer**: Aggregates, indexes, scores, and exposes security data for dashboards and maintainers.

---

## Deployment

For hosted deployments, containerization, systemd process management, and production considerations, refer to the [Deployment Guide](docs/deployment.md).

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for local development workflows and pull request guidelines.

---

## License

MIT. See [LICENSE](LICENSE).
