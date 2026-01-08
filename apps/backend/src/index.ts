import { serve } from '@hono/node-server';
import { APP_NAME, APP_VERSION } from '@repo/utils';
import { Hono } from 'hono';
import { env } from './env';

const app = new Hono();

app.get('/api', (c) => {
  return c.json({
    message: `Hello from ${APP_NAME} backend API!`,
    version: APP_VERSION,
  });
});

serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  (info) => {
    console.log(`🚀 Backend server running on port ${info.port}`);
    console.log(`   App Name: ${APP_NAME}`);
    console.log(`   App Version: ${APP_VERSION}`);
  }
);
