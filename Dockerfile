FROM gcr.io/distroless/nodejs22-debian12@sha256:f71f4b7976f952df9c72b4d2ce82e09f0f57d398a25c0c3ebd63557e973f1ee7

ENV NODE_ENV=production

WORKDIR /app
COPY server/dist/ ./server/dist
COPY server/node_modules/ ./server/node_modules
COPY client/dist/ ./client/dist
COPY client/node_modules/ ./client/node_modules

EXPOSE 5000

WORKDIR /app/server

CMD [ "-r", "source-map-support/register", "-r", "dotenv/config", "dist/server.js" ]
