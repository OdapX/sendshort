FROM node:20.15-alpine AS base

ARG TARGET
 # runtime too
ENV TARGET=${TARGET}

RUN npm install -g pnpm@8.15.9

FROM base AS pruner
RUN npm install -g turbo@2.5.4
WORKDIR  /app
COPY ../../ ./
RUN turbo prune --scope=${TARGET} --docker

FROM base AS builder
WORKDIR /app
COPY --from=pruner /app/out/json/ .
RUN pnpm install

COPY --from=pruner  /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm turbo run build --filter=${TARGET}...

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono

USER hono

EXPOSE 3000

ENV PORT=3000

CMD ["sh", "-c", "echo 'Listing /app:' && ls -R /app && echo 'Listing /app/apps/api/dist:' && ls -R /app/apps/api/dist || echo 'dist not found'"]
