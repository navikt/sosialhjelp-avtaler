FROM gcr.io/distroless/nodejs22-debian12 AS runtime

ENV NODE_ENV=production

WORKDIR /app
COPY server/dist/ ./server/dist
COPY server/node_modules/ ./server/node_modules
COPY client/dist/ ./client/dist

EXPOSE 5000

WORKDIR /app/server

CMD [ "-r", "source-map-support/register", "-r", "dotenv/config", "dist/server.js" ]
