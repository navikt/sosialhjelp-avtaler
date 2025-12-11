# Production dependencies stage
FROM node:22-alpine AS deps

WORKDIR /app

# Copy dependency manifests
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY server/package.json ./server/
COPY client/package.json ./client/

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod --ignore-scripts

# Runtime stage
FROM gcr.io/distroless/nodejs22-debian12 AS runtime

ENV NODE_ENV=production

WORKDIR /app

# Copy built application (built in GH Actions)
COPY server/dist/ ./server/dist/
COPY client/dist/ ./client/dist/

# Copy production dependencies from deps stage
COPY --from=deps /app/node_modules/ ./node_modules/
COPY --from=deps /app/server/node_modules/ ./server/node_modules/

EXPOSE 5000

WORKDIR /app/server

CMD [ "-r", "source-map-support/register", "-r", "dotenv/config", "dist/server.js" ]
