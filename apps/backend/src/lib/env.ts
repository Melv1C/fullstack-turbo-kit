import { NodeEnv$ } from '@repo/utils';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ path: ['../../packages/database/.env', '.env'] });

const envSchema = z.object({
  NODE_ENV: NodeEnv$,
  PORT: z.coerce.number().default(3000),

  BACKEND_URL: z.url().default('http://localhost:3000'),
  FRONTEND_URL: z.url().default('http://localhost:5173'),
  ADMIN_URL: z.url().default('http://localhost:5174'),

  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  BETTER_AUTH_SECRET: z.string().min(32, 'BETTER_AUTH_SECRET must be at least 32 characters'),
});

export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;
