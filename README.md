# F1 Web PWA Monorepo (v1)

Production-grade monorepo for a Formula 1 PWA with:

- **apps/web**: Next.js App Router PWA UI
- **apps/api**: NestJS + Prisma + PostgreSQL REST API
- **packages/types**: shared Zod schemas + TypeScript types
- **Turborepo + pnpm workspaces**

## Prerequisites

- Node.js 20+
- pnpm 9+
- Docker + Docker Compose

## 1) Install dependencies

```bash
pnpm install
```

## 2) Start Postgres

```bash
pnpm db:up
```

Postgres runs at `localhost:5432` using:

- user: `f1`
- password: `f1`
- database: `f1`

## 3) Configure environment variables

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

## 4) Run Prisma migrations + seed

```bash
pnpm db:migrate
pnpm db:seed
```

## 5) Run the monorepo

```bash
pnpm dev
```

- Web: http://localhost:3000
- API: http://localhost:4000/api/v1/health

## Root scripts

- `pnpm dev` - run API + web concurrently via turbo
- `pnpm lint` - lint all workspaces
- `pnpm typecheck` - typecheck all workspaces
- `pnpm db:up` - run postgres with docker compose
- `pnpm db:migrate` - run Prisma migration for API
- `pnpm db:seed` - seed 2026 season data

## API routes

Under `/api/v1`:

- `GET /health`
- `GET /seasons`
- `GET /seasons/:year/races`
- `GET /races/:slug`
- `GET /drivers`
- `GET /drivers/:slug`
- `GET /ics/races/:slug`

## Notes

- Seed data is hardcoded for v1 in `apps/api/prisma/seed.ts`
- Personalization is intentionally **not implemented** in v1; `/personalized` is a polished teaser page
- Web app uses a single API config helper (`apps/web/lib/config.ts`) for base URL
