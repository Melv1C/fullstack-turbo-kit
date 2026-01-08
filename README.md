# Fullstack Turbo Kit

A production-ready [Turborepo](https://turbo.build/repo) monorepo starter with full-stack applications and shared packages.

## What's Inside?

### Apps

- **backend** — [Hono](https://hono.dev/) API server
- **frontend** — [Vite](https://vitejs.dev/) + [React](https://react.dev/) application

### Packages

- **@repo/ui** — Shared React component library
- **@repo/utils** — Shared utility functions and constants
- **@repo/eslint-config** — ESLint configurations
- **@repo/typescript-config** — TypeScript configurations

All packages and apps are written in [TypeScript](https://www.typescriptlang.org/).

## Getting Started

Install dependencies:

```bash
npm install
```

### Development

Run all apps in development mode:

```bash
npm run dev
```

### Build

Build all apps and packages:

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build --filter=docs

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo build --filter=docs
yarn exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop```bash

npm run build

````

### Lint

Run linting across all packages:

```bash
npm run lint
````

### Type Check

Run TypeScript type checking:

```bash
npm run check-types
```

## CI/CD

This project includes GitHub Actions workflows for:

- **Code Quality** — Runs linting and type checking on pull requests
- **Pipeline** — Builds and tests the project
- **Release** — Automated versioning and release process

## Release Process

Create a new release using semantic versioning:

```bash
npm run release:patch  # 1.0.0 → 1.0.1
npm run release:minor  # 1.0.0 → 1.1.0
npm run release:major  # 1.0.0 → 2.0.0
```

## Project Structure

```
apps/
  ├── backend/          # Hono API server
  └── frontend/         # Vite + React app
packages/
  ├── ui/               # Shared React components
  ├── utils/            # Shared utilities
  ├── eslint-config/    # ESLint configurations
  └── typescript-config/ # TypeScript configurations
```

## Learn More

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Hono Documentation](https://hono.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
