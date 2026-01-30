# Fullstack Turbo Kit

A production-ready [Turborepo](https://turbo.build/repo) monorepo starter with full-stack applications and shared packages.

## What's Inside?

### Apps

- **backend** — [Hono](https://hono.dev/) API server
- **frontend** — [Vite](https://vitejs.dev/) + [React](https://react.dev/) application
- **admin** — Vite + React admin application

### Packages

- **@repo/api-client** — Shared API client for frontend-backend communication
- **@repo/utils** — Shared utility functions and constants
- **@repo/eslint-config** — ESLint configurations
- **@repo/typescript-config** — TypeScript configurations
- **@repo/ui** — Shared UI components and design system

All packages and apps are written in [TypeScript](https://www.typescriptlang.org/).

## Getting Started

Install dependencies:

```bash
pnpm install
```

### Development

Run all apps in development mode:

```bash
pnpm run dev
```

## Learn More

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Hono Documentation](https://hono.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
