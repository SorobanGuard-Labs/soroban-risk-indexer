# API Reference

All endpoints return JSON. List endpoints currently return `{ "data": [...] }`.

## `GET /health`

Returns service health.

## `GET /projects`

Returns indexed projects.

Project fields: `id`, `name`, `repositoryUrl`, `network`, `readinessScore`, `riskScore`.

## `GET /risks`

Returns indexed risks.

Risk fields: `id`, `projectId`, `title`, `severity`, `category`, `description`, `recommendation`, `status`.

## `GET /findings`

Returns audit findings.

Finding fields: `id`, `projectId`, `severity`, `summary`, `affectedArea`, `recommendation`, `status`.

## `GET /tasks`

Returns readiness and security tasks.

Task fields: `id`, `projectId`, `title`, `labels`, `difficulty`, `acceptanceCriteria`, `status`.

## `GET /test-results`

Returns test and simulation results.

Test result fields: `id`, `projectId`, `scenario`, `status`, `durationMs`, `failureReason`, `timestamp`.

## `POST /index/mock`

Refreshes the in-memory store with deterministic mock data and returns indexed record counts.

## Planned API work

- TODO: pagination.
- TODO: filtering.
