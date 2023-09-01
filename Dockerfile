FROM node:18-alpine
ENV NODE_ENV=production

WORKDIR /app
COPY server/dist/ ./server/dist
COPY server/node_modules/ ./server/node_modules
COPY client/dist/ ./client/dist
COPY client/node_modules/ ./client/node_modules

EXPOSE 5000

WORKDIR /app/server

CMD [ "-r", "source-map-support/register", "-r", "dotenv/config", "dist/server.js" ]
