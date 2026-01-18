import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/seed/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  tsconfig: 'tsconfig.json',
  external: ['pg'],
  esbuildPlugins: [
    {
      name: 'rewrite-generated-prisma-imports',
      setup(build) {
        build.onResolve({ filter: /^@generated\/prisma(\/.*)?$/ }, args => {
          const subpath = args.path.replace('@generated/prisma', '');
          return {
            path: `../generated/prisma${subpath}.js`,
            external: true,
          };
        });
      },
    },
  ],
});
