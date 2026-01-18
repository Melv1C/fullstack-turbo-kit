// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/seed/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  tsconfig: 'tsconfig.json',
  external: ['@prisma/client', '@generated/prisma/client', '.prisma/client'],
  noExternal: [],
});
