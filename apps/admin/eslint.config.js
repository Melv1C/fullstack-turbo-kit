import reactConfig from '@repo/eslint-config/react-internal.js';

export default [
  {
    ignores: ['dist', 'node_modules', '*.gen.ts'],
  },
  ...reactConfig,
];
