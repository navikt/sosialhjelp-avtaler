FROM node:16-alpine as client-builder
WORKDIR /app
COPY client/package.json client/package-lock.json ./
COPY client .


FROM node:16-alpine as server-builder
WORKDIR /app
COPY server/package.json server/package-lock.json ./
COPY server .

FROM node:16-alpine as server-dependencies
WORKDIR /app
COPY server/package.json server/package-lock.json ./


FROM gcr.io/distroless/nodejs:16 as runtime

WORKDIR /app

ENV NODE_ENV=production
EXPOSE 5000

COPY --from=client-builder /app/dist ./client/dist
COPY --from=server-builder /app/dist ./server/dist

WORKDIR /app/server

COPY --from=server-dependencies /app/node_modules ./node_modules

CMD [ "-r", "source-map-support/register", "-r", "dotenv/config", "dist/server.js" ]
