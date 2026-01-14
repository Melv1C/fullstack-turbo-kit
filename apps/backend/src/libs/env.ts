import { NodeEnv$ } from '@repo/utils';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ path: ['../../packages/database/.env', '.env'] });

const envSchema = z.object({
  NODE_ENV: NodeEnv$,
  PORT: z.coerce.number().default(3000),
  CORS_ORIGINS: z
    .string()
    .default('http://localhost:5173,http://localhost:5174')
    .transform(val => val.split(',')),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
});

export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;
