FROM gcr.io/distroless/nodejs22-debian12 AS runtime

ENV NODE_ENV=production

WORKDIR /app

# Copy pre-built client assets
COPY client/dist/ ./client/dist

# Copy server files from deploy directory (created by pnpm deploy)
COPY deploy/ ./server/

EXPOSE 5000

WORKDIR /app/server

CMD [ "-r", "source-map-support/register", "-r", "dotenv/config", "dist/server.js" ]
