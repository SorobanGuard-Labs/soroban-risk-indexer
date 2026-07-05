# Getting Started

## Requirements

- Node.js 22 or newer.
- npm.

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

The server listens on `http://localhost:4100` by default.

## Verify

```bash
curl http://localhost:4100/health
curl http://localhost:4100/projects
curl -X POST http://localhost:4100/index/mock
```

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
```
