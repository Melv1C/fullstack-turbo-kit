import { isAdmin } from '@/middlewares/use-auth';
import { prisma } from '@repo/database';
import { Log$ } from '@repo/utils';
import { Hono } from 'hono';

export const logsRoutes = new Hono().get('/', isAdmin, async c => {
  const logs = await prisma.log.findMany({ orderBy: { createdAt: 'desc' }, take: 100 });
  return c.json(Log$.array().parse(logs));
});
