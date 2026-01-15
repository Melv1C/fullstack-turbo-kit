import { env } from '@/lib/env';
import { routes } from '@/routes';
import { serve } from '@hono/node-server';
import { APP_NAME, APP_VERSION } from '@repo/utils';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono()
  .use(
    cors({
      origin: [env.FRONTEND_URL, env.ADMIN_URL],
      credentials: true,
    }),
  )
  .route('/api', routes);

export type AppType = typeof app;

serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  info => {
    console.log(`🚀 Backend server running on port ${info.port}`);
    console.log(`   App Name: ${APP_NAME}`);
    console.log(`   App Version: ${APP_VERSION}`);
  },
);
