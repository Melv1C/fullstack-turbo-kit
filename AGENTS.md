# AGENTS.md

Agent-focused guidance for the Fullstack Turbo Kit monorepo.

## Project overview

- Turborepo monorepo using npm workspaces.
- Apps: `backend` (Hono API), `frontend` (Vite + React), `admin` (Vite + React).
- Packages: `@repo/api-client`, `@repo/ui`, `@repo/utils`, `@repo/eslint-config`, `@repo/typescript-config`.
- Primary language: TypeScript.

## Workspace names (npm workspaces)

Use these names with `npm --workspace <name> run <script>`:

- Apps: `backend`, `frontend`, `admin`
- Packages: `@repo/api-client`, `@repo/ui`, `@repo/utils`, `@repo/eslint-config`, `@repo/typescript-config`

## Setup

```bash
npm install
```

### Install a package in a workspace

Use the workspace-aware `npm` command from the repo root to add a dependency to a specific app or package. Examples (adds `axios` to the `frontend` workspace):

```bash
npm --workspace frontend install axios
# for a dev dependency
npm --workspace frontend install --save-dev axios
```

This runs the install from the monorepo root and updates only the targeted workspace's `package.json`.

### Database (Postgres)

For local development, bring up Postgres with Docker:

```bash
docker compose -f docker-compose.db.yml up -d
```

### Environment variables

Each app has its own `.env.example` file. It contains example env vars needed to run that app.

## Dev workflow

Run all apps:

```bash
npm run dev
```

Run a single app (example):

```bash
npm --workspace backend run dev
npm --workspace frontend run dev
npm --workspace admin run dev
```

Default dev ports:

- Backend: http://localhost:3000
- Frontend: http://localhost:5173
- Admin: http://localhost:5174

## Build, lint, and typecheck

From repo root:

```bash
npm run build
npm run lint
npm run check-types
npm run format
npm run format:check
```

Per package:

```bash
npm --workspace <name> run lint
npm --workspace <name> run check-types
```

## Prisma (backend)

Prisma lives in apps/backend/prisma.
From repo root (Turbo will run in the backend package):

```bash
npm run generate
npm run migrate
npm run migrate:deploy
npm run validate
```

## Backend utilities

```bash
npm --workspace backend run add-admin "<name>" <email> <password> // Add an admin user
npm --workspace backend run sync-json-data // Sync data from JSON files to the database
```

## Coding conventions

- Use TypeScript across apps and packages.
- ESLint config is shared in `@repo/eslint-config`.
- Prettier formatting is enforced via `npm run format` and `npm run format:check`.
- Prefer workspace-aware commands (Turbo or `npm --workspace`) so dependency graph is respected.
