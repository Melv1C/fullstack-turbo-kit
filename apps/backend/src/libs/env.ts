import { NodeEnv$ } from '@repo/utils';
import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: NodeEnv$,
  PORT: z.coerce.number().default(3000),
  CORS_ORIGINS: z
    .string()
    .default('http://localhost:5173,http://localhost:5174')
    .transform(val => val.split(',')),
});

export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;
