FROM gcr.io/distroless/nodejs22-debian12 AS runtime

ENV NODE_ENV=production

WORKDIR /app

COPY client/dist/ ./client/dist

COPY deploy/ ./server/

EXPOSE 5000

WORKDIR /app/server

CMD [ "-r", "source-map-support/register", "-r", "dotenv/config", "dist/server.js" ]
