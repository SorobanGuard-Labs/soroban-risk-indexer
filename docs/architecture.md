# Architecture

Soroban Risk Indexer is a TypeScript Express service with a deliberately small backend surface. The current runtime is built around a mock adapter, in-memory store, and HTTP route modules that expose indexed security data.

## Layers

- `src/server` creates the Express application and process entry point.
- `src/api` contains route modules for each public endpoint.
- `src/indexer` contains ingestion and mapping logic.
- `src/storage` defines the store interface and in-memory implementation.
- `src/types` defines the API domain model.
- `src/utils` contains scoring, logging, and time helpers.

## Ingestion flow

`POST /index/mock` calls `RiskIndexerService.indexMockData()`, which loads a snapshot from `MockRiskAdapter` and replaces the in-memory store contents.

The mock adapter intentionally avoids secrets, RPC credentials, wallet logic, private keys, and live network calls.

## Extension points

- TODO: database adapter.
- TODO: GitHub issue import.
- TODO: real test result ingestion.
- TODO: integration with Guard Kit and Testbench.
