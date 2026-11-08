# Deployment Guide

This document describes how to build, configure, deploy, and monitor the Soroban Risk Indexer in production and hosted environments.

---

## 1. Prerequisites & System Requirements

- **Node.js**: `v22.x` LTS or newer.
- **Package Manager**: `npm` (v10+) or `pnpm` (v9+).
- **Memory**: Minimum 512 MB RAM (1 GB recommended).
- **Disk**: 500 MB free storage for build artifacts and runtime caches.
- **Operating System**: Linux (Ubuntu 22.04 LTS / Debian 12 / Alpine Linux recommended) or macOS.

---

## 2. Production Build Commands

To build the TypeScript application for production:

```bash
# 1. Install production & build dependencies
npm ci

# 2. Run TypeScript build compiler
npm run build

# 3. Verify output
ls -la dist/
```

The compiled JavaScript entrypoint will be generated at `dist/index.js`.

---

## 3. Environment Variables Configuration

Create a `.env` file or provide environment variables via your container / cloud platform:

| Variable | Type | Default | Description | Production Example |
| :--- | :--- | :--- | :--- | :--- |
| `PORT` | Number | `4100` | Port on which the HTTP server listens | `4100` |
| `NODE_ENV` | String | `development` | Node runtime environment | `production` |
| `SOROBAN_RISK_INDEXER_MOCK_MODE` | Boolean | `true` | Enables deterministic mock data ingestion | `true` |
| `CORS_ORIGIN` | String | `*` | Allowed CORS origins for browser dashboards | `https://dashboard.sorobanguard.io` |

---

## 4. Process Startup & Daemon Management

### Direct Node.js Execution

```bash
NODE_ENV=production node dist/index.js
```

### Process Management with PM2 (Recommended for Bare VM / VPS)

```bash
# Install PM2 globally
npm install -g pm2

# Start service with cluster mode or single instance
pm2 start dist/index.js --name soroban-risk-indexer -i 1 --max-memory-restart 500M

# Save process list to resurrect on system boot
pm2 save
pm2 startup
```

### Systemd Service Configuration (`/etc/systemd/system/soroban-risk-indexer.service`)

```ini
[Unit]
Description=Soroban Risk Indexer Service
After=network.target

[Service]
Type=simple
User=node
WorkingDirectory=/opt/soroban-risk-indexer
ExecStart=/usr/bin/node /opt/soroban-risk-indexer/dist/index.js
Restart=always
RestartSec=5
Environment=NODE_ENV=production
Environment=PORT=4100
Environment=SOROBAN_RISK_INDEXER_MOCK_MODE=true

[Install]
WantedBy=multi-user.target
```

---

## 5. Docker & Container Deployment

### Building and Running the Docker Image

```bash
# Build multi-stage production image
docker build -t soroban-risk-indexer:latest .

# Run isolated container
docker run -d \
  --name soroban-risk-indexer \
  -p 4100:4100 \
  -e NODE_ENV=production \
  -e PORT=4100 \
  -e SOROBAN_RISK_INDEXER_MOCK_MODE=true \
  --restart unless-stopped \
  soroban-risk-indexer:latest
```

### Docker Compose Orchestration

```bash
# Start in detached mode
docker-compose up -d --build

# Inspect logs
docker-compose logs -f api

# Stop containers
docker-compose down
```

---

## 6. Health Checks & Readiness Verification

The service provides an active health check endpoint at `/health`:

```bash
curl -f http://localhost:4100/health
```

Expected JSON response:

```json
{
  "status": "ok",
  "service": "soroban-risk-indexer"
}
```

Cloud load balancers and orchestrators (AWS ALB, Kubernetes liveness/readiness probes, Docker Compose healthchecks) should poll `GET /health` with:
- **Interval**: 15–30 seconds
- **Timeout**: 5 seconds
- **Unhealthy Threshold**: 3 consecutive failures

---

## 7. Logging & Observability

- All HTTP requests, error responses, and mock ingestion triggers emit JSON/structured logs to standard output (`stdout`).
- In containerized environments, ship logs via Fluentbit, Datadog, or AWS CloudWatch log drivers.

---

## 8. Deployment Caveats & Production Considerations

1. **In-Memory Store Reset**:
   The default backend store is in-memory. Process restarts, redeployments, or container re-creations will reset the store back to the seeded mock state. For persistent storage across restarts, ensure future PostgreSQL/database adapters are enabled.
2. **Horizontal Scaling Statelessness**:
   Because the mock adapter and in-memory store are isolated to the single node process, running multiple container replicas behind a load balancer will result in independent in-memory states unless sticky sessions are configured.
3. **Mock Mode Invariant**:
   `SOROBAN_RISK_INDEXER_MOCK_MODE=true` guarantees that the service operates deterministically without making external RPC or wallet transactions.
