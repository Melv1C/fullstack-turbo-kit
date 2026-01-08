import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { APP_NAME, APP_VERSION } from '@repo/utils';

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
    port: 3000,
  },
  (info) => {
    console.log(`🚀 Backend server running on port ${info.port}`);
    console.log(`   App Name: ${APP_NAME}`);
    console.log(`   App Version: ${APP_VERSION}`);
  }
);
