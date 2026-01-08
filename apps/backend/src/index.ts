import { serve } from '@hono/node-server';
import { zValidator } from '@hono/zod-validator';
import { APP_NAME, APP_VERSION } from '@repo/utils';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { z } from 'zod';
import { env } from './env';

const app = new Hono()
  .use(
    '/api/*',
    cors({
      origin: env.CORS_ORIGINS,
      credentials: true,
    }),
  )
  .get('/api', c => {
    return c.json(
      {
        message: `Hello from ${APP_NAME} backend API!`,
        version: APP_VERSION,
      },
      200,
    );
  })
  .get(
    '/api/posts',
    zValidator(
      'query',
      z.object({
        page: z.coerce.number().optional().default(1),
        limit: z.coerce.number().optional().default(10),
      }),
    ),
    c => {
      const { page, limit } = c.req.valid('query');
      return c.json(
        {
          posts: [
            { id: '1', title: 'Hello World', body: 'First post' },
            { id: '2', title: 'Hono RPC', body: 'Type-safe API calls' },
          ],
          pagination: { page, limit, total: 2 },
        },
        200,
      );
    },
  )
  .get('/api/posts/:id', c => {
    const id = c.req.param('id');
    const post = { id, title: 'Hello World', body: 'First post' };
    if (!post) {
      return c.json({ error: 'Post not found' }, 404);
    }
    return c.json({ post }, 200);
  })
  .post(
    '/api/posts',
    zValidator(
      'json',
      z.object({
        title: z.string().min(1),
        body: z.string().min(1),
      }),
    ),
    c => {
      const { title, body } = c.req.valid('json');
      return c.json(
        {
          ok: true,
          message: 'Post created!',
          post: { id: crypto.randomUUID(), title, body },
        },
        201,
      );
    },
  );

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
