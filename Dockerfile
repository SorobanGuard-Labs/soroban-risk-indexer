# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:22-alpine

WORKDIR /usr/src/app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled JavaScript from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Use a non-root user for security
USER node

# Expose the default port
EXPOSE 4100

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4100/health || exit 1

# Start the application
CMD ["npm", "start"]