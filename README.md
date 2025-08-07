# Setup:

## 1. Set your env vars for local dev:

    - at the root level .env.example => .env.local

    - at packages/remotion: .env.example => .env.local

## 2. setup a local db, and remotion renderer:

    - pnpm scaffold

## 3. sync the database:

    - cd packages/prisma && pnpm prisma:push && pnpm prisma:generate

## 4. Install dependencies at the root level: (move back to the root: cd ../..)

    - pnpm install

# 5. Start the apps (web + api):

    - pnpm dev

# Daily dev:

    - run remotion worker server: cd packages/remotion && docker compose up -d
    - pnpm dev

# Deployment:

## I/ deploy renderer: at packages/remotion level

- 1.  flyctl launch.
- 2.  remotion pkg, create a redis source: flyctl redis create (store redis url)
- 3.  set env vars on fly.io for the renderer, including redis_url previously stored. (or set them later on the dashboard)
- 4.  flyctl deploy

## II/ deploy dashboard: at the root level

1. flyctl launch
2. set env vars with flyctl (or set them later on the dashboard)
3. fly:deploy:web

## III/ deploy the api:

- ...same as dashboard + fly:deploy:api
