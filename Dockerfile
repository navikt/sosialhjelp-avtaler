FROM node:22-alpine AS build

ENV NODE_ENV=production
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

# Copy workspace configuration and package files
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json .npmrc ./
COPY server/package.json ./server/
COPY client/package.json ./client/

# Install production dependencies for entire workspace
# Use secret mount for GitHub token authentication
RUN --mount=type=secret,id=github_token \
    GITHUB_TOKEN=$(cat /run/secrets/github_token) && \
    echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> .npmrc && \
    pnpm install --prod --frozen-lockfile --ignore-scripts

# Copy source code
COPY server/dist ./server/dist
COPY client/dist ./client/dist

# Deploy only server dependencies to /deploy directory
RUN pnpm deploy --filter=sosialhjelp-avtaler-server --prod /deploy

# Runtime stage
FROM gcr.io/distroless/nodejs22-debian12 AS runtime

ENV NODE_ENV=production

WORKDIR /app

# Copy built application and dependencies
COPY --from=build /app/client/dist /app/dist
COPY --from=build /deploy/node_modules /app/node_modules
COPY --from=build /app/server/dist /app/server/dist

EXPOSE 5000

WORKDIR /app/server

CMD [ "-r", "source-map-support/register", "-r", "dotenv/config", "dist/server.js" ]
