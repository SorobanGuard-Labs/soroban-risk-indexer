# Architecture

Soroban Risk Indexer is a TypeScript Express service designed to index, aggregate, and expose smart contract risks, audit readiness, security tasks, and simulation evidence for the Soroban ecosystem.

---

## 1. Architectural Layers

- **`src/server`**: Creates and configures the Express application, security middleware, and process entrypoint.
- **`src/api`**: Modular HTTP route handlers exposing project, risk, finding, task, and test result resources.
- **`src/indexer`**: Ingestion pipelines, readiness mapping, and score computation logic.
- **`src/storage`**: Storage interface definition (`Store`) and in-memory implementation (`MemoryStore`).
- **`src/types`**: TypeScript domain models (`Project`, `Risk`, `Finding`, `Task`, `TestResult`).
- **`src/utils`**: Readiness/risk scoring algorithms, time helpers, and structured logging.

---

## 2. Ingestion Flow & Mock Adapter

In default mock mode (`SOROBAN_RISK_INDEXER_MOCK_MODE=true`), the service operates in an isolated, deterministic environment:
1. `POST /index/mock` triggers `RiskIndexerService.indexMockData()`.
2. `MockRiskAdapter` loads a static snapshot of projects, risks, audit findings, tasks, and test results.
3. `readinessMapper` dynamically calculates readiness scores (`0-100`) and risk scores (`0-100`) based on open risks, findings severity, and completed tasks.
4. The snapshot atomically replaces the state in `MemoryStore`.
5. The adapter guarantees zero network RPC dependencies, private keys, wallet signatures, or secrets.

---

## 3. Soroban Guard Kit Integration

**Soroban Guard Kit** evaluates contract source code, authorization rules, and storage patterns to assess audit readiness:

### Data Flow Model
```
┌─────────────────────────┐       ┌─────────────────────────┐       ┌─────────────────────────┐
│    Soroban Guard Kit    │ ───►  │  Automated Task / Risk  │ ───►  │   Soroban Risk Indexer  │
│  (Checklists & Audits)  │       │       Ingestion         │       │    (Store & Scoring)    │
└─────────────────────────┘       └─────────────────────────┘       └─────────────────────────┘
```

### Data Mapping
- Guard Kit checklist criteria map to the `Task` domain model (`src/types/task.ts`).
- `Task.source` is tagged as `guard-kit`.
- `Task.category` classifies tasks into security pillars:
  - `authorization`: Negative authorization tests and privileged path guards.
  - `data-storage`: Ledger TTL bumps, temporary vs instance storage boundaries.
  - `upgradeability`: Multi-sig contract upgrade controls.
  - `resource-budget`: CPU and memory gas budget consumption.
  - `readiness`: Audit preparation and documentation milestones.
  - `resilience`: Error recovery and network failure tolerances.
- Unmitigated findings map to `Risk` entities with severity ratings (`critical`, `high`, `medium`, `low`, `informational`).

---

## 4. Soroban Testbench Integration

**Soroban Testbench** simulates contract transaction execution, state changes, and RPC failure scenarios against mock or testnet nodes:

### Simulation Result Representation
- Testbench execution outputs map directly to `TestResult` (`src/types/testResult.ts`).
- `simulationType` specifies the simulation category:
  - `transaction_simulation`: Contract invocation verification and state transition checks.
  - `rpc_failure`: Transient network drops, timeout handling, and stick submission recovery.
  - `auth_boundary`: Negative access control verification for non-privileged callers.
  - `budget_exhaustion`: Soroban CPU instruction and memory gas limit stress testing.
  - `storage_footprint`: Footprint key limits and contract archival behavior.
- `rpcDetails` provides structured evidence of RPC failures:
  - `endpoint`: RPC provider endpoint URL.
  - `rpcError`: Exact RPC error code or message (e.g. `GatewayTimeout (504)`).
  - `retryAttempts`: Number of retries attempted before failing.
  - `transient`: Boolean indicating whether failure was temporary or permanent.

---

## 5. Future Storage & Ingestion Roadmap

- **PostgreSQL Adapter**: Replace `MemoryStore` with persistent relational storage.
- **Webhook Ingestion**: Real-time push ingestion from CI pipelines and Guard Kit runs.
- **GitHub Issue Import**: Bi-directional sync of contributor security tasks with GitHub issues.
- **Automated Re-scoring**: Background re-indexing as new Testbench simulations are recorded.
