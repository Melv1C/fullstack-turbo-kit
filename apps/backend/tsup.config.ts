import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/seed/index.ts'],
  format: ['esm'],
  clean: true,
  sourcemap: true,
  dts: true,
});
