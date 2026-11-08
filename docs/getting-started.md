# Getting Started

## Requirements

- Node.js `22.x` or newer.
- npm (v10+) or pnpm (v9+).
- Docker & Docker Compose *(optional, for containerized workflows)*.

---

## Installation

```bash
npm install
```

---

## Local Development

Start the development server with live reload:

```bash
npm run dev
```

The server listens on `http://localhost:4100` by default.

---

## Verification & API Testing

Verify service endpoints using `curl`:

```bash
# 1. Health check
curl http://localhost:4100/health

# 2. List projects & readiness scores
curl http://localhost:4100/projects

# 3. List Guard Kit security tasks
curl http://localhost:4100/tasks

# 4. List Testbench failure simulations
curl "http://localhost:4100/test-results?simulationType=rpc_failure"

# 5. Trigger mock re-indexing
curl -X POST http://localhost:4100/index/mock
```

---

## Quality Checks & Automated Tests

Run the full verification suite before pushing code:

```bash
# Code style and linting
npm run lint

# TypeScript static typechecking
npm run typecheck

# Automated unit & integration tests
npm test
```

---

## Production Deployment

For deploying in hosted environments (Docker, cloud VMs, Kubernetes), see the [Deployment Guide](deployment.md).

---

## OpenAPI Specification

View the machine-readable API documentation in [`docs/openapi.yaml`](openapi.yaml).
