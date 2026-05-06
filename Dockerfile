FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim

ENV NODE_ENV=production

WORKDIR /app

COPY client/dist/ ./client/dist

COPY deploy/ ./server/

EXPOSE 5000

WORKDIR /app/server

CMD [ "-r", "source-map-support/register", "-r", "dotenv/config", "dist/server.js" ]
